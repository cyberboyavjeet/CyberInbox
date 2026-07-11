# 🛡️ CyberInbox - AI Powered Email Spam Detection

CyberInbox is an AI-powered Email Spam Detection System built using Machine Learning, FastAPI and React. It analyzes email content and classifies it as Spam or Ham while providing confidence scores, keyword analysis, security insights and downloadable PDF reports.

---

## 🌐 Live Demo

Frontend:
https://cyber-inbox.vercel.app

Backend API:
https://cyberinbox-api.onrender.com

API Documentation:
https://cyberinbox-api.onrender.com/docs

---

## Features

- AI-based Spam Detection
- Logistic Regression ML Model
- TF-IDF Text Vectorization
- Confidence Score
- Spam/Ham Probability
- Risk Level Detection
- Top Keyword Extraction
- AI Generated Summary
- Security Summary
- PDF Report Download
- Email Statistics
- Dataset Visualization
- Scan History
- Responsive UI

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Chart.js
- React Circular Progressbar
- jsPDF

### Backend

- FastAPI
- Scikit-learn
- Joblib
- NLTK
- Pandas

### Machine Learning

- Logistic Regression
- TF-IDF Vectorizer
- SpamAssassin Dataset

---

## Project Structure

CyberInbox/

├── backend/

│ ├── app.py

│ ├── clean.py

│ ├── spam_detector_model.pkl

│ ├── tfidf_vectorizer.pkl

│ ├── model_stats.json

│ └── requirements.txt

│

├── frontend/

│ ├── src/

│ ├── public/

│ ├── package.json

│ └── vite.config.js

---

## Installation

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoint

POST

```
/predict
```

Request

```json
{
    "email":"Your email text"
}
```

Response

```json
{
    "prediction":"Spam",
    "confidence":91.83,
    "risk_level":"High",
    "summary":"..."
}
```

---

## Deployment

Frontend

- Vercel

Backend

- Render

---

## Dataset

SpamAssassin Public Corpus

---

## Future Improvements

- Deep Learning Models
- BERT Based Classification
- Multi-language Email Detection
- User Authentication
- Database Integration
- Email Inbox Integration

---

## Developer

Avjeet Kumar

B.Tech CSE

Cyber Security Enthusiast

GitHub:
https://github.com/cyberboyavjeet

---

## License

MIT License