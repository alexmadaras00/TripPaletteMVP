import "../../styles/my-trips.css";
import {useEffect} from "react";

export default function TripCard({trips, trip, deleteTrips, duplicateTrips}) {

    if (!trip) {
        return null;
    }
    const caseStatus = () => {
        let status = trip.status;
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
    const getStatusEmoji = (status) => {
        switch (status) {
            case "upcoming":
                return "✈️"
            case "completed":
                return "✅"
            case "draft":
                return "📝"
            default:
                return "📍"
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "upcoming":
                return "#3b82f6"
            case "completed":
                return "#10b981"
            case "draft":
                return "#f59e0b"
            default:
                return "#6b7280"
        }
    }

    return (
        <div className="trip-card">
            <div className="trip-card-img" style={{
                backgroundImage: `url(${trip.image})`, display: "flex",
                width: "100%"
            }}>
                <div className="trip-card-upper-image">
                    <div style={{
                        textColor: getStatusColor(trip.status),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "15%",
                        width: "9rem",
                        fontSize: "1rem",
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "0.75rem",
                        fontWeight: "bold"
                    }}>{getStatusEmoji(trip.status) + caseStatus()}</div>
                    <div className="trip-card-flag">{trip.flag}</div>
                </div>
                <div className="trip-card-match">
                    {trip.matchScore}% Match
                </div>
            </div>
            <div className="trip-card-content">
                <h1 className="trip-card-title">{trip.destination}</h1>
                <div className="trip-card-info">
                    <div className="trip-card-col">
                        <h3 className="trip-card-title3">📅 Duration:</h3>
                        <p>{trip.duration}</p>
                        <h3 className="trip-card-title3">👥 Group:</h3>
                        <p>{trip.groupType}</p>
                    </div>
                    <div className="trip-card-col">
                        <h3 className="trip-card-title3">💰 Budget:</h3>
                        <p>{trip.budget}</p>
                        <h3 className="trip-card-title3">🎯 Style:</h3>
                        <p>{trip.travelStyle}</p>
                    </div>
                </div>
                <h2 className="trip-card-title2">🎯 Activities:</h2>
                <ul className="trip-card-activities">
                    {trip.activities.map((activity) => (
                        <li className="trip-card-activity" key={activity}>{activity}</li>
                    ))}
                </ul>
                <h2 className="trip-card-title2">💝 Interests:</h2>
                <ul className="trip-card-activities">
                    {trip.interests.map((interest) => (
                        <li className="trip-card-interest" key={interest}>{interest}</li>
                    ))}
                </ul>
                <sub className="saved">Saved on {new Date(trip.savedDate).toLocaleDateString()}</sub>
                <div className="trip-card-bottom">
                    <button className="trip-card-details">View Details</button>
                    <button className="trip-card-duplicate" onClick={() => duplicateTrips(trip)}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#f3f4f6")}>📋
                    </button>
                    <button className="trip-card-remove" onClick={() => deleteTrips(trip.id)}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#fecaca")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#fee2e2")}> 🗑️
                    </button>
                </div>
            </div>


        </div>
    );

};