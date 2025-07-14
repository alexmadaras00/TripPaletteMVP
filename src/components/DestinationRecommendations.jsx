import NavBar from "./NavBar.jsx";
import '../styles/destination-recommender.css';

import InputCard from "./InputCard.jsx";
import {properties} from "./constants/constants.js";
import PlaceCard from "./PlaceCard.jsx";
import {useState} from "react";


export default function DestinationRecommendations() {

    const preferencesItem = sessionStorage.getItem("tripPreferences");
    const preferences = preferencesItem ? JSON.parse(preferencesItem) : null;
    const [selectedKey,setSelectedKey] = useState(0);
    console.log(preferences);
    const style = preferences.travelPace;
    console.log(`Numer of days: ${preferences.numberOfDays}`);
    const wordsToCammelCase = (str) => {
        return str
            .toLowerCase()
            .replace(/(?:^\w|[\s-_]\w)/g, (match, index) =>
                index === 0 ? match.toLowerCase() : match.trim().toUpperCase()
            );

    };

    const destinations = [{
        id: 1,
        country: "France",
        city: "Paris",
        title: "Paris, France",
        subtitle: "The City of Light - Perfect for culture and cuisine lovers",
        price: Math.round(preferences.budget * 0.95),
        originalPrice: preferences.budget,
        savings: Math.round(preferences.budget * 0.05),
        rating: 4.8,
        reviews: 2847,
        matchScore: 95,
        flightTime: "7-9 hours from most locations",
        highlights: [
            "Louvre & Musée d'Orsay priority access",
            "Seine river dinner cruise",
            "Montmartre artist quarter exploration",
            "French cooking class with chef",
            "Historic Latin Quarter walking tour",
        ],
        whyMatch: "Perfect for History & Culture + Food & Dining interests",
        bestFor: ["History", "Food", "Arts"],
        climate: "Mild summer, perfect for walking tours",
        currency: "Euro (EUR)",
        language: "French (English widely spoken in tourist areas)",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1280px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
        flag: "🇫🇷",
    },
        {
            id: 2,
            country: "Italy",
            city: "Rome",
            title: "Rome, Italy",
            subtitle: "Eternal City - Where history comes alive",
            price: Math.round(preferences.budget * 0.88),
            originalPrice: preferences.budget,
            savings: Math.round(preferences.budget * 0.12),
            rating: 4.9,
            reviews: 3156,
            matchScore: 92,
            flightTime: "8-12 hours from most locations",
            highlights: [
                "Colosseum & Roman Forum guided tours",
                "Vatican Museums & Sistine Chapel",
                "Traditional Roman food tour",
                "Trastevere neighborhood exploration",
                "Cooking class: Pasta & Gelato making",
            ],
            whyMatch: "Exceptional for History & Culture with amazing Food & Dining",
            bestFor: ["History", "Food", "Arts"],
            climate: "Warm and sunny, ideal for sightseeing",
            currency: "Euro (EUR)",
            language: "Italian (English spoken in tourist areas)",
            image: "/placeholder.svg?height=200&width=300",
            flag: "🇮🇹",
        },
        {
            id: 3,
            country: "Japan",
            city: "Tokyo",
            title: "Tokyo, Japan",
            subtitle: "Modern metropolis meets ancient traditions",
            price: Math.round(preferences.budget * 1.05),
            originalPrice: Math.round(preferences.budget * 1.15),
            savings: Math.round(preferences.budget * 0.1),
            rating: 4.9,
            reviews: 1923,
            matchScore: 88,
            flightTime: "11-14 hours from most locations",
            highlights: [
                "Traditional temples & modern districts",
                "Sushi making class with master chef",
                "Shibuya & Harajuku cultural exploration",
                "Traditional tea ceremony experience",
                "Tsukiji fish market food tour",
            ],
            whyMatch: "Unique blend of culture, history, and incredible cuisine",
            bestFor: ["Food", "History", "Arts"],
            climate: "Pleasant summer weather",
            currency: "Japanese Yen (JPY)",
            language: "Japanese (English signage in tourist areas)",
            image: "/placeholder.svg?height=200&width=300",
            flag: "🇯🇵",
        },
        {
            id: 4,
            country: "Spain",
            city: "Barcelona",
            title: "Barcelona, Spain",
            subtitle: "Vibrant city with stunning architecture and beaches",
            price: Math.round(preferences.budget * 0.85),
            originalPrice: preferences.budget,
            savings: Math.round(preferences.budget * 0.15),
            rating: 4.7,
            reviews: 2654,
            matchScore: 90,
            flightTime: "6-10 hours from most locations",
            highlights: [
                "Sagrada Familia and Gaudí architecture",
                "Park Güell and Gothic Quarter",
                "Tapas tours and local markets",
                "Beach relaxation at Barceloneta",
                "Flamenco shows and nightlife",
            ],
            whyMatch: "Perfect blend of culture, food, and relaxation",
            bestFor: ["Arts", "Food", "History"],
            climate: "Mediterranean climate with warm summers",
            currency: "Euro (EUR)",
            language: "Spanish/Catalan (English spoken in tourist areas)",
            image: "/placeholder.svg?height=200&width=300",
            flag: "🇪🇸",
        },
        {
            id: 5,
            country: "Greece",
            city: "Athens",
            title: "Athens, Greece",
            subtitle: "Cradle of civilization with ancient wonders",
            price: Math.round(preferences.budget * 0.8),
            originalPrice: preferences.budget,
            savings: Math.round(preferences.budget * 0.2),
            rating: 4.6,
            reviews: 2156,
            matchScore: 87,
            flightTime: "8-12 hours from most locations",
            highlights: [
                "Acropolis and Parthenon tours",
                "Ancient Agora and archaeological sites",
                "Traditional Greek tavernas",
                "Day trip to nearby islands",
                "National Archaeological Museum",
            ],
            whyMatch: "Rich ancient history and Mediterranean culture",
            bestFor: ["History", "Food", "Arts"],
            climate: "Warm Mediterranean climate",
            currency: "Euro (EUR)",
            language: "Greek (English spoken in tourist areas)",
            image: "/placeholder.svg?height=200&width=300",
            flag: "🇬🇷",
        }];
    console.log(preferences);
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
                        {destinations.map((place, id) => (

                            <PlaceCard place={place} key={id} id={id} selectedKey={selectedKey} setSelectedKey = {setSelectedKey} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}