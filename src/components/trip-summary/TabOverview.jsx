import React from "react";

export default function TabOverview({tripData,totalActivities, totalMeals,selectedRoute}) {
    return ( <div>
        <div className="stats-list">
            <div className="stat-card">
                <div className="stat-number-summary">{tripData.numberOfDays}</div>
                <div className="stat-label">Days</div>
            </div>
            <div className="stat-card">
                <div className="stat-number-summary">{totalActivities}</div>
                <div className="stat-label">Activities</div>
            </div>
            <div className="stat-card">
                <div className="stat-number-summary">{totalMeals}</div>
                <div className="stat-label">Meals Planned</div>
            </div>
            <div className="stat-card">
                <div
                    className="stat-number-summary">{selectedRoute?.carbonFootprint || "0.5 tons"}</div>
                <div className="stat-label-summary">CO2 Footprint</div>
            </div>
        </div>
        <div className="card card-margin">
            <div className="card-content">
                <h3 className="card-title">🎯 Your Interests Covered</h3>
                <div className="interests-container">
                    {tripData.interests.map((interest, index) => <span key={index}
                                                                       className="interest-tag">{interest}</span>)}
                </div>
            </div>
        </div>
        <div className="grid-2">
            <div className="card">
                <div className="card-content">
                    <h3 className="card-title">🌤️ Weather Forecast</h3>
                    <div className="weather-info">
                        <div className="weather-temp">☀️ 24°C</div>
                        <div className="weather-desc">Sunny with occasional clouds.</div>
                        <div className="weather-details">
                            • High: 26°C, Low: 18°C <br/>• 10% chance of rain
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <h3 className="card-title">🎒 Packing Essentials</h3>
                    <div className="packing-list">
                        <ul className="checklist">
                            {["Comfortable walking shoes", "Light jacket", "Phone charger", "Travel adapter (Type C/E)"].map((item, index) => (
                                <li key={index}><span className="check-icon">✓</span>{item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}