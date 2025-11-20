import {useEffect, useMemo, useState} from "react";
import NavBar from "../NavBar.jsx";
import "../../styles/trip-routes.css";
import "../../styles/plan-trip.css";
import {useNavigate} from "react-router-dom";

import RouteCard from "./RouteCard.jsx";
import {Loader} from "lucide-react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary.js";
import Loadable from "next/dist/shared/lib/lazy-dynamic/loadable.js";

export default function TripRoutes() {
    const preferencesItem = localStorage.getItem("tripData");
    const preferences = useMemo(()=>{
        return preferencesItem ? JSON.parse(preferencesItem) : null;
    },[preferencesItem]);
    console.log(preferences);

    console.log(`Numer of travellers: ${preferences.adults+preferences.children}`);
    console.log(`Selected destination: ${preferences.destination.city}`);
    const navigate = useNavigate();
    const homeLocation = preferences.homeLocation;
    const destination = preferences.destination.city + ", " + preferences.destination.country;
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const selectedDestination = preferences.destination;

    function navigateBack() {
        navigate("/destination-recommendations");
    }
    useEffect(() => {
        async function getRoutes() {
            setLoading(true);
            setError(null);
            setRoutes(null); // Assuming you have a 'routes' state initialized to hold the route data
            // --- 1. Guard Check ---
            // You need both trip preferences AND a selected destination to find routes.
            if (!preferences || Object.keys(preferences).length === 0 ||
                !selectedDestination) { // Assuming 'selectedDestination' is available

                console.log("Missing preferences or selected destination. Skipping API call.");
                setLoading(false);
                return;
            }

            try {
                // --- 2. Construct Payload ---
                // Combine both objects into the structure the server expects (RouteInputSchema).
                const payload = {
                    preferences: preferences,
                    destination: selectedDestination,
                };

                console.log("Sending payload for routes: ", payload);

                // --- 3. API Call to the new Endpoint ---
                const response = await fetch('http://localhost:3001/api/routes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                // The server now returns a PURE JSON array (since we updated the prompt logic)
                const data = await response.json();

                if (!response.ok) {
                    // If the server returns a 4xx or 5xx status, handle the error object.
                    setError(data.error || 'Server returned an error when fetching routes.');
                    throw new Error(data.error || 'Server error.');
                }

                console.log("Output routes: ", data);

                // --- 4. State Update and Caching ---
                // Assuming the server response (data) is the validated array of route objects.
                localStorage.setItem("travelRoutes", JSON.stringify(data));
                setRoutes(data); // Assuming you have a state setter: setRoutes

            } catch (err) {
                console.error("Frontend Fetch Error:", err);
                // Ensure error is set to the message
                setError(err.message || "Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        }
        getRoutes();

    }, [preferences, selectedDestination]);
    return (<div>
        <NavBar/>
        <div className="dest-landing">
            <h1 className="dest-title">Transportation Routes</h1>
            <p>From {preferences.homeLocation} to {destination} • {preferences.numberOfDays} days
                • {preferences.startDate} - {preferences.endDate}</p>
            <div className="routes-container">
                <h1 className="dest-title">Your Journey</h1>
                <div className="routes-inner-container">
                    <div className="upper-card">
                        <div className="source-dest">
                            <div className="departure-dest">
                                <span className="text-match">🏠 Departure</span>
                                <p className="text-prop">{preferences.homeLocation}</p>
                            </div>
                            <span className="arrow">→</span>
                            <div className="departure-dest">
                                <span className="text-match">🎯 Destination</span>
                                <p className="text-prop">{destination}</p>
                            </div>
                        </div>
                        <button className="btn btn-secondary" onClick={navigateBack}>Change Destination</button>
                    </div>
                    <div className="lower-card">
                        <span className="text-prop">👥 {preferences.adults + preferences.children} travelers</span>
                        <span className="text-prop">💰 Budget: €{preferences.budget}</span>
                        <span className="text-prop">🎯{preferences.travelPace} style</span>
                    </div>
                </div>
            </div>
            <div className="routes-container">
                <h1 className="dest-title">Available Transportation Options</h1>
                <p>Choose the best way to travel from {homeLocation} to {destination}</p>
                <div className="routes-list-container">
                    {loading && !error &&
                        <Loader className="p-8 text-center text-xl text-gray-600">Loading your personalized
                           routes...</Loader>
                    }
                    {error && !routes && <ErrorBoundary style={{color: 'red'}}>Error: {error}</ErrorBoundary>}
                    {!loading && !error && routes.map((route, id) => (
                        <RouteCard route={route} key={id} id={id} selectedRoute={selectedRoute}
                                   setSelectedRoute={setSelectedRoute} homeLocation={homeLocation}
                                   destination={destination} preferences={preferences}/>
                    ))}
                </div>
            </div>
        </div>
    </div>);
}