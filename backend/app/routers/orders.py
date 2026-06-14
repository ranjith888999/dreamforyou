from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models import Order, OrderItem, MenuItem, User, OrderStatus
from pydantic import BaseModel
import uuid

router = APIRouter()

# Pydantic models for request/response
class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int
    price: float

class OrderCreateRequest(BaseModel):
    user_id: int
    restaurant_id: int
    items: list[OrderItemCreate]
    subtotal: float
    delivery_charge: float = 50.0
    gst: float
    total_amount: float
    delivery_address: str
    estimated_delivery_time: int = 18
    special_instructions: str = None


@router.post("")
def create_order(order_data: OrderCreateRequest, db: Session = Depends(get_db)):
    """Create a new order"""
    try:
        # Generate unique order number
        order_number = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        
        # Create order
        order = Order(
            user_id=order_data.user_id,
            restaurant_id=order_data.restaurant_id,
            order_number=order_number,
            subtotal=order_data.subtotal,
            delivery_charge=order_data.delivery_charge,
            gst=order_data.gst,
            total_amount=order_data.total_amount,
            delivery_address=order_data.delivery_address,
            estimated_delivery_time=order_data.estimated_delivery_time,
            special_instructions=order_data.special_instructions,
            status=OrderStatus.PENDING,
            created_at=datetime.utcnow()
        )
        db.add(order)
        db.flush()  # Get the order ID
        
        # Add order items
        for item_data in order_data.items:
            order_item = OrderItem(
                order_id=order.id,
                menu_item_id=item_data.menu_item_id,
                quantity=item_data.quantity,
                price=item_data.price
            )
            db.add(order_item)
        
        db.commit()
        db.refresh(order)
        
        return {
            "id": order.id,
            "order_number": order.order_number,
            "user_id": order.user_id,
            "restaurant_id": order.restaurant_id,
            "subtotal": order.subtotal,
            "delivery_charge": order.delivery_charge,
            "gst": order.gst,
            "total_amount": order.total_amount,
            "status": order.status.value,
            "created_at": order.created_at.isoformat() if order.created_at else None,
            "items": len(order_data.items)
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    """Get order details"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {
        "id": order.id,
        "order_number": order.order_number,
        "user_id": order.user_id,
        "restaurant_id": order.restaurant_id,
        "subtotal": order.subtotal,
        "delivery_charge": order.delivery_charge,
        "gst": order.gst,
        "total_amount": order.total_amount,
        "status": order.status.value,
        "delivery_address": order.delivery_address,
        "estimated_delivery_time": order.estimated_delivery_time,
        "created_at": order.created_at.isoformat() if order.created_at else None
    }


@router.get("/{order_id}/items")
def get_order_items(order_id: int, db: Session = Depends(get_db)):
    """Get items in an order"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    items = db.query(OrderItem).filter(OrderItem.order_id == order_id).all()
    
    return [
        {
            "id": item.id,
            "order_id": item.order_id,
            "menu_item_id": item.menu_item_id,
            "quantity": item.quantity,
            "price": item.price
        }
        for item in items
    ]


@router.get("/{order_id}/tracking")
def get_order_tracking(order_id: int, db: Session = Depends(get_db)):
    """Get real-time order tracking"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Define tracking stages
    stages = [
        {"stage": "confirmed", "status": "completed", "timestamp": order.created_at.isoformat() if order.created_at else None},
        {"stage": "preparing", "status": "in_progress", "timestamp": order.created_at.isoformat() if order.created_at else None},
        {"stage": "ready_for_pickup", "status": "pending", "timestamp": None},
        {"stage": "out_for_delivery", "status": "pending", "timestamp": None},
        {"stage": "delivered", "status": "pending", "timestamp": None}
    ]
    
    return {
        "order_id": order.id,
        "order_number": order.order_number,
        "current_status": order.status.value,
        "delivery_address": order.delivery_address,
        "estimated_delivery_time": order.estimated_delivery_time,
        "stages": stages
    }


@router.put("/{order_id}")
def update_order_status(order_id: int, update_data: dict, db: Session = Depends(get_db)):
    """Update order status"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if "status" in update_data:
        try:
            order.status = OrderStatus(update_data["status"])
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid status: {update_data['status']}")
    
    order.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(order)
    
    return {
        "id": order.id,
        "status": order.status.value,
        "updated_at": order.updated_at.isoformat()
    }


@router.get("/user/{user_id}/history")
def get_order_history(
    user_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get user's order history"""
    orders = db.query(Order).filter(Order.user_id == user_id).offset(skip).limit(limit).all()
    
    return [
        {
            "id": order.id,
            "order_number": order.order_number,
            "restaurant_id": order.restaurant_id,
            "total_amount": order.total_amount,
            "status": order.status.value,
            "created_at": order.created_at.isoformat() if order.created_at else None
        }
        for order in orders
    ]


@router.post("/{order_id}/cancel")
def cancel_order(order_id: int, db: Session = Depends(get_db)):
    """Cancel an order"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.status in [OrderStatus.DELIVERED, OrderStatus.CANCELLED]:
        raise HTTPException(status_code=400, detail=f"Cannot cancel order with status: {order.status.value}")
    
    order.status = OrderStatus.CANCELLED
    db.commit()
    db.refresh(order)
    
    return {
        "id": order.id,
        "status": order.status.value,
        "message": "Order cancelled successfully"
    }


@router.post("/place-order")
def place_order(order_data: OrderCreateRequest, db: Session = Depends(get_db)):
    """Place a dream order (alias for create_order)"""
    return create_order(order_data, db)
