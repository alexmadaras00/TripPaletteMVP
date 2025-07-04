

import {useState} from "react"
import Navigation from "../components/Navigation.jsx";
import "../styles/navbar.css"
import "../styles/plan-trip.css"
import {Link, useNavigate} from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import {steps} from "../constants.js";
import StepCard from "./steps/StepCard.jsx";
import Step1 from "./steps/Step1.jsx";
import Step2 from "./steps/Step2.jsx";
import Step3 from "./steps/Step3.jsx";
import Step4 from "./steps/Step4.jsx";

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
                            <Step3 selectedTravelGroup={selectedTravelGroup} setSelectedTravelGroup={setSelectedTravelGroup} />
                        )}

                        {currentStep === 4 && (
                            <Step4 selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests} />
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
                                            homeLocation: homeLocation,
                                            travelStyle: selectedTravelStyle,
                                            startDate: startDate,
                                            endDate: endDate,
                                            budgetValue: budgetValue,
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
