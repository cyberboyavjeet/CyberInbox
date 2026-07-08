from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import joblib

from clean import clean_text
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CyberInbox API",
    description="AI-Powered Email Spam Detection System",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("spam_detector_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

@app.get("/")
def home():
    return {
        "message": "Welcome to CyberInbox API 🚀"
    }


class EmailRequest(BaseModel):
    email: str


@app.post("/predict")
def predict(data: EmailRequest):

    cleaned = clean_text(data.email)

    vector = vectorizer.transform([cleaned])

    prediction = model.predict(vector)[0]

    probability = model.predict_proba(vector)[0]

    confidence = float(max(probability) * 100)

    result = "Spam" if prediction == 1 else "Ham"

    # Risk Level
    if result == "Spam":
        if confidence >= 90:
            risk = "High"
            message = "Potential spam email detected. Do not click suspicious links."
        elif confidence >= 70:
            risk = "Medium"
            message = "This email contains suspicious content. Please verify before taking any action."
        else:
            risk = "Low"
            message = "This email has a few suspicious characteristics."
    else:
        risk = "Safe"
        message = "This email appears to be legitimate."

    return {
        "prediction": result,
        "confidence": round(confidence, 2),
        "risk_level": risk,
        "message": message,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }