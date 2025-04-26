from faiss.contrib.datasets import username
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.testing.suite.test_reflection import users

from database.database import get_db
from models.user_model import User
from pydentic_models.user_item import UserItem

router = APIRouter(
    prefix= "/auth",
    tags= ["auth"]
)

@router.get("/users")
async def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@router.post("/users")
async def create_user(user: UserItem, db: Session = Depends(get_db)):
    user_model = User(
        username= user.username,
        password= user.password,
        chat= ""
    )
    db.add(user_model)
    db.commit()
    return user_model