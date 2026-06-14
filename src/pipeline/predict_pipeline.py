import os
import sys

from src.exception import CustomException
from src.logger import logger

from src.components.data_validation import DataValidator
from src.components.prompt_builder import PromptBuilder
from src.components.ai_prediction import AIPredictor
from src.components.response_parser import ResponseParser

from src.utils import save_raw_response

class PredictPipeline:

    def __init__(self):

        self.validator = DataValidator()

        self.prompt_builder = PromptBuilder()

        self.predictor = AIPredictor()

        self.parser = ResponseParser()

    def predict(self, role, user_data):

        try:

            logger.info("Prediction pipeline started")

            # Validate input
            self.validator.validate_input(user_data)

            # Build prompt
            prompt = self.prompt_builder.build_prompt(
                role=role,
                user_data=user_data
            )

            # Get Gemini response
            raw_response = self.predictor.get_prediction(
                prompt
            )

            # Extract text safely
            response_text = ""

            try:

                response_text = raw_response.text

            except Exception:

                response_text = str(raw_response)

            # Print response for debugging
            print("\n========== RAW GEMINI RESPONSE ==========\n")
            print(response_text)
            print("\n=========================================\n")

            # Create artifacts folder
            os.makedirs(
                "artifacts/responses",
                exist_ok=True
            )

            # Save raw response
            save_raw_response(
                response_text,
                "artifacts/responses/latest_response.json"
            )

            # Parse response
            parsed_response = self.parser.parse_response(
                response_text
            )

            print("\n========== PARSED RESPONSE ==========\n")
            print(parsed_response)
            print("\n=====================================\n")

            logger.info("Prediction completed")

            return parsed_response

        except Exception as e:

            print("\n========== PIPELINE ERROR ==========\n")
            print(str(e))
            print("\n====================================\n")

            raise CustomException(e, sys)
