from sqlalchemy import Column, Integer, String

from database.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), index=True)

    # Relationship to UserChat
    chats = relationship("UserChat", back_populates="user", cascade="all, delete-orphan")