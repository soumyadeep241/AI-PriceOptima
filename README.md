# 🚀 PriceOptima – ML-Powered Dynamic Pricing System


An **end-to-end dynamic pricing system** that leverages **machine learning** to recommend optimal product prices based on demand patterns, inventory levels, competitor pricing, and seasonality.

Built with **FastAPI** for real-time inference and **React (Vite)** for interactive visualization.

---

## 📌 Problem Statement

Static pricing fails to adapt to:

* Fluctuating demand
* Inventory constraints
* Competitive market dynamics

**PriceOptima** solves this by using **ML-driven demand prediction** combined with **pricing strategies** to maximize revenue while maintaining competitiveness.

---

## 🎯 Key Objectives

* Predict future demand using ML models
* Generate optimal prices dynamically
* Compare **Static vs Rule-Based vs ML-Based pricing**
* Achieve measurable **revenue uplift**
* Deploy a production-ready pricing API

---

## 🧠 System Highlights

✔ Full ML pipeline (EDA → Feature Engineering → Modeling → Deployment)
✔ Rule-based pricing baseline
✔ ML-based demand prediction (XGBoost / LightGBM)
✔ Revenue backtesting & KPI evaluation
✔ FastAPI backend with Swagger UI
✔ React dashboard (Vite)
✔ Modular & scalable architecture

---

## 🛠️ Tech Stack

| Layer           | Technology        |
| --------------- | ----------------- |
| Language        | Python            |
| Data Processing | Pandas, NumPy     |
| ML Models       | XGBoost, LightGBM |
| Backend         | FastAPI, Uvicorn  |
| Frontend        | React 18 + Vite   |
| Model Storage   | Joblib            |
| API Docs        | Swagger UI        |

---

## 📁 Repository Structure

```
PriceOptima/
├── app.py                      # FastAPI backend
├── requirements.txt            # Python dependencies
├── model/
│   ├── pricing_model.joblib    # Trained ML model
│   └── feature_names.joblib    # Feature list
├── dashboard/                  # React frontend
│   ├── public/
│   └── src/
│       ├── App.jsx
│       └── App.css
├── PriceOptima_Dataset.csv
└── README.md
```

---

## 🧩 Project Milestones

### ✅ Milestone 1 – Requirements & Data Preparation

* Defined business goals and KPIs
* Collected and validated pricing dataset
* Ensured data consistency and quality
* Final KPI Summary:
KPI	Value
0	Revenue Lift (%)	6.06
1	Profit Margin Improvement (%)	7.34
2	Conversion Rate Change (%)	33.06
3	Inventory Turnover Ratio	28.63

### ✅ Milestone 2 – Exploratory Data Analysis (EDA)

* Analyzed price, demand, revenue & inventory trends
* Identified correlations and outliers
* Generated business insights

### ✅ Milestone 3 – Feature Engineering

* Time-based features (day, month, weekend, season)
* Lag & rolling demand features
* Inventory and profit-related indicators
* ML-ready dataset preparation

### ✅ Milestone 4 – Rule-Based Pricing Engine

* Designed pricing rules using:

  * Time
  * Demand
  * Inventory
* Compared static vs rule-based pricing
* Achieved **positive revenue lift**
* === Revenue Lift Result ===
Static Revenue: 3834423
Rule-Based Revenue: 3355508.97
Revenue Lift: 12.49 %

### ✅ Milestone 5 – ML-Based Dynamic Pricing

* Trained XGBoost & LightGBM models
* Used time-based train-test split
* Simulated ML-driven pricing
* Compared:

  * Static
  * Rule-Based
  * ML-Based pricing strategies
  * XGBoost RMSE: 11.630111390988345
  * XGBoost MAE: 9.658175468444824
  * Revenue Comparison
  Pricing Strategy  Total Revenue
0           Static     808283.000
1       Rule-Based     708512.414
2         ML-Based     841869.700


### ✅ Milestone 6 – Deployment & Dashboard

* Deployed model using FastAPI
* Created `/predict-price` endpoint
* Integrated React dashboard
* Documented entire system

---

## ⚡ Quick Start

### 🔧 Backend Setup

```bash
git clone https://github.com/your-username/PriceOptima.git
cd PriceOptima

python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
uvicorn app:app --reload
```

📍 API runs at: `http://127.0.0.1:8000`

---

### 🎨 Frontend Setup

```bash
cd dashboard
npm install
npm run dev
```

📍 Dashboard runs at: `http://localhost:5173`

---

## 📖 API Documentation

* **Swagger UI** → `http://127.0.0.1:8000/docs`
* **ReDoc** → `http://127.0.0.1:8000/redoc`

---

## 🔌 API Usage

### Request

```json
{
  "cost": 200,
  "demand": 120,
  "inventory": 50,
  "competitor_price": 280,
  "seasonality": 1
}
```

### Response

```json
{
  "predicted_demand": 45.23,
  "recommended_price": 308.0,
  "pricing_strategy": "standard"
}
```

---

## 🎯 Pricing Logic

| Strategy | Demand Condition      | Adjustment |
| -------- | --------------------- | ---------- |
| Premium  | High demand (>50)     | +10%       |
| Standard | Medium demand (20–50) | +5%        |
| Discount | Low demand (<20)      | −5%        |

---

## 📊 KPIs Evaluated

* 📈 Revenue Lift (%)
* 💰 Profit Margin Improvement
* 🔄 Conversion Rate (Proxy)
* 📦 Inventory Turnover



## 🔮 Future Scope

* Real-time streaming data
* Reinforcement Learning pricing
* Docker & cloud deployment
* Advanced KPI dashboards
* Multi-store & multi-product pricing

---

## 🧑‍💻 Author

**Soumyadeep Pal**
