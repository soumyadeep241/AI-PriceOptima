import { useState } from 'react'
import './App.css'

const API_URL = 'http://127.0.0.1:8000'

function App() {
  const [formData, setFormData] = useState({
    cost: 200,
    demand: 120,
    inventory: 50,
    competitor_price: 280,
    seasonality: 1
  })
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'seasonality' ? parseInt(value) : parseFloat(value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/predict-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('API request failed')
      }
      
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError('Failed to get prediction. Make sure the FastAPI server is running on port 8000.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStrategyColor = (strategy) => {
    return '#ffffff'  // Pure white for all strategies
  }

  const getStrategyIcon = (strategy) => {
    switch (strategy) {
      case 'premium': return '↑'
      case 'discount': return '↓'
      default: return '→'
    }
  }

  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <span className="logo-icon">◆</span>
            <h1>Optimal Price</h1>
          </div>
          <p className="subtitle">Dynamic Pricing Strategy Dashboard</p>
        </header>

        <div className="main-content">
          {/* Input Form */}
          <div className="card form-card">
            <h2>Input Parameters</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="cost">Cost Price (₹)</label>
                  <input
                    type="number"
                    id="cost"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="demand">Expected Demand</label>
                  <input
                    type="number"
                    id="demand"
                    name="demand"
                    value={formData.demand}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="inventory">Inventory Level</label>
                  <input
                    type="number"
                    id="inventory"
                    name="inventory"
                    value={formData.inventory}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="competitor_price">Competitor Price (₹)</label>
                  <input
                    type="number"
                    id="competitor_price"
                    name="competitor_price"
                    value={formData.competitor_price}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="seasonality">Seasonality</label>
                  <select
                    id="seasonality"
                    name="seasonality"
                    value={formData.seasonality}
                    onChange={handleChange}
                  >
                    <option value={0}>Off-Season</option>
                    <option value={1}>Peak Season</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>Get Optimal Price</>
                )}
              </button>
            </form>
          </div>

          {/* Results Card */}
          <div className="card results-card">
            <h2>Pricing Recommendation</h2>
            
            {error && (
              <div className="error-message">
                ! {error}
              </div>
            )}
            
            {result ? (
              <div className="results">
                <div className="result-item main-result">
                  <span className="result-label">Recommended Price</span>
                  <span className="result-value price">
                    {formatINR(result.recommended_price)}
                  </span>
                </div>
                
                <div className="result-item">
                  <span className="result-label">Predicted Demand</span>
                  <span className="result-value">
                    {result.predicted_demand.toFixed(0)} units
                  </span>
                </div>
                
                <div className="result-item">
                  <span className="result-label">Pricing Strategy</span>
                  <span 
                    className="result-value strategy-badge"
                    style={{ backgroundColor: getStrategyColor(result.pricing_strategy) }}
                  >
                    {getStrategyIcon(result.pricing_strategy)} {result.pricing_strategy.toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="no-results">
                <span className="placeholder-icon">◇</span>
                <p>Enter your parameters and click "Get Optimal Price" to see recommendations</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Powered by ML-based Dynamic Pricing • FastAPI Backend</p>
        </footer>
      </div>
    </div>
  )
}

export default App
