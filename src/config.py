import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    GEMINI_API_KEY = os.getenv(
        "GEMINI_API_KEY"
    )

    MODEL_NAME = "gemini-2.5-flash"

    TEMPERATURE = 0.7

    MAX_TOKENS = 4000