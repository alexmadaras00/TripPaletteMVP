import NavBar from "../NavBar.jsx";
import '../../styles/destination-recommender.css';
import {useQuery} from "@tanstack/react-query"
import InputCard from "./InputCard.jsx";
import {properties} from "../../constants/constants.js";
import PlaceCard from "./PlaceCard.jsx";
import {useEffect, useMemo, useState} from "react";

import {Loader} from "lucide-react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary.js";

export default function DestinationRecommendations() {

    const preferencesItem = localStorage.getItem("tripData");
    const preferences = useMemo(() => {
        return preferencesItem ? JSON.parse(preferencesItem) : null;
    }, [preferencesItem]);
    const [selectedKey, setSelectedKey] = useState(0);

    const style = preferences.travelPace;

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
    const{
        data: destinations,
        isLoading,
        isError,
        error
    }=useQuery({
        queryKey: ['destinations', preferences],

        // --- CRITICAL FIX in queryFn ---
        queryFn: async () => {
            // Your destination endpoint requires a POST with preferences in the body.
            const response = await fetch("http://localhost:3001/api/destinations", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(preferences), // Send the preferences
            });

            const data = await response.json();

            if (!response.ok) {
                // Throwing an error here sets isError to true
                throw new Error(data.error || 'Failed to fetch destinations.');
            }
            return data;
        },
        // Only run the query if preferences are available
        enabled: !!preferences && Object.keys(preferences).length > 0,
        staleTime: 5 * 60 * 1000,
    });

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
                    <h1 className="dest-title">Recommended Destinations (Top 5)</h1>
                    <p>Each destination is carefully selected to match your {style} style and interests</p>

                    <div className="dest-list-container">
                        {/* Use isLoading directly */}
                        {isLoading && (
                            <Loader className="p-8 text-center text-xl text-gray-600">
                                Loading your personalized destinations...
                            </Loader>
                        )}

                        {/* Use isError and the error object directly */}
                        {isError && (
                            <div style={{ color: 'red', padding: '10px' }}>
                                Error: {error ? error.message : 'An unknown error occurred.'}
                            </div>
                        )}

                        {/* Only render the list when NOT loading, NOT error, and data (destinations) exists */}
                        {!isLoading && !isError && destinations && destinations.length > 0 && (
                            destinations.map((place, id) => (
                                <PlaceCard
                                    place={place}
                                    key={id}
                                    id={id}
                                    selectedPlace={selectedKey}
                                    setSelectedPlace={setSelectedKey}
                                    preferences={preferences}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}