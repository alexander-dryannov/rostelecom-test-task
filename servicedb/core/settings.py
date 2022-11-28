import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

# DATABASE = os.getenv("DATABASE_URL")
DATABASE = 'postgresql+asyncpg://alexander:1234567a@127.0.0.1:5432/citizenl'
