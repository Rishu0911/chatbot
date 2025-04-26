from pydantic import BaseModel

# Data model for request body
class UserItem(BaseModel):
    username: str
    password: str
