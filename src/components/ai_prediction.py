import google.generativeai as genai
import sys

from src.config import Config
from src.exception import CustomException
from src.logger import logger


class AIPredictor:

    def __init__(self):

        genai.configure(
            api_key=Config.GEMINI_API_KEY
        )

        self.model = genai.GenerativeModel(
            Config.MODEL_NAME
        )

    def get_prediction(self, prompt):

        try:

            logger.info(
                "Sending request to Gemini"
            )

            response = self.model.generate_content(
                prompt,
                generation_config={
                    "temperature": Config.TEMPERATURE,
                    "max_output_tokens": Config.MAX_TOKENS
                }
            )

            logger.info(
                "Gemini response received"
            )

            return response.text

        except Exception as e:

            logger.error(str(e))

            raise CustomException(
                e,
                sys
            )