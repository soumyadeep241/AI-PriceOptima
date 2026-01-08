# Optimal Price - Dynamic Pricing System

A complete machine learning-powered dynamic pricing solution with FastAPI backend and Vite + React dashboard.

## 🚀 Project Overview

Optimal Price is an intelligent pricing recommendation system that uses machine learning to predict optimal product prices based on:
- Cost price
- Expected demand
- Inventory levels
- Competitor pricing
- Seasonality

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **ML Model** | XGBoost / Scikit-learn |
| **Backend** | FastAPI + Uvicorn |
| **Frontend** | Vite + React 18 |
| **API Docs** | Swagger UI (auto-generated) |

## 📁 Project Structure

```
Milestone6_FastAPI/
├── app.py                 # FastAPI backend
├── requirements.txt       # Python dependencies
├── model/
│   ├── pricing_model.joblib    # Trained ML model
│   └── feature_names.joblib    # Feature names
├── dashboard/             # React.js frontend
│   ├── public/
│   └── src/
│       ├── App.jsx        # Main component
│       └── App.css        # Styling
└── README.md
```

## ⚡ Quick Start

### 1. Backend Setup

```bash
# Navigate to project folder
cd Milestone6_FastAPI

# Create virtual environment (optional)
python -m venv venv
.\venv\Scripts\activate   # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn app:app --reload
```

The API will be available at `http://127.0.0.1:8000`

### 2. Frontend Setup

```bash
# Navigate to dashboard folder
cd dashboard

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The dashboard will open at `http://localhost:5173`

> **Note**: All prices are displayed in Indian Rupees (₹ INR)

## 📖 API Documentation

Access the interactive API documentation at:
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/predict-price` | Get pricing recommendation |

### Sample Request

```json
{
  "cost": 200,
  "demand": 120,
  "inventory": 50,
  "competitor_price": 280,
  "seasonality": 1
}
```

### Sample Response

```json
{
  "predicted_demand": 45.23,
  "recommended_price": 308.00,
  "pricing_strategy": "standard"
}
```

## 🎯 Pricing Strategies

| Strategy | Condition | Price Adjustment |
|----------|-----------|------------------|
| **Premium** | High demand (>50 units) | +10% markup |
| **Standard** | Normal demand (20-50 units) | +5% markup |
| **Discount** | Low demand (<20 units) | -5% discount |

## 📸 Screenshots

### Swagger UI
![Swagger UI](./swagger_screenshot.png)

## 📝 License

This project was created for educational purposes as part of Milestone 6.
