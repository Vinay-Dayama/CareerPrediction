from src.exception import CustomException
import sys


class DataValidator:

    @staticmethod
    def validate_input(data: dict):

        try:
            if not data:
                raise ValueError("No data received")

            for key, value in data.items():

                if value is None:
                    raise ValueError(f"{key} cannot be empty")

                if isinstance(value, str):
                    if value.strip() == "":
                        raise ValueError(f"{key} cannot be empty")

            return True

        except Exception as e:
            raise CustomException(e, sys)