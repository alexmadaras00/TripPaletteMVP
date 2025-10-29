import {useEffect, useState} from "react"
import NavBar from "../NavBar.jsx";
import "../../styles/navbar.css"
import "../../styles/plan-trip.css"
import {Link, useNavigate} from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import {steps} from "../../constants/constants.js";
import StepCard from "./steps/StepCard.jsx";
import Step1 from "./steps/Step1.jsx";
import Step2 from "./steps/Step2.jsx";
import Step3 from "./steps/Step3.jsx";
import Step4 from "./steps/Step4.jsx";



export default function PlanTrip() {

    const getInitialState = (key, defaultValue, type = 'string') => {
        const savedValue = localStorage.getItem(key);
        if (!savedValue) {
            return defaultValue;
        }

        switch (type) {
            case 'number':
                return parseInt(savedValue, 10);
            case 'array':
                try {
                    return JSON.parse(savedValue);
                } catch (e) {
                    console.error(`Error parsing JSON file at key number: ${key}`, e);
                    return defaultValue;
                }
            default:
                return savedValue;
        }
    };

    const [currentStep, setCurrentStep] = useState(() => getInitialState('currentStep', 1, 'number'));
    const [travelPace, setTravelPace] = useState(() => getInitialState('travelPace', 0, 'number'));
    const [budget, setBudget] = useState(() => getInitialState('budget', 3100, 'number'));
    const [selectedTravelGroup, setSelectedTravelGroup] = useState(() => getInitialState('selectedTravelGroup', "Couple"));
    const [selectedInterests, setSelectedInterests] = useState(() => getInitialState('selectedInterests', [], 'array'));
    const [startDate, setStartDate] = useState(() => getInitialState('startDate', ""));
    const [endDate, setEndDate] = useState(() => getInitialState('endDate', ""));
    const [homeLocation, setHomeLocation] = useState(() => getInitialState('homeLocation', ""));

    // eslint-disable-next-line no-undef

    const getLabel = (travelPace) => {
        switch (true) {
            case travelPace < 20:
                return `Relaxing 🧘`;
            case travelPace < 40 :
                return `Easygoing 🌤`;
            case travelPace < 60 :
                return `Balanced 🚶‍♂️`;
            case travelPace < 75 :
                return `Dynamic 🧭`;
            case travelPace < 90:
                return `Adventurous 🚴‍♂️`;
            default:
                return `Travel hustler 🎢`;
        }
    }


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

    const saveCurrentStep=()=> {
        if (currentStep === 4) {
            // Save user preferences to localStorage
            const tripPreferences = {
                homeLocation: homeLocation,
                travelPace: getLabel(travelPace),
                startDate: formatDateDisplay(startDate),
                endDate: formatDateDisplay(endDate),
                numberOfDays: calculateTripDuration(),
                budget: budget,
                travelGroup: selectedTravelGroup,
                adults: 2, // You can make this dynamic
                children: 0,
                interests: selectedInterests,
            }
            localStorage.removeItem("currentStep");
            localStorage.setItem("tripData",JSON.stringify(tripPreferences));
            navigate("/destination-recommendations");
        } else {
            setCurrentStep(Math.min(4, currentStep + 1));
        }
    }

    const formatDateDisplay = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    const tripDuration = calculateTripDuration();
    const budgetRange = getDynamicBudgetRange();
    const navigate = useNavigate();

    useEffect(() => {
        // Salvează currentStep (1-4)
        localStorage.setItem('currentStep', currentStep.toString());

        // Salvează toate celelalte stări
        localStorage.setItem('travelPace', travelPace.toString());
        localStorage.setItem('budget', budget.toString());
        localStorage.setItem('selectedTravelGroup', selectedTravelGroup);
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('endDate', endDate);
        localStorage.setItem('homeLocation', homeLocation);

        // Salvează array-urile ca string JSON
        localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));

    }, [currentStep, travelPace, budget, selectedTravelGroup, selectedInterests, startDate, endDate, homeLocation]);


    return (
        <div>

            <NavBar/>
            <div className="page-container">
                <div className="page-content">
                    <div className="page-header">
                        <h1 className="page-title">Plan Your Perfect Trip</h1>
                        <p className="page-subtitle">Let our AI create a personalized travel experience just for you</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="page-section">
                        <div className="list">
                            {steps.map((step) => (
                                <StepCard currentStep={currentStep} key={step.id} step={step}/>
                            ))}
                        </div>
                    </div>

                    {/* Current Step Content */}
                    <div className="page-section">
                        {currentStep === 1 && (
                            <Step1 homeLocation={homeLocation} setHomeLocation={setHomeLocation}
                                  travelPace={travelPace} setTravelPace={setTravelPace} getLabel = {getLabel}/>
                        )}

                        {currentStep === 2 && (
                            <Step2
                                selectedTravelGroup={selectedTravelGroup}
                                setSelectedTravelGroup={setSelectedTravelGroup}/>
                        )}

                        {currentStep === 3 && (
                            <Step3 budgetValue={budget} setBudgetValue={setBudget} budgetRange={budgetRange}
                                   startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                   setEndDate={setEndDate} tripDuration={tripDuration}/>
                        )}

                        {currentStep === 4 && (
                            <Step4 selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests}/>
                        )}

                        {/* NavBar Buttons */}
                        <div className="bottom-plan-trip-container">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                disabled={currentStep === 1}
                            >
                                Back
                            </button>
                            <button
                                className="btn btn-primary-plan"
                                onClick={
                                   saveCurrentStep
                            }
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
