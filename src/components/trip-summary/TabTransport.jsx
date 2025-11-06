import React from "react";

export default function TabTransport({selectedRoute}) {

    return ( <div>
        <div className="card">
            <div className="card-content">
                <h3 className="card-title">🚄 Your Selected Transportation</h3>
                {selectedRoute ? (
                    <div className="transport-details">
                        <div className="transport-header">
                            <div>
                                <h4 className="transport-title">{selectedRoute.title}</h4>
                                <div
                                    className="transport-meta">Duration: {selectedRoute.duration} •
                                    Carbon: {selectedRoute.carbonFootprint}</div>
                            </div>
                            <div className="transport-pricing">
                                <div
                                    className="transport-price">${selectedRoute.price}</div>
                                <div className="transport-price-label">per person</div>
                            </div>
                        </div>
                        <div className="booking-info">
                            <h5 className="booking-info-title">📋 Booking Information</h5>
                            <div className="booking-info-details">
                                • Book tickets in advance for best prices
                                <br/>• Arrive 30 minutes early for departures
                            </div>
                        </div>
                        <button className="btn btn-primary"
                                onClick={() => (window.location.href = "/trip-routes")}>📝
                            Book Transportation
                        </button>
                    </div>
                ) : (
                    <div className="centered-text padded-content">
                        <div className="icon-large">🚄</div>
                        <p>No transportation selected yet</p>
                        <button className="btn btn-primary"
                                onClick={() => (window.location.href = "/trip-routes")}>Select
                            Transportation
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>);
}