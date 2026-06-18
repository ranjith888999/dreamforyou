"""
Migration: Add google_id column to users table
This adds support for Google OAuth 2.0 authentication
"""

import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import text
from app.database import engine

def upgrade():
    """Add google_id column to users table"""
    with engine.connect() as conn:
        # Check if column already exists
        result = conn.execute(text("""
            SELECT EXISTS (
                SELECT 1 FROM information_schema.columns 
                WHERE table_name='users' AND column_name='google_id'
            )
        """))
        
        column_exists = result.scalar()
        
        if not column_exists:
            # Add the column
            conn.execute(text("""
                ALTER TABLE users 
                ADD COLUMN google_id VARCHAR(255) UNIQUE NULL
            """))
            
            # Create index for faster lookups
            conn.execute(text("""
                CREATE INDEX idx_users_google_id ON users(google_id)
            """))
            
            conn.commit()
            print("✅ Added google_id column to users table")
        else:
            print("ℹ️ google_id column already exists")

def downgrade():
    """Remove google_id column from users table"""
    with engine.connect() as conn:
        conn.execute(text("""
            DROP INDEX IF EXISTS idx_users_google_id
        """))
        
        conn.execute(text("""
            ALTER TABLE users DROP COLUMN IF EXISTS google_id
        """))
        
        conn.commit()
        print("✅ Removed google_id column from users table")

if __name__ == "__main__":
    print("Running migration: Add google_id to users...")
    try:
        upgrade()
        print("Migration completed successfully!")
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        raise
