import NavBar from "../NavBar.jsx";
import '../../styles/destination-recommender.css';

import InputCard from "./InputCard.jsx";
import {properties} from "../../constants/constants.js";
import PlaceCard from "./PlaceCard.jsx";
import {useEffect, useState} from "react";

import {Loader} from "lucide-react";

export default function DestinationRecommendations() {

    const preferencesItem = localStorage.getItem("tripData");
    const preferences = preferencesItem ? JSON.parse(preferencesItem) : null;
    const [selectedKey, setSelectedKey] = useState(0);
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(preferences);
    const style = preferences.travelPace;
    console.log(`Numer of days: ${preferences.numberOfDays}`);
    const wordsToCammelCase = (str) => {
        return str
            .toLowerCase()
            .replace(/(?:^\w|[\s-_]\w)/g, (match, index) =>
                index === 0 ? match.toLowerCase() : match.trim().toUpperCase()
            );
        }
        const displayValueProps = (prop) => {

            if (prop === "Travel Dates") {
                return `From ${preferences["startDate"]} to ${preferences["endDate"]}`;
            }
            let value = preferences[wordsToCammelCase(prop)];

            if (Array.isArray(value)) {
                return value.join(", ");
            }

            return value;
        }
        useEffect(() => {
            // const destinations =
            async function getDestinations() {
                setLoading(true);
                setError(null);
                setDestinations(null);

                try {
                    // Guard Check: Skip API call if preferences are empty or uninitialized.
                    if (!preferences || Object.keys(preferences).length === 0) {
                        console.log("Preferences are empty or uninitialized. Skipping API call.");
                        setLoading(false);
                        return;
                    }
                    console.log("Before call: ", destinations);
                    // API Call
                    const response = await fetch('http://localhost:3001/api/destinations', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(preferences),
                    });

                    const data = await response.json();
                    console.log("Fetched data: ", data);
                    if (!response.ok) {
                        setError(data.error);
                        throw new Error(data.error || 'Server returned an error');
                    }

                    localStorage.setItem("topDestinations", JSON.stringify(data));
                    setDestinations(data);
                } catch (err) {
                    console.error("Frontend Fetch Error:", err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }

            console.log(preferences);
            getDestinations();
        }, [preferences])

        return (
            <div>
                <NavBar/>
                <div className="dest-landing">
                    <h1 className="dest-title">Top Destinations For You</h1>
                    <p>AI-curated destinations based on your preferences • {preferences.numberOfDays} days
                        • {style} style</p>
                    <div className="dest-container">
                        <h1 className="dest-title">Your Travel Preferences</h1>
                        <div className="dest-preferences-container">
                            {
                                properties.map((prop) => (
                                    <InputCard image={prop.image} name={prop.name}
                                               value={displayValueProps(prop.name)}/>
                                ))
                            }
                        </div>

                    </div>
                    <div className="dest-container">
                        <h1 className="dest-title">Reccommended Destinations (Top 5)</h1>
                        <p>Each destination is carefully selected to match your {style} style and interests</p>

                        <div className="dest-list-container">
                        {/*    if (loading) {*/}
                        {/*    <Loader className="p-8 text-center text-xl text-gray-600">Loading your personalized*/}
                        {/*        destinations...</Loader>*/}
                        {/*}*/}

                        {/*    /!*if (!destinations || destinations.length === 0) {*!/*/}
                        {/*//     <Dialog*/}
                        {/*//         aria-describedby="No destinations found. Please try adjusting your trip preferences."*/}
                        {/*//         aria-labelledby="id">No destinations found. Please try adjusting your trip*/}
                        {/*//         preferences.</Dialog>*/}
                        {/*// }*/}
                        {/*    /!*{error && <ErrorBoundary style={{color: 'red'}}>Error: {error}</ErrorBoundary>}*!/*/}
                            {destinations.map((place, id) => (
                                <PlaceCard place={place} key={id} id={id} selectedPlace={selectedKey}
                                           setSelectedPlace={setSelectedKey} preferences={preferences}/>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        );
    }