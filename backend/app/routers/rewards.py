from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, and_
from datetime import datetime, timedelta
from typing import List, Optional

from app.database import get_db
from app.models import User, Order, MenuItem
from pydantic import BaseModel

router = APIRouter(prefix="/api/rewards", tags=["rewards"])

# ============ Pydantic Models ============

class LeaderboardEntry(BaseModel):
    rank: int
    user_id: int
    username: str
    full_name: str
    coins: int
    orders: int
    level: str
    streak: int

    class Config:
        from_attributes = True


class UserRewardsResponse(BaseModel):
    user_id: int
    coins: int
    streak: int
    total_orders: int
    level: str
    badges: List[str]
    referral_code: str
    referred_users: int
    rank: int

    class Config:
        from_attributes = True


class CoinsActionRequest(BaseModel):
    amount: int
    reason: str


# ============ Database Models Extension ============
# These would typically be in your User model
# Adding fields to track rewards:
# - coins: int (default 0)
# - streak: int (default 0)
# - level: str (default 'bronze')
# - badges: JSON field for badge tracking
# - referral_code: str
# - last_order_date: datetime
# - total_referrals: int


# ============ Endpoints ============

@router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(
    limit: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """
    Get global leaderboard with top users by coins.
    Supports pagination.
    """
    try:
        # Query users ranked by coins
        users = db.query(
            User.id,
            User.username,
            User.full_name,
            User.coins,
            User.streak,
            User.level,
            func.count(Order.id).label('orders'),
            func.row_number().over(
                order_by=desc(User.coins)
            ).label('rank')
        ).outerjoin(Order, Order.user_id == User.id).group_by(
            User.id
        ).order_by(desc(User.coins)).offset(offset).limit(limit).all()

        leaderboard = [
            LeaderboardEntry(
                rank=user.rank,
                user_id=user.id,
                username=user.username,
                full_name=user.full_name,
                coins=user.coins,
                orders=user.orders,
                level=user.level,
                streak=user.streak
            )
            for user in users
        ]
        return leaderboard

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching leaderboard: {str(e)}"
        )


@router.get("/user/{user_id}", response_model=UserRewardsResponse)
async def get_user_rewards(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Get specific user's reward statistics and rank.
    """
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Get user's rank
        rank = db.query(
            func.count(User.id) + 1
        ).filter(User.coins > user.coins).scalar() or 1

        # Get order count
        order_count = db.query(func.count(Order.id)).filter(
            Order.user_id == user_id
        ).scalar() or 0

        return UserRewardsResponse(
            user_id=user.id,
            coins=user.coins,
            streak=user.streak,
            total_orders=order_count,
            level=user.level,
            badges=user.badges or [],
            referral_code=user.referral_code or f"DREAM{user.id}",
            referred_users=user.total_referrals or 0,
            rank=rank
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching user rewards: {str(e)}"
        )


@router.post("/claim-daily-reward/{user_id}")
async def claim_daily_reward(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Claim daily reward (50 coins).
    Can only be claimed once per day.
    """
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        now = datetime.utcnow()
        last_claim = user.last_daily_reward_claim

        # Check if already claimed today
        if last_claim:
            if last_claim.date() == now.date():
                return {
                    "success": False,
                    "message": "You already claimed your daily reward today!",
                    "coins_earned": 0
                }

        # Award 50 coins
        user.coins = (user.coins or 0) + 50
        user.last_daily_reward_claim = now

        # Add badge if first claim
        if not user.badges:
            user.badges = ["daily-reward"]
        elif "daily-reward" not in user.badges:
            user.badges.append("daily-reward")

        db.commit()

        return {
            "success": True,
            "message": "Daily reward claimed!",
            "coins_earned": 50,
            "total_coins": user.coins
        }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error claiming daily reward: {str(e)}"
        )


@router.post("/update-streak/{user_id}")
async def update_streak(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Update user's order streak.
    Increments on consecutive days with orders.
    """
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        now = datetime.utcnow()
        last_order = user.last_order_date

        if last_order:
            diff_days = (now.date() - last_order.date()).days

            if diff_days == 1:
                user.streak = (user.streak or 0) + 1
                # Award bonus coins for streaks
                if user.streak == 7:
                    user.coins = (user.coins or 0) + 100
                    if "7-day-streak" not in (user.badges or []):
                        user.badges = (user.badges or []) + ["7-day-streak"]
            elif diff_days > 1:
                user.streak = 1
        else:
            user.streak = 1

        user.last_order_date = now
        db.commit()

        return {
            "success": True,
            "streak": user.streak,
            "coins": user.coins,
            "level": user.level
        }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating streak: {str(e)}"
        )


@router.post("/add-coins/{user_id}")
async def add_coins(
    user_id: int,
    request: CoinsActionRequest,
    db: Session = Depends(get_db)
):
    """
    Add coins to user (admin/system use).
    Reasons: order-complete, referral, bonus, social-share, etc.
    """
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        user.coins = (user.coins or 0) + request.amount
        db.commit()

        return {
            "success": True,
            "message": f"Added {request.amount} coins for: {request.reason}",
            "total_coins": user.coins
        }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error adding coins: {str(e)}"
        )


@router.post("/process-referral/{referrer_id}/{referred_user_id}")
async def process_referral(
    referrer_id: int,
    referred_user_id: int,
    db: Session = Depends(get_db)
):
    """
    Process referral: award coins to referrer when referred user completes first order.
    """
    try:
        referrer = db.query(User).filter(User.id == referrer_id).first()
        referred = db.query(User).filter(User.id == referred_user_id).first()

        if not referrer or not referred:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Award referral bonus
        referrer.coins = (referrer.coins or 0) + 100
        referrer.total_referrals = (referrer.total_referrals or 0) + 1

        # Add badges
        if "social-butterfly" not in (referrer.badges or []):
            referrer.badges = (referrer.badges or []) + ["social-butterfly"]

        db.commit()

        return {
            "success": True,
            "message": "Referral processed!",
            "referrer_coins": referrer.coins,
            "referrer_total": referrer.total_referrals
        }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing referral: {str(e)}"
        )


@router.get("/top-referrers")
async def get_top_referrers(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """
    Get top users by referrals (social influence).
    """
    try:
        referrers = db.query(
            User.id,
            User.username,
            User.full_name,
            User.total_referrals.label('referrals'),
            func.count(Order.id).label('orders')
        ).outerjoin(Order, Order.user_id == User.id).group_by(
            User.id
        ).order_by(desc(User.total_referrals)).limit(limit).all()

        return [
            {
                "user_id": r.id,
                "username": r.username,
                "full_name": r.full_name,
                "referrals": r.referrals or 0,
                "orders": r.orders
            }
            for r in referrers
        ]

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching top referrers: {str(e)}"
        )
