import os

from dotenv import load_dotenv
# from pydantic_settings import BaseSettings

load_dotenv()

TUNE_STUDIO_API_KEY = os.getenv("TUNE_STUDIO_API_KEY")


# config = Config()
