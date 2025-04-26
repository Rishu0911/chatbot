from fastapi import FastAPI, Body, APIRouter
from starlette.middleware.cors import CORSMiddleware

from core import process_query

# Initialize the FastAPI application
router = APIRouter(
    prefix= "/agent",
    tags= ["agent"]
)



# Define a simple route
@router.get("/")
def read_root():
    return {"message": "Welcome to your FastAPI application!"}

# Another example endpoint
@router.post("/process")
async def submit_text(text: str = Body(..., embed=True)):
    response = process_query(text)
    return {"received_text": response}