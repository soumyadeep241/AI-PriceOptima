"""
FastAPI Backend for PriceOptima Pricing Model
Run with: uvicorn app:app --reload
Swagger UI: http://127.0.0.1:8000/docs
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import pandas as pd

app = FastAPI(
    title="PriceOptima Dynamic Pricing API",
    description="API to predict optimal product price using trained ML model",
    version="1.0"
)

# Configure CORS for React dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model and feature names
model = joblib.load("model/pricing_model.joblib")
feature_names = joblib.load("model/feature_names.joblib")
print(f"Model loaded with {len(feature_names)} features")

# Input schema (simplified for API use)
class PricingInput(BaseModel):
    cost: float = Field(..., description="Cost price of the product", example=200.0)
    demand: float = Field(..., description="Expected demand / units sold", example=120.0)
    inventory: int = Field(..., description="Current stock level", example=50)
    competitor_price: float = Field(..., description="Competitor's price", example=280.0)
    seasonality: int = Field(..., ge=0, le=1, description="0=Off-season, 1=Peak season", example=1)

class PricingOutput(BaseModel):
    predicted_demand: float
    recommended_price: float
    pricing_strategy: str

# Root endpoint
@app.get("/")
def home():
    return {"message": "PriceOptima API is running successfully"}

# Prediction endpoint
@app.post("/predict-price", response_model=PricingOutput)
def predict_price(data: PricingInput):
    try:
        # Build feature dict with zeros for all features
        input_dict = {feat: 0 for feat in feature_names}
        
        # Map API inputs to model features
        if 'Cost Price' in input_dict:
            input_dict['Cost Price'] = data.cost
        if 'Stock Level' in input_dict:
            input_dict['Stock Level'] = data.inventory
        if 'Competitor Price' in input_dict:
            input_dict['Competitor Price'] = data.competitor_price
        if 'rule_price' in input_dict:
            input_dict['rule_price'] = data.cost * 1.4  # Base markup
        if 'is_weekend' in input_dict:
            input_dict['is_weekend'] = 0
        if 'month' in input_dict:
            input_dict['month'] = 11 if data.seasonality == 1 else 6
        if 'is_month_end' in input_dict:
            input_dict['is_month_end'] = 0
        if 'units_sold_lag_1' in input_dict:
            input_dict['units_sold_lag_1'] = data.demand
        
        # Create DataFrame with correct column order
        X_input = pd.DataFrame([input_dict])[feature_names]
        
        # Predict demand
        predicted_demand = float(model.predict(X_input)[0])
        
        # Pricing strategy based on predicted demand
        HIGH_DEMAND = 50
        LOW_DEMAND = 20
        
        base_price = data.cost * 1.4  # 40% markup baseline
        
        if predicted_demand > HIGH_DEMAND:
            price_mult = 1.10
            strategy = "premium"
        elif predicted_demand < LOW_DEMAND:
            price_mult = 0.95
            strategy = "discount"
        else:
            price_mult = 1.05
            strategy = "standard"
        
        recommended_price = round(base_price * price_mult, 2)
        
        return PricingOutput(
            predicted_demand=round(predicted_demand, 2),
            recommended_price=recommended_price,
            pricing_strategy=strategy
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
