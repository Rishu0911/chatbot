from time import sleep

from fastapi import FastAPI, Body, APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

from core import process_query
from database.database import get_db
from models.chat import UserChat
from util.jwt import decode_jwt_token

# Initialize the FastAPI application
router = APIRouter(
    prefix= "/agent",
    tags= ["agent"]
)

@router.get("/chats")
def get_user_chat(user: dict =  Depends(decode_jwt_token), db: Session = Depends(get_db)):
    chats = db.query(UserChat).filter(UserChat.username == user.get('username')).all()
    return chats

# Another example endpoint
@router.post("/process")
async def submit_text(text: str = Body(..., embed=True), user: dict =  Depends(decode_jwt_token), db: Session = Depends(get_db)):
    response = process_query(text)
    # response = text
    response = response[:500]
    chat_entry = UserChat(
        query=text,
        response=response,
        username=user.get('username')
    )
    db.add(chat_entry)
    db.commit()
    return {"received_text": response}

@router.delete("/chats")
def clear_user_chat(user: dict =  Depends(decode_jwt_token), db: Session = Depends(get_db)):
    db.query(UserChat).filter(UserChat.username == user.get('username')).delete()

    db.commit()
    return {"response": "Chats Cleared"}

