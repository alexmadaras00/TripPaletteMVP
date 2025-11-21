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
import {useQuery} from "@tanstack/react-query";


export default function ScheduleActivities() {
    const preferencesItem = localStorage.getItem("tripData");
    const preferences = useMemo(()=>{
        return preferencesItem ? JSON.parse(preferencesItem) : null;
    },[preferencesItem]);

    console.log("Route: ",preferences.route);
    const navigate = useNavigate();

    const {homeLocation, travelPace, startDate, endDate,numberOfDays, budget,travelGroup,  adults, children, interests,destination, route } = preferences || {};
    const handleSaveSchedule = () => {
        const updatedPreferences = {...preferences,schedule: schedule};
        console.log("TabSchedule: ",updatedPreferences.schedule);
        localStorage.setItem("tripData", JSON.stringify(updatedPreferences))
        console.log("Saving to localStorage: ", updatedPreferences.schedule);

        navigate("/trip-summary");
    }

    const inputValue = {preferences: {homeLocation, travelPace, startDate, endDate,numberOfDays, budget,travelGroup,adults, children, interests , destination}, destination:destination, route: route};
    const {
        data: schedule,
        isLoading,
        isError,
        error
    } = useQuery({
        // Key is safe because we check preferences existence and use primitives
        queryKey: ['schedule', homeLocation, travelPace, startDate, endDate,numberOfDays, budget,travelGroup,adults, children, interests , destination, route], // Use city for query key stability

        queryFn: async () => {
            const response = await fetch("http://localhost:3001/api/schedule", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(inputValue),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch routes.');
            }
            return data;
        },
        // Enabled is now optional since we return early, but it's good practice
        enabled: !!preferences && Object.keys(preferences).length > 0,
        staleTime: Infinity,    // Cache the data forever (for this session) so we don't re-fetch on page switching
        gcTime: 1000 * 60 * 10, // Keep unused data in garbage collection for 10 mins
        retry: 1,               // Retry only once if it fails (helps avoid hitting rate limits repeatedly)
        refetchOnWindowFocus: false, // Don't refetch just because the user clicked a different tab
    });


    const destinationName = preferences.destination.city + ", " + preferences.destination.country;
    const dailyBudget = "€"+parseInt(budget/numberOfDays);
    const numberOfActivities = useMemo(()=>{
        return schedule ? schedule.reduce((sum,day)=>sum+day.activities.length,0) : 0;
    },[schedule]);

    const stats = [{name: "Days", val: numberOfDays}, {name: "Activities", val: numberOfActivities}, {name: "Daily Budget", val: dailyBudget}];
    return (<div>
        <NavBar />
        <div className="dest-landing">
            <h1 className="dest-title">Your Schedule for the {numberOfDays} Day Trip to {destinationName}</h1>
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
                    {isLoading && !isError &&
                        <Loader className="p-8 text-center text-xl text-gray-600">Loading your personalized
                            schedule...</Loader>
                    }
                    {isError && !schedule && <ErrorBoundary style={{color: 'red'}}>Error: {error}</ErrorBoundary>}
                    {!isLoading && !isError && schedule && schedule.map((day, id) => (
                        <DayCard day={day} key={id} id={id} />
                    ))}
                </div>
            </div>
        </div>

    </div>);
}