from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

from src.pipeline.predict_pipeline import PredictPipeline

app = Flask(__name__)

pipeline = PredictPipeline()



@app.route("/")
def home():

    return render_template("index.html")

@app.route("/result")
def result():

    return render_template(
        "result.html"
    )


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        role = data.get("role")

        user_data = data.get("data")

        result = pipeline.predict(
            role,
            user_data
        )

        return jsonify(
            {
                "success": True,
                "result": result
            }
        )

    except Exception as e:

        return jsonify(
            {
                "success": False,
                "error": str(e)
            }
        ), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )