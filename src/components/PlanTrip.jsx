"use client"

import {useState} from "react"
import Navigation from "../components/Navigation.jsx";
import "../styles/navbar.css"
import "../styles/plan-trip.css"
import {Link, useNavigate} from "react-router-dom";

export default function PlanTrip() {
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedTravelStyle, setSelectedTravelStyle] = useState("Explorer")
    const [budgetValue, setBudgetValue] = useState(3100)
    const [selectedTravelGroup, setSelectedTravelGroup] = useState("Couple")
    const [selectedInterests, setSelectedInterests] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    // Change destination to homeLocation
    const [homeLocation, setHomeLocation] = useState("")

    // Add this function at the top of the component, after the state declarations
    const calculateTripDuration = () => {
        if (startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)
            const diffTime = Math.abs(end - start)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays
        }
        return 7 // default to 7 days
    }

    const getDynamicBudgetRange = () => {
        const days = calculateTripDuration()
        const baseMin = 50 // $50 per day minimum
        const baseMax = 500 // $500 per day maximum

        return {
            min: baseMin * days,
            max: baseMax * days,
            dailyMin: baseMin,
            dailyMax: baseMax,
        }
    }

    const tripDuration = calculateTripDuration()
    const budgetRange = getDynamicBudgetRange()

    const steps = [
        {number: 1, title: "Home Location", description: "Where are you traveling from?"},
        {number: 2, title: "Dates & Budget", description: "When and how much?"},
        {number: 3, title: "Travelers", description: "Who's traveling?"},
        {number: 4, title: "Interests", description: "What do you enjoy?"},
    ]
    const navigate = useNavigate();

    const handleInterestToggle = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest))
        } else {
            setSelectedInterests([...selectedInterests, interest])
        }
    }

    return (
        <div>
            <Navigation/>
            <div className="page-container">
                <div className="page-content">
                    <div className="page-header">
                        <h1 className="page-title">Plan Your Perfect Trip</h1>
                        <p className="page-subtitle">Let our AI create a personalized travel experience just for you</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="page-section">
                        <div className="grid-4">
                            {steps.map((step) => (
                                <div
                                    key={step.number}
                                    className={`stat-card ${currentStep === step.number ? "selected" : ""}`}
                                    style={{
                                        borderColor: currentStep === step.number ? "#ff6b35" : "transparent",
                                    }}
                                >
                                    <div
                                        className="stat-number"
                                        style={{
                                            backgroundColor: currentStep >= step.number ? "#ff6b35" : "#e5e7eb",
                                            color: currentStep >= step.number ? "white" : "#6b7280",
                                            width: "3rem",
                                            height: "3rem",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto 1rem",
                                            fontSize: "1.25rem",
                                        }}
                                    >
                                        {step.number}
                                    </div>
                                    <div className="stat-label" style={{fontWeight: "600", marginBottom: "0.5rem"}}>
                                        {step.title}
                                    </div>
                                    <div className="stat-label">{step.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Current Step Content */}
                    <div className="page-section">
                        {currentStep === 1 && (
                            <div className="form-container">
                                <div className="section-title">Where are you traveling from?</div>
                                <div className="section-subtitle">
                                    Enter your home location so we can suggest destinations that are perfect for you
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Home Location</label>
                                    <input
                                        type=""

                                        className="input-field"
                                        placeholder="City, country, or region"
                                        value={homeLocation}
                                        onChange={(e) => setHomeLocation(e.target.value)}
                                    />
                                </div>

                                <div className="section-title" style={{marginTop: "2rem"}}>
                                    Travel Style
                                </div>
                                <div className="grid-3">
                                    {[
                                        {
                                            id: "Relaxer",
                                            icon: "🏖️",
                                            title: "Relaxer",
                                            description: "Beaches, spas, resorts"
                                        },
                                        {
                                            id: "Explorer",
                                            icon: "🏛️",
                                            title: "Explorer",
                                            description: "Sightseeing, culture, history"
                                        },
                                        {
                                            id: "Adventurer",
                                            icon: "🏔️",
                                            title: "Adventurer",
                                            description: "Hiking, sports, thrills"
                                        },
                                    ].map((style) => (
                                        <div
                                            key={style.id}
                                            className={`card ${selectedTravelStyle === style.id ? "selected" : ""}`}
                                            onClick={() => setSelectedTravelStyle(style.id)}
                                        >
                                            <div className="card-content" style={{textAlign: "center"}}>
                                                <div style={{fontSize: "2rem", marginBottom: "1rem"}}>{style.icon}</div>
                                                <div className="card-title">{style.title}</div>
                                                <div className="card-description">{style.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="form-container">
                                <div className="section-title">When and how much?</div>
                                <div className="section-subtitle">Let us know your travel dates and budget</div>

                                <div className="form-grid">
                                    <div className="input-group">
                                        <label className="input-label">Start Date</label>
                                        <input
                                            type="date"
                                            className="input-field"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">End Date</label>
                                        <input
                                            type="date"
                                            className="input-field"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={startDate || new Date().toISOString().split("T")[0]} // End date must be after start date
                                        />
                                    </div>
                                </div>

                                {/* Add validation message */}
                                {endDate && startDate && new Date(endDate) <= new Date(startDate) && (
                                    <div
                                        style={{
                                            color: "#ef4444",
                                            fontSize: "0.875rem",
                                            marginTop: "0.5rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        End date must be after start date
                                    </div>
                                )}

                                <div className="input-group">
                                    <label className="input-label">
                                        Budget (per person) - {tripDuration} {tripDuration === 1 ? "day" : "days"}
                                    </label>
                                    <input
                                        type="range"
                                        min={budgetRange.min}
                                        max={budgetRange.max}
                                        value={budgetValue}
                                        onChange={(e) => setBudgetValue(Number.parseInt(e.target.value))}
                                        className="input-field"
                                        style={{height: "2rem"}}
                                    />
                                    <div
                                        style={{display: "flex", justifyContent: "space-between", marginTop: "0.5rem"}}>
                                        <span>Budget (${budgetRange.dailyMin}/day)</span>
                                        <div className="budget-display">
                                            <div>${budgetValue} total</div>
                                            <div style={{fontSize: "0.75rem", color: "#6b7280"}}>
                                                ${Math.round(budgetValue / tripDuration)}/day
                                            </div>
                                        </div>
                                        <span>Luxury (${budgetRange.dailyMax}/day)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="form-container">
                                <div className="section-title">Who's traveling?</div>
                                <div className="section-subtitle">Tell us about your travel group</div>

                                <div className="section-title" style={{fontSize: "1rem", marginBottom: "1rem"}}>
                                    Travel Group
                                </div>
                                <div className="grid-4">
                                    {[
                                        {id: "Solo", icon: "👤", title: "Solo"},
                                        {id: "Couple", icon: "👫", title: "Couple"},
                                        {id: "Family", icon: "👨‍👩‍👧‍👦", title: "Family"},
                                        {id: "Friends", icon: "👥", title: "Friends"},
                                    ].map((group) => (
                                        <div
                                            key={group.id}
                                            className={`card ${selectedTravelGroup === group.id ? "selected" : ""}`}
                                            onClick={() => setSelectedTravelGroup(group.id)}
                                        >
                                            <div className="card-content" style={{textAlign: "center"}}>
                                                <div style={{fontSize: "2rem", marginBottom: "1rem"}}>{group.icon}</div>
                                                <div className="card-title">{group.title}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="form-grid" style={{marginTop: "2rem"}}>
                                    <div className="input-group">
                                        <label className="input-label">Adults</label>
                                        <select className="input-field select-field">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4+</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Children</label>
                                        <select className="input-field select-field">
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3+</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="form-container">
                                <div className="section-title">What are your interests?</div>
                                <div className="section-subtitle">Help us personalize your trip recommendations</div>

                                <div className="grid-3">
                                    {[
                                        {
                                            id: "Food",
                                            icon: "🍽️",
                                            title: "Food & Dining",
                                            description: "Local cuisine and restaurants"
                                        },
                                        {
                                            id: "History",
                                            icon: "🏛️",
                                            title: "History & Culture",
                                            description: "Museums and historical sites",
                                        },
                                        {
                                            id: "Arts",
                                            icon: "🎨",
                                            title: "Arts & Entertainment",
                                            description: "Galleries, shows, and events",
                                        },
                                        {
                                            id: "Nature",
                                            icon: "🏞️",
                                            title: "Nature & Outdoors",
                                            description: "Parks, hiking, and wildlife"
                                        },
                                        {
                                            id: "Shopping",
                                            icon: "🛍️",
                                            title: "Shopping",
                                            description: "Markets, malls, and boutiques"
                                        },
                                        {
                                            id: "Nightlife",
                                            icon: "🌙",
                                            title: "Nightlife",
                                            description: "Bars, clubs, and evening entertainment",
                                        },
                                    ].map((interest) => (
                                        <div
                                            key={interest.id}
                                            className={`card ${selectedInterests.includes(interest.id) ? "selected" : ""}`}
                                            onClick={() => handleInterestToggle(interest.id)}
                                        >
                                            <div className="card-content" style={{textAlign: "center"}}>
                                                <div style={{
                                                    fontSize: "2rem",
                                                    marginBottom: "1rem"
                                                }}>{interest.icon}</div>
                                                <div className="card-title">{interest.title}</div>
                                                <div className="card-description">{interest.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div style={{display: "flex", justifyContent: "space-between", marginTop: "2rem"}}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                disabled={currentStep === 1}
                            >
                                Back
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    if (currentStep === 4) {
                                        // Save user preferences to localStorage
                                        const userPreferences = {
                                            homeLocation,
                                            travelStyle: selectedTravelStyle,
                                            startDate,
                                            endDate,
                                            budgetValue,
                                            travelGroup: selectedTravelGroup,
                                            adults: 2, // You can make this dynamic
                                            children: 0,
                                            interests: selectedInterests,
                                        }
                                        navigate("/destination-recommendations", {state: {preferences: userPreferences}})

                                    } else {
                                        setCurrentStep(Math.min(4, currentStep + 1))
                                    }
                                }}
                            >
                                {currentStep === 4 ? "See Destination Recommendations" : "Next"}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
