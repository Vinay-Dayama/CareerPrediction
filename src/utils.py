import json
import os


def load_prompt(prompt_path):
    with open(prompt_path, "r", encoding="utf-8") as file:
        return file.read()


def safe_json_loads(text):
    try:
        return json.loads(text)
    except Exception:
        return None


def save_json(data, file_path):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(
            data,
            file,
            indent=4,
            ensure_ascii=False
        )

def save_raw_response(response_text, path):

    with open(
        path,
        "w",
        encoding="utf-8"
    ) as file:

        file.write(response_text)