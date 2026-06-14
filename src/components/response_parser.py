import json
import re
import sys

from src.exception import CustomException

class ResponseParser:

    @staticmethod
    def parse_response(response_text):

        try:

            response_text = response_text.strip()

            # Remove markdown code blocks
            response_text = re.sub(
                r"^```json\s*",
                "",
                response_text,
                flags=re.IGNORECASE
            )

            response_text = re.sub(
                r"\s*```$",
                "",
                response_text
            )

            response_text = response_text.strip()

            # Extract JSON object
            first_brace = response_text.find("{")
            last_brace = response_text.rfind("}")

            if (
                first_brace != -1
                and last_brace != -1
                and last_brace > first_brace
            ):

                response_text = response_text[
                    first_brace:last_brace + 1
                ]

            else:

                raise ValueError(
                    "No valid JSON object found in response"
                )

            parsed_json = json.loads(response_text)

            # Convert Gemini response format
            formatted_response = {

                "career":
                    parsed_json.get("career", ""),

                "reason":
                    parsed_json.get("reason", ""),

                "salary": {

                    "entry":
                        parsed_json.get(
                            "salary",
                            {}
                        ).get(
                            "entry_level_india",
                            ""
                        ),

                    "mid":
                        parsed_json.get(
                            "salary",
                            {}
                        ).get(
                            "mid_level_india",
                            ""
                        ),

                    "senior":
                        parsed_json.get(
                            "salary",
                            {}
                        ).get(
                            "senior_level_india",
                            ""
                        )
                },

                "skills":
                    parsed_json.get(
                        "skills_required",
                        []
                    ),

                "courses":
                    parsed_json.get(
                        "recommended_courses",
                        []
                    ),

                "roadmap":
                    parsed_json.get(
                        "career_roadmap",
                        []
                    ),

                "strengths":
                    parsed_json.get(
                        "strengths",
                        []
                    ),

                "weaknesses":
                    parsed_json.get(
                        "weaknesses",
                        []
                    ),

                "improvement_areas":
                    parsed_json.get(
                        "improvement_areas",
                        []
                    )
            }

            return formatted_response

        except json.JSONDecodeError as e:

            raise CustomException(
                f"Failed to parse JSON: {str(e)}",
                sys
            )

        except Exception as e:

            raise CustomException(e, sys)
