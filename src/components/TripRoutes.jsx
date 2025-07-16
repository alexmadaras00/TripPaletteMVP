import {useState} from "react";
import NavBar from "./NavBar.jsx";
import "../styles/trip-routes.css";
import "../styles/plan-trip.css";
import {useNavigate} from "react-router-dom";

import RouteCard from "./RouteCard.jsx";

export default function TripRoutes() {
    const preferencesItem = sessionStorage.getItem("tripPreferences");
    const preferences = preferencesItem ? JSON.parse(preferencesItem) : null;
    const [selectedRoute, setSelectedRoute] = useState(0);
    console.log(`Numer of days: ${preferences.numberOfDays}`);
    console.log(`Selected destination: ${preferences.destination}`);
    const navigate = useNavigate();
    const homeLocation = preferences.homeLocation;
    const destination = preferences.destination;

    function navigateBack() {
        navigate("/destination-recommendations");
    }

    const getTransportationRoutes = () => {

        const basePrice = preferences.destination.price || preferences.budget

        // Realistic routes from Enschede to Paris
        const routes = [
            {
                id: 1,
                title: "Flight via Amsterdam",
                description: "Flight from Amsterdam Schiphol to Paris Charles de Gaulle",
                type: "flight",
                duration: "4h 45m",
                distance: "495 km",
                price: Math.round(basePrice * 0.75),
                savings: Math.round(basePrice * 0.25),
                comfort: "Economy",
                stops: "1 connection",
                airline: "KLM",
                departureTime: "08:30",
                arrivalTime: "13:15",
                baggage: "1 checked bag included",
                carbonFootprint: "0.8 tons CO2",
                bookingLinks: [
                    {name: "NS International", url: "https://www.ns.nl/en", description: "Train to Amsterdam Schiphol"},
                    {name: "KLM", url: "https://www.klm.com", description: "Flight Amsterdam to Paris"},
                    {name: "Skyscanner", url: "https://www.skyscanner.com", description: "Compare flight prices"},
                    {name: "Booking.com", url: "https://www.booking.com", description: "Airport hotels"},
                ],
                itinerary: [
                    {
                        location: "Enschede",
                        time: "06:00",
                        type: "departure",
                        transport: "NS Train to Amsterdam Schiphol",
                        duration: "2h 15m",
                        bookingUrl: "https://www.ns.nl/en",
                    },
                    {
                        location: "Amsterdam Schiphol (AMS)",
                        time: "08:30",
                        type: "connection",
                        transport: "KLM Flight KL1234",
                        duration: "1h 20m",
                        bookingUrl: "https://www.klm.com",
                    },
                    {
                        location: "Paris Charles de Gaulle (CDG)",
                        time: "11:50",
                        type: "connection",
                        transport: "RER B to City Center",
                        duration: "45m",
                        bookingUrl: "https://www.ratp.fr/en",
                    },
                    {
                        location: "Paris City Center",
                        time: "13:15",
                        type: "arrival",
                        transport: "Arrival",
                        duration: "0m",
                    },
                ],
            },
            {
                id: 2,
                title: "High-Speed Train",
                description: "Direct train connection via Amsterdam and Brussels",
                type: "train",
                duration: "6h 30m",
                distance: "520 km",
                price: Math.round(basePrice * 0.65),
                savings: Math.round(basePrice * 0.35),
                comfort: "2nd Class",
                stops: "2 connections",
                airline: "NS International + Thalys",
                departureTime: "07:45",
                arrivalTime: "14:15",
                baggage: "No weight restrictions",
                carbonFootprint: "0.2 tons CO2",
                bookingLinks: [
                    {
                        name: "NS International",
                        url: "https://www.nsinternational.com/en",
                        description: "Book entire journey"
                    },
                    {name: "Thalys", url: "https://www.thalys.com/en", description: "High-speed train to Paris"},
                    {name: "Trainline", url: "https://www.trainline.com", description: "Compare train prices"},
                    {name: "Eurail", url: "https://www.eurail.com", description: "Rail pass options"},
                ],
                itinerary: [
                    {
                        location: "Enschede Central",
                        time: "07:45",
                        type: "departure",
                        transport: "NS Intercity to Amsterdam",
                        duration: "2h 15m",
                        bookingUrl: "https://www.ns.nl/en",
                    },
                    {
                        location: "Amsterdam Central",
                        time: "10:00",
                        type: "connection",
                        transport: "15 min transfer",
                        duration: "15m",
                    },
                    {
                        location: "Amsterdam Central",
                        time: "10:15",
                        type: "connection",
                        transport: "Thalys to Paris",
                        duration: "3h 20m",
                        bookingUrl: "https://www.thalys.com/en",
                    },
                    {
                        location: "Brussels-Midi",
                        time: "12:45",
                        type: "connection",
                        transport: "5 min stop",
                        duration: "5m",
                    },
                    {
                        location: "Paris Gare du Nord",
                        time: "14:15",
                        type: "arrival",
                        transport: "Arrival",
                        duration: "0m",
                    },
                ],
            },
            {
                id: 3,
                title: "Direct Car Drive",
                description: "Scenic drive through Netherlands, Belgium to France",
                type: "car",
                duration: "5h 15m",
                distance: "485 km",
                price: Math.round(basePrice * 0.45),
                savings: Math.round(basePrice * 0.55),
                comfort: "Private Car",
                stops: "2 rest stops",
                airline: "Rental Car",
                departureTime: "08:00",
                arrivalTime: "13:15",
                baggage: "Unlimited luggage",
                carbonFootprint: "0.6 tons CO2",
                bookingLinks: [
                    {name: "Hertz", url: "https://www.hertz.com", description: "Car rental"},
                    {name: "Europcar", url: "https://www.europcar.com", description: "European car rental"},
                    {name: "Sixt", url: "https://www.sixt.com", description: "Premium car rental"},
                    {
                        name: "Google Maps",
                        url: "https://www.google.com/maps/dir/Enschede,Netherlands/Paris,France",
                        description: "Route planning",
                    },
                ],
                itinerary: [
                    {
                        location: "Enschede",
                        time: "08:00",
                        type: "departure",
                        transport: "Drive via A1/A2",
                        duration: "2h 00m",
                        bookingUrl: "https://www.google.com/maps/dir/Enschede,Netherlands/Brussels,Belgium",
                    },
                    {
                        location: "Brussels (Rest Stop)",
                        time: "10:00",
                        type: "connection",
                        transport: "15 min break",
                        duration: "15m",
                    },
                    {
                        location: "Brussels",
                        time: "10:15",
                        type: "connection",
                        transport: "Drive via A1/A86",
                        duration: "3h 00m",
                        bookingUrl: "https://www.google.com/maps/dir/Brussels,Belgium/Paris,France",
                    },
                    {
                        location: "Paris",
                        time: "13:15",
                        type: "arrival",
                        transport: "Arrival",
                        duration: "0m",
                    },
                ],
            },
            {
                id: 4,
                title: "Budget Bus",
                description: "Comfortable coach service with multiple stops",
                type: "bus",
                duration: "8h 45m",
                distance: "510 km",
                price: Math.round(basePrice * 0.25),
                savings: Math.round(basePrice * 0.75),
                comfort: "Standard Coach",
                stops: "4 stops",
                airline: "FlixBus",
                departureTime: "06:30",
                arrivalTime: "15:15",
                baggage: "2 bags included",
                carbonFootprint: "0.15 tons CO2",
                bookingLinks: [
                    {name: "FlixBus", url: "https://global.flixbus.com", description: "Book bus tickets"},
                    {name: "Eurolines", url: "https://www.eurolines.com", description: "Alternative bus service"},
                    {name: "Ouibus", url: "https://www.ouibus.com", description: "SNCF bus service"},
                    {name: "Busbud", url: "https://www.busbud.com", description: "Compare bus prices"},
                ],
                itinerary: [
                    {
                        location: "Enschede Bus Station",
                        time: "06:30",
                        type: "departure",
                        transport: "FlixBus FB123",
                        duration: "2h 30m",
                        bookingUrl: "https://global.flixbus.com",
                    },
                    {
                        location: "Amsterdam Sloterdijk",
                        time: "09:00",
                        type: "connection",
                        transport: "20 min stop",
                        duration: "20m",
                    },
                    {
                        location: "Amsterdam",
                        time: "09:20",
                        type: "connection",
                        transport: "Continue to Brussels",
                        duration: "2h 40m",
                    },
                    {
                        location: "Brussels North",
                        time: "12:00",
                        type: "connection",
                        transport: "30 min stop",
                        duration: "30m",
                    },
                    {
                        location: "Brussels",
                        time: "12:30",
                        type: "connection",
                        transport: "Continue to Paris",
                        duration: "2h 45m",
                    },
                    {
                        location: "Paris Bercy",
                        time: "15:15",
                        type: "arrival",
                        transport: "Arrival",
                        duration: "0m",
                    },
                ],
            },
        ]

        return routes
    };
    const routes = getTransportationRoutes();
    return (<div>
        <NavBar/>
        <div className="dest-landing">
            <h1 className="dest-title">Transportation Routes</h1>
            <p>From {preferences.homeLocation} to {preferences.destination.city+", "+preferences.destination.country} • {preferences.numberOfDays} days
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
                                <p className="text-prop">{preferences.destination}</p>
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
                <p>Choose the best way to travel from {preferences.homeLocation} to {preferences.destination}</p>
                <div className="routes-list-container">
                    {routes.map((route, id) => (
                        <RouteCard route={route} key={id} id={id} selectedRoute={selectedRoute}
                                   setSelectedRoute={setSelectedRoute} homeLocation={homeLocation}
                                   destination={destination} preferences={preferences}/>
                    ))}
                </div>
            </div>
        </div>
    </div>);
}