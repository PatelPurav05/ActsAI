import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Config(BaseSettings):
    TUNE_STUDIO_API_KEY = os.getenv("TUNE_STUDIO_API_KEY")


config = Config()
