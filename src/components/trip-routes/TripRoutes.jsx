import {useMemo, useState} from "react";
import NavBar from "../NavBar.jsx";
import "../../styles/trip-routes.css";
import "../../styles/plan-trip.css";
import {useNavigate} from "react-router-dom";

import RouteCard from "./RouteCard.jsx";
import {Loader} from "lucide-react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary.js";
import {useQuery} from "@tanstack/react-query";

export default function TripRoutes() {
    const preferencesItem = localStorage.getItem("tripData");
    const preferences = useMemo(() => {
        return preferencesItem ? JSON.parse(preferencesItem) : null;
    }, [preferencesItem]);
    const {homeLocation, travelPace, startDate, endDate,numberOfDays, budget,travelGroup,  adults, children, interests,destination } = preferences || {};
    console.log(`Numer of travellers: ${preferences.adults + preferences.children}`);
    console.log(`Selected destination: ${preferences.destination.city}`);
    const navigate = useNavigate();

    const [selectedRoute, setSelectedRoute] = useState(0);

    function navigateBack() {
        navigate("/destination-recommendations");
    }
    const inputValue = {preferences: {homeLocation, travelPace, startDate, endDate,numberOfDays, budget,travelGroup,adults, children, interests , destination}, destination:destination};
    const {
        data: routes,
        isLoading,
        isError,
        error
    } = useQuery({
        // Key is safe because we check preferences existence and use primitives
        queryKey: ['routes', homeLocation, travelPace, startDate, endDate,numberOfDays, budget,travelGroup,adults, children, interests , destination], // Use city for query key stability

        queryFn: async () => {
            const response = await fetch("http://localhost:3001/api/routes", {
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

    // --- Render Block (Now safe) ---
    return (<div>
        <NavBar/>
        <div className="dest-landing">
            <h1 className="dest-title">Transportation Routes</h1>
            {/* FIX: Using destination.city */}
            <p>From {homeLocation} to {destination.city} • {numberOfDays} days
                • {preferences.startDate} - {preferences.endDate}</p>
            <div className="routes-container">
                <h1 className="dest-title">Your Journey</h1>
                <div className="routes-inner-container">
                    <div className="upper-card">
                        <div className="source-dest">
                            <div className="departure-dest">
                                <span className="text-match">🏠 Departure</span>
                                <p className="text-prop">{homeLocation}</p>
                            </div>
                            <span className="arrow">→</span>
                            <div className="departure-dest">
                                <span className="text-match">🎯 Destination</span>
                                {/* FIX: Using destination.city */}
                                <p className="text-prop">{destination.city}</p>
                            </div>
                        </div>
                        <button className="btn btn-secondary" onClick={navigateBack}>Change Destination</button>
                    </div>
                    <div className="lower-card">
                        <span className="text-prop">👥 {adults + children} travelers</span>
                        <span className="text-prop">💰 Budget: €{budget}</span>
                        <span className="text-prop">🎯{travelPace} style</span>
                    </div>
                </div>
            </div>
            <div className="routes-container">
                <h1 className="dest-title">Available Transportation Options</h1>
                {/* FIX: Using destination.city */}
                <p>Choose the best way to travel from {homeLocation} to {destination.city}</p>
                <div className="routes-list-container">
                    {isLoading && !isError &&
                        <Loader className="p-8 text-center text-xl text-gray-600 animate-spin">Loading your personalized
                            routes...</Loader>
                    }
                    {isError && !routes && <ErrorBoundary style={{color: 'red'}}>Error: {error.message}</ErrorBoundary>}
                    {!isError && !isLoading && routes && routes.map((route, id) => (
                        <RouteCard
                            route={route}
                            key={id}
                            id={id}
                            selectedRoute={selectedRoute}
                            setSelectedRoute={setSelectedRoute}
                            homeLocation={homeLocation}
                            destination={destination.city}
                            preferences={preferences}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>);
}