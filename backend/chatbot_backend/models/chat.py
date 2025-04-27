from database.database import Base

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class UserChat(Base):
    __tablename__ = "user_chats"  # Changed table name to avoid conflict
    id = Column(Integer, primary_key=True, index=True)
    query = Column(String(500), index=True)
    response = Column(String(500), index=True)
    username = Column(String(100), ForeignKey("users.username"), nullable=False)  # Foreign key to connect to User

    # Relationship back to User
    user = relationship("User", back_populates="chats")
