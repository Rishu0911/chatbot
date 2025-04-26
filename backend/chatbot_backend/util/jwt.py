from typing import Annotated

from fastapi import Depends

import jwt
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
SECRET_KEY = "RISHU091199"  # Change this to something more secure
ALGORITHM = "HS256"
OAuth2_bearer = OAuth2PasswordBearer(tokenUrl='/auth/authenticate')




def create_jwt_token(data: dict) -> str:
    """Generate a JWT token with an expiration time."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)  # Token expires in 60 minutes
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)




def decode_jwt_token(token: Annotated[str, Depends(OAuth2_bearer)]) -> dict:
    """Verify and decode the JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise Exception("Token has expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token")


