from fastapi import FastAPI,Body
from starlette.middleware.cors import CORSMiddleware

# Initialize the FastAPI application
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a simple route
@app.get("/")
def read_root():
    return {"message": "Welcome to your FastAPI application!"}

# Another example endpoint
@app.post("/process")
async def submit_text(text: str = Body(..., embed=True)):
    return {"received_text": f"Hey user has placed text {text}"}