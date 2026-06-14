from src.exception import CustomException
import sys

class DataValidator:

    @staticmethod
    def validate_input(data: dict):

        try:

            if not data:
                raise ValueError("No data received")

            # ONLY required fields
            required_fields = [

                # Student
                "maths_score",
                "science_score",
                "english_score",
                "overall_percentage",
                "logical_reasoning",
                "communication",
                "favourite_subject",

                # Undergraduate
                "cgpa",
                "coding_score",
                "communication_score",

                # Working Professional
                "experience",
                "salary",
                "technical_skill",
                "leadership_skill",
                "communication_skill"
            ]

            for key, value in data.items():

                # Validate ONLY required fields
                if key in required_fields:

                    if value is None:
                        raise ValueError(
                            f"{key} cannot be empty"
                        )

                    if isinstance(value, str):

                        if value.strip() == "":

                            raise ValueError(
                                f"{key} cannot be empty"
                            )

            return True

        except Exception as e:

            raise CustomException(e, sys)
