from sqlalchemy import Column, Integer, String

from database.database import Base


# Model for the URL table
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, index=True)
    chat = Column(String, index=True)