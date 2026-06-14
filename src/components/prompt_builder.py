from src.utils import load_prompt


class PromptBuilder:

    def __init__(self):
        self.prompt_template = load_prompt(
            "artifacts/prompts/career_prompt.txt"
        )

    def build_prompt(self, role: str, user_data: dict):

        formatted_data = ""

        for key, value in user_data.items():
            formatted_data += f"{key}: {value}\n"

        prompt = self.prompt_template.format(
            role=role,
            user_data=formatted_data
        )

        return prompt