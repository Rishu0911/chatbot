from http.client import HTTPException

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

from database.database import get_db
from models.user_model import User
from pydentic_models.user_item import UserItem
from util.jwt import create_jwt_token
from util.password_hashing import verify_password, hash_password

router = APIRouter(
    prefix= "/auth",
    tags= ["auth"]
)

@router.post("/create")
async def create_user(user: UserItem, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)
    user_model = User(
        username= user.username,
        password= hashed_password,
        chat= ""
    )
    db.add(user_model)
    db.commit()
    return user_model

@router.post("/authenticate")
async def authenticate_user(user: UserItem, db: Session = Depends(get_db)):
    user_model = db.query(User).filter(User.username == user.username).first()
    if not verify_password(user.password, user_model.password):
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, detail="Invalid Password")
    token = create_jwt_token({"username" : user.username})
    return {"token" : token}


