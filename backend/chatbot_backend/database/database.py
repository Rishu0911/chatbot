import urllib

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL (adjust this according to your PostgreSQL setup)
DB_PASSWORD = urllib. parse.quote_plus('123456')
DB_USER     = "root"
DB_HOST     = "localhost"
DB_PORT     = "3309"
DB_NAME     = "chatbot"
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/chatbot"

# SQLAlchemy setup
Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()