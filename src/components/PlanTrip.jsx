

import {useState} from "react"
import Navigation from "../components/Navigation.jsx";
import "../styles/navbar.css"
import "../styles/plan-trip.css"
import {Link, useNavigate} from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import {steps} from "../constants.js";
import StepCard from "./StepCard.jsx";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";

export default function PlanTrip() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTravelStyle, setSelectedTravelStyle] = useState("Explorer");
    const [budgetValue, setBudgetValue] = useState(3100);
    const [selectedTravelGroup, setSelectedTravelGroup] = useState("Couple");
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // Change destination to homeLocation
    const [homeLocation, setHomeLocation] = useState("");

    // eslint-disable-next-line no-undef



    // Add this function at the top of the component, after the state declarations
    const calculateTripDuration = () => {
        if (startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)
            const diffTime = Math.abs(end - start)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays
        }
        return 0 // default to 0 days
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

    const tripDuration = calculateTripDuration();
    const budgetRange = getDynamicBudgetRange();


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
                              <StepCard currentStep={currentStep} key={step.id} step={step} />
                            ))}
                        </div>
                    </div>

                    {/* Current Step Content */}
                    <div className="page-section">
                        {currentStep === 1 && (
                          <Step1 homeLocation={homeLocation} setHomeLocation={setHomeLocation} selectedTravelStyle={selectedTravelStyle} setSelectedTravelStyle={setSelectedTravelStyle} />
                        )}

                        {currentStep === 2 && (
                            <Step2 budgetValue={budgetValue} setBudgetValue={setBudgetValue} budgetRange={budgetRange} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} tripDuration={tripDuration} />
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
