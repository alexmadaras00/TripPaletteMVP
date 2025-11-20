import NavBar from "../NavBar.jsx";
import InputCard from "../destination-recommendations/InputCard.jsx";
import PlaceCard from "../destination-recommendations/PlaceCard.jsx";
import StatCard from "../plan-trip/StatCard.jsx";
import "../../styles/schedule.css";
import DayCard from "./DayCard.jsx";
import { useNavigate } from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {schedule} from "../../constants/constants.js";
import {Loader} from "lucide-react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary.js";


export default function ScheduleActivities() {
    const preferencesItem = localStorage.getItem("tripData");
    const preferences = useMemo(()=>{
        return preferencesItem ? JSON.parse(preferencesItem) : null;
    },[preferencesItem]);

    const [selectedSchedule, setSelectedSchedule] = useState([]);
    console.log("Route: ",preferences.route);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const selectedRoute = preferences.route;

    const handleSaveSchedule = () => {
        const updatedPreferences = {...preferences,schedule: schedule};
        console.log("TabSchedule: ",updatedPreferences.schedule);
        localStorage.setItem("tripData", JSON.stringify(updatedPreferences))
        console.log("Saving to localStorage: ", updatedPreferences.schedule);

        navigate("/trip-summary");
    }
    useEffect(() => {
        async function getSchedule() {
            setLoading(true);
            setError(null);
            setSelectedSchedule(null);
            try {
                // Guard Check: Skip API call if preferences are empty or uninitialized.
                if (!preferences || Object.keys(preferences).length === 0) {
                    console.log("Preferences are empty or uninitialized. Skipping API call.");
                    setLoading(false);
                    return;
                }
                console.log("Before call: ", selectedSchedule);
                const payload = {
                    preferences: preferences,
                    destination: preferences.destination,
                    selectedRoute: selectedRoute,
                };
                // API Call
                const response = await fetch('http://localhost:3001/api/schedule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();
                console.log("Fetched data: ", data);
                if (!response.ok) {
                    setError(data.error);
                    throw new Error(data.error || 'Server returned an error');
                }
                console.log("Output response: ", data);
                localStorage.setItem("topDestinations", JSON.stringify(data));
                setSelectedSchedule(data);

            } catch (err) {
                console.error("Frontend Fetch Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
                console.log("LOADING STATE: ", loading);
                console.log("ERROR STATE: ", error);
            }
        }

        console.log(preferences);
        getSchedule();

    }, [preferences, selectedRoute]);

    const destination = preferences.destination.city + ", " + preferences.destination.country;
    const numberOfDays = preferences.numberOfDays;
    const dailyBudget = "€"+parseInt(preferences.budget/numberOfDays);
    const numberOfActivities = useMemo(()=>{
        return selectedSchedule ? selectedSchedule.reduce((sum,day)=>sum+day.activities.length,0) : 0;
    },[selectedSchedule]);

    const stats = [{name: "Days", val: numberOfDays}, {name: "Activities", val: numberOfActivities}, {name: "Daily Budget", val: dailyBudget}];
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
                    {loading && !error &&
                        <Loader className="p-8 text-center text-xl text-gray-600">Loading your personalized
                            schedule...</Loader>
                    }
                    {error && !selectedSchedule && <ErrorBoundary style={{color: 'red'}}>Error: {error}</ErrorBoundary>}
                    {!loading && !error && selectedSchedule && selectedSchedule.map((day, id) => (
                        <DayCard day={day} key={id} id={id} />
                    ))}
                </div>
            </div>


        </div>

    </div>);
}