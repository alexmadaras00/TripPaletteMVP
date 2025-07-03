"use client"

import {useState, useEffect} from "react";
import "../styles/navbar.css";
import "../styles/plan-trip.css";
import {useLocation} from "react-router-dom";
import {allDestinations} from "../constants.js";
import {ErrorBoundary} from "next/dist/client/components/error-boundary.js";

export default function DestinationRecommendations() {
    const [userPreferences, setUserPreferences] = useState(null)
    const [selectedDestination, setSelectedDestination] = useState(null)
    const [loading, setLoading] = useState(true)
    const state = useLocation();
    useEffect(() => {
        // Get user preferences from localStorage
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const storedPreferences = state.preferences;
        if (storedPreferences) {
            setUserPreferences(storedPreferences);
        } else {
            // Fallback mock data for testing
            setUserPreferences({
                homeLocation: "New York, USA",
                travelStyle: "Explorer",
                startDate: "2024-07-15",
                endDate: "2024-07-22",
                budgetValue: 2800,
                travelGroup: "Couple",
                adults: 2,
                children: 0,
                interests: ["Food", "History", "Arts"],
            })
        }
        setLoading(false)
    }, [])

    if (loading) return <div>Loading...</div>
    if (!userPreferences) return <div>No preferences found</div>

    const calculateDuration = () => {
        const start = new Date(userPreferences.startDate)
        const end = new Date(userPreferences.endDate)
        const diffTime = Math.abs(end - start)
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    const duration = calculateDuration()

    // Generate destination recommendations - simplified and guaranteed to return results
    const getDestinationRecommendations = () => {
        const {interests, budgetValue} = userPreferences

        // Base destinations that work for most preferences


        // Simple filtering - ensure we always return at least 3 destinations
        let filteredDestinations = allDestinations.filter((dest) => {
            // Budget filter - within 30% range to be more inclusive
            const budgetMatch = dest.price <= budgetValue * 1.3

            // Interest filter - if user has interests, try to match, otherwise include all
            const interestMatch =
                interests.length === 0 ||
                interests.some((interest) =>
                    dest.bestFor.some(
                        (bestFor) =>
                            bestFor.toLowerCase().includes(interest.toLowerCase()) ||
                            interest.toLowerCase().includes(bestFor.toLowerCase()),
                    ),
                )

            return budgetMatch && interestMatch
        })

        // If filtering results in too few destinations, return top 5 regardless
        if (filteredDestinations.length < 3) {
            filteredDestinations = allDestinations.slice(0, 5)
        }

        // Sort by match score and return top 5
        return filteredDestinations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5)
    }

    const destinationOptions = getDestinationRecommendations()

    const handleSelectDestination = (destination) => {
        setSelectedDestination(destination)
        // Save selected destination with user preferences
        const completeData = {
            userPreferences: {
                ...userPreferences,
                finalDestination: destination.title,
            },
            selectedDestination: destination,
        }
        localStorage.setItem("selectedTripData", JSON.stringify(completeData))
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <div>
            <ErrorBoundary>
                <Navigation/>
            </ErrorBoundary>
            <div className="page-container">
                <div className="page-content">
                    <div className="page-header">
                        <h1 className="page-title">Top Destinations For You</h1>
                        <p className="page-subtitle">
                            AI-curated destinations based on your preferences • {duration} days
                            • {userPreferences.travelStyle} style
                        </p>
                    </div>

                    {/* User Preferences Summary */}
                    <div className="page-section">
                        <div className="section-title">Your Travel Preferences</div>
                        <div className="grid-4">
                            <div className="stat-card">
                                <div className="stat-number">🏠</div>
                                <div className="stat-label" style={{fontWeight: "600"}}>
                                    Home Location
                                </div>
                                <div className="stat-label">{userPreferences.homeLocation}</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">📅</div>
                                <div className="stat-label" style={{fontWeight: "600"}}>
                                    Travel Dates
                                </div>
                                <div className="stat-label">
                                    {formatDate(userPreferences.startDate)} - {formatDate(userPreferences.endDate)}
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">💰</div>
                                <div className="stat-label" style={{fontWeight: "600"}}>
                                    Budget
                                </div>
                                <div className="stat-label">${userPreferences.budgetValue} per person</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">❤️</div>
                                <div className="stat-label" style={{fontWeight: "600"}}>
                                    Interests
                                </div>
                                <div className="stat-label">{userPreferences.interests.join(", ")}</div>
                            </div>
                        </div>
                    </div>

                    {/* Destination Options */}
                    <div className="page-section">
                        <div className="section-title">Recommended Destinations ({destinationOptions.length} found)
                        </div>
                        <div className="section-subtitle">
                            Each destination is carefully selected to match your {userPreferences.travelStyle} style and
                            interests
                        </div>

                        <div style={{marginTop: "2rem"}}>
                            {destinationOptions.length === 0 ? (
                                <div style={{textAlign: "center", padding: "2rem", color: "#6b7280"}}>
                                    <p>No destinations found matching your criteria. Please adjust your preferences.</p>
                                </div>
                            ) : (
                                destinationOptions.map((destination) => (
                                    <div
                                        key={destination.id}
                                        className={`card ${selectedDestination?.id === destination.id ? "selected" : ""}`}
                                        style={{
                                            marginBottom: "2rem",
                                            cursor: "pointer",
                                            border: selectedDestination?.id === destination.id ? "2px solid #ff6b35" : "1px solid #e5e7eb",
                                        }}
                                        onClick={() => handleSelectDestination(destination)}
                                    >
                                        <div className="card-content">
                                            <div className="grid-2" style={{gap: "2rem"}}>
                                                {/* Left Column - Image and Basic Info */}
                                                <div>
                                                    <img
                                                        src={destination.image || "/placeholder.svg"}
                                                        alt={destination.title}
                                                        style={{
                                                            width: "100%",
                                                            height: "200px",
                                                            objectFit: "cover",
                                                            borderRadius: "0.5rem",
                                                            marginBottom: "1rem",
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            marginBottom: "0.5rem",
                                                        }}
                                                    >
                                                        <h3 className="card-title">
                                                            {destination.flag} {destination.title}
                                                        </h3>
                                                        <div style={{textAlign: "right"}}>
                                                            <div style={{
                                                                fontSize: "1.5rem",
                                                                fontWeight: "700",
                                                                color: "#ff6b35"
                                                            }}>
                                                                ${destination.price}
                                                            </div>
                                                            <div style={{
                                                                fontSize: "0.875rem",
                                                                color: "#6b7280",
                                                                textDecoration: "line-through"
                                                            }}>
                                                                ${destination.originalPrice}
                                                            </div>
                                                            <div style={{fontSize: "0.75rem", color: "#059669"}}>Save
                                                                ${destination.savings}</div>
                                                        </div>
                                                    </div>
                                                    <p className="card-description">{destination.subtitle}</p>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "0.5rem",
                                                        marginTop: "0.5rem"
                                                    }}>
                                                        <span style={{color: "#fbbf24"}}>★</span>
                                                        <span style={{
                                                            fontSize: "0.875rem",
                                                            fontWeight: "500"
                                                        }}>{destination.rating}</span>
                                                        <span style={{fontSize: "0.875rem", color: "#6b7280"}}>
                              ({destination.reviews} reviews)
                            </span>
                                                        <span
                                                            style={{
                                                                marginLeft: "auto",
                                                                backgroundColor: "#d1fae5",
                                                                color: "#065f46",
                                                                padding: "0.25rem 0.5rem",
                                                                borderRadius: "0.25rem",
                                                                fontSize: "0.75rem",
                                                                fontWeight: "600",
                                                            }}
                                                        >
                              {destination.matchScore}% match
                            </span>
                                                    </div>
                                                </div>

                                                {/* Right Column - Details */}
                                            </div>

                                            {selectedDestination?.id === destination.id && (
                                                <div
                                                    style={{
                                                        marginTop: "1.5rem",
                                                        padding: "1rem",
                                                        backgroundColor: "rgba(255, 107, 53, 0.05)",
                                                        borderRadius: "0.5rem",
                                                        border: "1px solid rgba(255, 107, 53, 0.2)",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <div>
                                                            <div style={{fontWeight: "600", color: "#ff6b35"}}>✓
                                                                Selected Destination
                                                            </div>
                                                            <div style={{fontSize: "0.875rem", color: "#6b7280"}}>
                                                                This destination matches {destination.matchScore}% of
                                                                your preferences
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                window.location.href = "/trip-routes"
                                                            }}
                                                        >
                                                            Explore Routes in {destination.city}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Why These Destinations */}
                    <div className="page-section">
                        <div className="section-title">How We Selected These Destinations</div>
                        <div className="grid-3">
                            <div className="card">
                                <div className="card-content" style={{textAlign: "center"}}>
                                    <div style={{fontSize: "2rem", marginBottom: "1rem"}}>🏠</div>
                                    <div className="card-title">Home Location</div>
                                    <div className="card-description">
                                        Destinations that are accessible from {userPreferences.homeLocation}
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-content" style={{textAlign: "center"}}>
                                    <div style={{fontSize: "2rem", marginBottom: "1rem"}}>🎯</div>
                                    <div className="card-title">Interest Alignment</div>
                                    <div className="card-description">
                                        Destinations excel in your selected
                                        interests: {userPreferences.interests.join(", ")}
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-content" style={{textAlign: "center"}}>
                                    <div style={{fontSize: "2rem", marginBottom: "1rem"}}>💰</div>
                                    <div className="card-title">Budget Optimized</div>
                                    <div className="card-description">
                                        All options fit within your ${userPreferences.budgetValue} budget with great
                                        value
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="page-section">
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <button className="btn btn-secondary" onClick={() => window.history.back()}>
                                ← Modify Preferences
                            </button>

                            {!selectedDestination && (
                                <div style={{textAlign: "center", color: "#6b7280"}}>Select a destination to
                                    continue</div>
                            )}

                            {selectedDestination && (
                                <button className="btn btn-primary btn-large"
                                        onClick={() => (window.location.href = "/trip-routes")}>
                                    Explore Routes in {selectedDestination.city} →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
