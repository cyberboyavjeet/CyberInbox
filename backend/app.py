from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from collections import Counter
import joblib
import json
import time

from clean import clean_text

app = FastAPI(
    title="CyberInbox API",
    description="AI-Powered Email Spam Detection System",
    version="1.0"
)

# -------------------- CORS --------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://cyber-inbox.vercel.app",
        "https://cyber-inbox-8w8tvwol1-cyberboyavjeets-projects.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- LOAD MODEL --------------------

model = joblib.load("spam_detector_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")


# -------------------- HOME --------------------

@app.get("/")
def home():
    return {
        "message": "Welcome to CyberInbox API 🚀"
    }


# -------------------- MODEL STATS --------------------

@app.get("/stats")
def get_stats():

    with open("model_stats.json", "r") as f:
        stats = json.load(f)

    return stats


# -------------------- REQUEST MODEL --------------------

class EmailRequest(BaseModel):
    email: str


# -------------------- PREDICT --------------------

@app.post("/predict")
def predict(data: EmailRequest):

    start_time = time.perf_counter()

    # Original Email
    email_text = data.email

    # Clean Email
    cleaned = clean_text(email_text)

    # Vectorize
    vector = vectorizer.transform([cleaned])

    # Prediction
    prediction = model.predict(vector)[0]

    # Prediction Probabilities
    probability = model.predict_proba(vector)[0]

    spam_probability = round(float(probability[1] * 100), 2)
    ham_probability = round(float(probability[0] * 100), 2)

    confidence = max(spam_probability, ham_probability)

    result = "Spam" if prediction == 1 else "Ham"

    # Email Statistics
    characters = len(email_text)
    words = len(cleaned.split())

    # Top Keywords
    counter = Counter(cleaned.split())

    top_keywords = [
        {
            "word": word,
            "count": count
        }
        for word, count in counter.most_common(5)
    ]

    # Risk Level
    if result == "Spam":

        if confidence >= 90:

            risk = "High"

            message = (
                "Potential spam email detected. "
                "Do not click suspicious links."
            )

        elif confidence >= 70:

            risk = "Medium"

            message = (
                "This email contains suspicious content. "
                "Verify before taking any action."
            )

        else:

            risk = "Low"

            message = (
                "This email has a few suspicious characteristics."
            )

    else:

        risk = "Safe"

        message = "This email appears to be legitimate."

    # Processing Time
    processing_time = round(
        (time.perf_counter() - start_time) * 1000,
        2
    )

    # AI Summary
    keyword_list = ", ".join(
        [item["word"] for item in top_keywords]
    )

    if not keyword_list:
        keyword_list = "No significant keywords"

    summary = (
        f"This email has been classified as {result}. "
        f"The model predicts a {spam_probability}% chance of Spam and "
        f"{ham_probability}% chance of Ham. "
        f"Detected keywords: {keyword_list}. "
        f"Risk Level: {risk}. "
        f"{message}"
    )

    return {

        "prediction": result,

        "confidence": confidence,

        "spam_probability": spam_probability,

        "ham_probability": ham_probability,

        "risk_level": risk,

        "message": message,

        "characters": characters,

        "words": words,

        "top_keywords": top_keywords,

        "processing_time": processing_time,

        "summary": summary,

        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    }