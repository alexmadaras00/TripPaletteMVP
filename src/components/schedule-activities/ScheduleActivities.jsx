import NavBar from "../NavBar.jsx";
import InputCard from "../destination-recommendations/InputCard.jsx";
import PlaceCard from "../destination-recommendations/PlaceCard.jsx";
import StatCard from "../plan-trip/StatCard.jsx";
import "../../styles/schedule.css";
import DayCard from "./DayCard.jsx";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {schedule} from "../constants/constants.js";


export default function ScheduleActivities() {
    const preferencesItem = localStorage.getItem("tripData");
    const preferences = preferencesItem ? JSON.parse(preferencesItem) : null;


    const [selectedSchedule, setSelectedSchedule] = useState(0);

    const destination = preferences.destination.city + ", " + preferences.destination.country;
    const numberOfDays = preferences.numberOfDays;
    const numberOfActivities = schedule.reduce((sum,day)=>sum+day.activities.length,0);
    const dailyBudget = "€"+parseInt(preferences.budget/numberOfDays);
    const stats = [{name: "Days", val: numberOfDays}, {name: "Activities", val: numberOfActivities}, {name: "Daily Budget", val: dailyBudget}];
    console.log("Route: ",preferences.route);
    const navigate = useNavigate();

    const handleSaveSchedule = () => {
        const updatedPreferences = {...preferences,schedule: schedule};
        console.log("TabSchedule: ",updatedPreferences.schedule);
        localStorage.setItem("tripData", JSON.stringify(updatedPreferences))
        console.log("Saving to localStorage: ", updatedPreferences.schedule);
        navigate("/trip-summary");
    }

    return (<div>
        <NavBar />
        <div className="dest-landing">
            <h1 className="dest-title">Your Schedule for the {preferences.numberOfDays} Day Trip to {destination}</h1>
            <p> Detailed daily itinerary from arrival to departure</p>
            <div className="dest-container">
                <h1 className="dest-title">Trip Overview</h1>
                <div className="schedule-upper-container">
                    {
                        stats.map((stat, id) => (
                           <StatCard stat={stat} key={id} />
                        ))
                    }
                </div>
            </div>
            <div className="bottom-section-schedule">
                <div className="bottom-button-group">
                    <button className="btn btn-secondary" onClick={() => navigate("/trip-routes")}>
                        ← Modify Route
                    </button>
                    <button className="btn btn-primary-schedule" onClick={handleSaveSchedule}>
                        Finalize Trip & View Summary
                    </button>
                    <button className="btn btn-secondary">Print Schedule</button>
                </div>
            </div>
            <div className="dest-container">
                <h1 className="dest-title">Complete Daily Schedule</h1>
                <div className="schedule-list-container">
                    {schedule.map((day, id) => (
                        <DayCard day={day} key={id} id={id} selectedSchedule={selectedSchedule} setSelectedSchedule={setSelectedSchedule} />
                    ))}
                </div>
            </div>


        </div>

    </div>);
}