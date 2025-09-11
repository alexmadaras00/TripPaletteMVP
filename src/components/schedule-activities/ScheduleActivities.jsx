import NavBar from "../NavBar.jsx";
import InputCard from "../destination-recommendations/InputCard.jsx";
import PlaceCard from "../destination-recommendations/PlaceCard.jsx";
import StatCard from "../plan-trip/StatCard.jsx";
import "../../styles/schedule.css";
import DayCard from "./DayCard.jsx";
import { useNavigate } from "react-router-dom";
import {useState} from "react";


export default function ScheduleActivities() {
    const preferencesItem = sessionStorage.getItem("tripData");
    const preferences = preferencesItem ? JSON.parse(preferencesItem) : null;

    const schedule =  [
        // Day 1 - Arrival
        {
            dayNumber: 1,
            date: "Monday, July 15, 2024",
            title: "Welcome to Paris",
            weather: { temperature: "24°C / 75°F", condition: "Sunny", recommendation: "Perfect weather for walking" },
            budget: { total: 500, meals: 200, activities: 200, transport: 100 },
            activities: [
                {
                    time: "10:00 AM",
                    title: "Arrive at Charles de Gaulle Airport",
                    description: "Flight arrival from New York JFK",
                    type: "transport",
                    duration: "2 hours",
                    location: "CDG Airport, Terminal 2E",
                    tips: "Collect luggage and proceed to RER B train for city transfer",
                },
                {
                    time: "12:30 PM",
                    title: "Airport to City Center",
                    description: "RER B train to Châtelet-Les Halles, then Metro to hotel",
                    type: "transport",
                    duration: "1 hour",
                    location: "En route to 4th Arrondissement",
                    tips: "Buy a weekly Navigo pass for unlimited metro/bus travel",
                },
                {
                    time: "2:00 PM",
                    title: "Check-in at Hotel des Grands Boulevards",
                    description: "Boutique hotel in the heart of Paris",
                    type: "accommodation",
                    duration: "45 minutes",
                    location: "17 Boulevard Poissonnière, 2nd Arrondissement",
                    tips: "Ask reception for restaurant recommendations and metro maps",
                },
                {
                    time: "3:30 PM",
                    title: "Welcome Lunch at L'Ami Jean",
                    description: "First taste of authentic Parisian bistro cuisine",
                    type: "dining",
                    duration: "1.5 hours",
                    location: "27 Rue Malar, 7th Arrondissement",
                    tips: "Try the famous côte de bœuf and chocolate soufflé",
                },
                {
                    time: "5:30 PM",
                    title: "Seine River Walk",
                    description: "Gentle stroll along the Seine to get oriented",
                    type: "activity",
                    duration: "2 hours",
                    location: "From Pont Neuf to Île Saint-Louis",
                    tips: "Perfect for photos and getting your first Paris impressions",
                },
                {
                    time: "8:00 PM",
                    title: "Dinner at Le Comptoir du Relais",
                    description: "Classic French bistro experience",
                    type: "dining",
                    duration: "2 hours",
                    location: "9 Carrefour de l'Odéon, 6th Arrondissement",
                    tips: "No reservations - arrive early or be prepared to wait",
                },
            ],
            tips: [
                "Take it easy on your first day",
                "Stay hydrated during the flight",
                "Keep passport and important documents safe",
            ],
        },
        // Day 2 - Classic Paris
        {
            dayNumber: 2,
            date: "Tuesday, July 16, 2024",
            title: "Iconic Paris Landmarks",
            weather: {
                temperature: "26°C / 79°F",
                condition: "Partly cloudy",
                recommendation: "Great day for outdoor sightseeing",
            },
            budget: { total: 500, meals: 180, activities: 220, transport: 100 },
            activities: [
                {
                    time: "8:00 AM",
                    title: "Breakfast at Du Pain et des Idées",
                    description: "Famous artisanal bakery for fresh pastries",
                    type: "dining",
                    duration: "45 minutes",
                    location: "34 Rue Yves Toudic, 10th Arrondissement",
                    tips: "Try the pistachio-cherry escargot and café au lait",
                },
                {
                    time: "9:30 AM",
                    title: "Louvre Museum - Masterpieces Tour",
                    description: "Skip-the-line tour focusing on Mona Lisa, Venus de Milo, and highlights",
                    type: "sightseeing",
                    duration: "3 hours",
                    location: "Rue de Rivoli, 1st Arrondissement",
                    tips: "Book timed entry tickets online; wear comfortable shoes",
                },
                {
                    time: "1:00 PM",
                    title: "Lunch at Loulou Restaurant",
                    description: "Chic restaurant in Tuileries Garden",
                    type: "dining",
                    duration: "1.5 hours",
                    location: "107 Rue de Rivoli, Tuileries Garden",
                    tips: "Great for people-watching and French cuisine",
                },
                {
                    time: "3:00 PM",
                    title: "Tuileries Garden & Place Vendôme",
                    description: "Stroll through historic gardens and luxury shopping district",
                    type: "sightseeing",
                    duration: "1.5 hours",
                    location: "Tuileries Garden to Place Vendôme",
                    tips: "Perfect for photos and window shopping at luxury boutiques",
                },
                {
                    time: "5:00 PM",
                    title: "Eiffel Tower Visit",
                    description: "Ascend to the second floor for panoramic city views",
                    type: "sightseeing",
                    duration: "2 hours",
                    location: "Champ de Mars, 7th Arrondissement",
                    tips: "Book elevator tickets in advance; best photos from Trocadéro",
                },
                {
                    time: "7:30 PM",
                    title: "Seine River Cruise",
                    description: "Evening cruise with dinner and city illuminations",
                    type: "activity",
                    duration: "2 hours",
                    location: "Departing from Port de la Bourdonnais",
                    tips: "Dress warmly for evening breeze; bring camera for night shots",
                },
            ],
            tips: ["Book museum tickets in advance", "Wear comfortable walking shoes", "Bring a camera for iconic shots"],
        },
        // Day 3 - Art & Culture
        {
            dayNumber: 3,
            date: "Wednesday, July 17, 2024",
            title: "Art & Cultural Immersion",
            weather: {
                temperature: "23°C / 73°F",
                condition: "Light rain",
                recommendation: "Perfect museum weather - bring umbrella",
            },
            budget: { total: 500, meals: 200, activities: 200, transport: 100 },
            activities: [
                {
                    time: "8:30 AM",
                    title: "Breakfast at Café de Flore",
                    description: "Historic café frequented by famous writers and artists",
                    type: "dining",
                    duration: "1 hour",
                    location: "172 Boulevard Saint-Germain, 6th Arrondissement",
                    tips: "Order the traditional French breakfast with croissants",
                },
                {
                    time: "10:00 AM",
                    title: "Musée d'Orsay",
                    description: "World's finest collection of Impressionist masterpieces",
                    type: "sightseeing",
                    duration: "2.5 hours",
                    location: "1 Rue de la Légion d'Honneur, 7th Arrondissement",
                    tips: "Don't miss Monet's Water Lilies and Van Gogh's self-portraits",
                },
                {
                    time: "1:00 PM",
                    title: "Lunch at L'Ambassade d'Auvergne",
                    description: "Traditional French regional cuisine",
                    type: "dining",
                    duration: "1.5 hours",
                    location: "22 Rue du Grenier Saint-Lazare, 3rd Arrondissement",
                    tips: "Try the aligot (cheese and potato dish) and regional wines",
                },
                {
                    time: "3:00 PM",
                    title: "Marais District Walking Tour",
                    description: "Historic Jewish quarter with boutiques and galleries",
                    type: "cultural",
                    duration: "2 hours",
                    location: "Le Marais, 3rd & 4th Arrondissements",
                    tips: "Visit Place des Vosges, oldest planned square in Paris",
                },
                {
                    time: "5:30 PM",
                    title: "Picasso Museum",
                    description: "Extensive collection in beautiful 17th-century mansion",
                    type: "sightseeing",
                    duration: "1.5 hours",
                    location: "5 Rue de Thorigny, 3rd Arrondissement",
                    tips: "Audio guide recommended for context on Picasso's periods",
                },
                {
                    time: "7:30 PM",
                    title: "Wine Tasting at Le Mary Celeste",
                    description: "Natural wines and small plates in trendy Marais spot",
                    type: "dining",
                    duration: "2 hours",
                    location: "1 Rue Commines, 3rd Arrondissement",
                    tips: "Great selection of natural wines and fresh oysters",
                },
            ],
            tips: [
                "Museum pass saves time and money",
                "Marais is great for unique shopping",
                "Try local wine bars for authentic experience",
            ],
        },
        // Day 4 - Montmartre & Sacré-Cœur
        {
            dayNumber: 4,
            date: "Thursday, July 18, 2024",
            title: "Bohemian Montmartre",
            weather: {
                temperature: "25°C / 77°F",
                condition: "Sunny",
                recommendation: "Perfect day for hilltop exploration",
            },
            budget: { total: 500, meals: 190, activities: 210, transport: 100 },
            activities: [
                {
                    time: "8:00 AM",
                    title: "Breakfast at Pierre Hermé",
                    description: "World-famous macarons and pastries",
                    type: "dining",
                    duration: "45 minutes",
                    location: "72 Rue Bonaparte, 6th Arrondissement",
                    tips: "Try the Ispahan macaron (rose, raspberry, lychee)",
                },
                {
                    time: "9:30 AM",
                    title: "Funicular to Montmartre",
                    description: "Scenic ride up to the artistic hilltop district",
                    type: "transport",
                    duration: "30 minutes",
                    location: "From Pigalle to Sacré-Cœur",
                    tips: "Use your metro pass for the funicular",
                },
                {
                    time: "10:00 AM",
                    title: "Sacré-Cœur Basilica",
                    description: "Stunning white basilica with panoramic Paris views",
                    type: "sightseeing",
                    duration: "1.5 hours",
                    location: "35 Rue du Chevalier de la Barre, 18th Arrondissement",
                    tips: "Climb the dome for even better views (extra fee)",
                },
                {
                    time: "12:00 PM",
                    title: "Montmartre Village Exploration",
                    description: "Wander cobblestone streets, artist squares, and cafés",
                    type: "cultural",
                    duration: "2 hours",
                    location: "Place du Tertre and surrounding streets",
                    tips: "Watch street artists at work and visit the Moulin Rouge exterior",
                },
                {
                    time: "2:30 PM",
                    title: "Lunch at La Consigne",
                    description: "Cozy bistro with traditional French comfort food",
                    type: "dining",
                    duration: "1.5 hours",
                    location: "16 Rue de la Vieuville, 18th Arrondissement",
                    tips: "Try the duck confit and chocolate mousse",
                },
                {
                    time: "4:30 PM",
                    title: "Musée de Montmartre",
                    description: "History of the artistic district and its famous residents",
                    type: "sightseeing",
                    duration: "1 hour",
                    location: "12 Rue Cortot, 18th Arrondissement",
                    tips: "Beautiful gardens with vineyard views",
                },
                {
                    time: "6:00 PM",
                    title: "Sunset at Place du Tertre",
                    description: "Watch the sunset over Paris from the artist square",
                    type: "activity",
                    duration: "1 hour",
                    location: "Place du Tertre, 18th Arrondissement",
                    tips: "Perfect time for portrait sketches by local artists",
                },
                {
                    time: "8:00 PM",
                    title: "Dinner at Le Moulin de la Galette",
                    description: "Historic windmill restaurant with French cuisine",
                    type: "dining",
                    duration: "2 hours",
                    location: "83 Rue Lepic, 18th Arrondissement",
                    tips: "Romantic setting in a converted 17th-century windmill",
                },
            ],
            tips: [
                "Wear comfortable shoes for cobblestone streets",
                "Bring camera for amazing city views",
                "Evening is magical with street lights",
            ],
        },
        // Day 5 - Versailles Day Trip
        {
            dayNumber: 5,
            date: "Friday, July 19, 2024",
            title: "Palace of Versailles",
            weather: { temperature: "27°C / 81°F", condition: "Sunny", recommendation: "Great weather for palace gardens" },
            budget: { total: 500, meals: 170, activities: 230, transport: 100 },
            activities: [
                {
                    time: "7:30 AM",
                    title: "Early Breakfast at Hotel",
                    description: "Quick breakfast before day trip",
                    type: "dining",
                    duration: "30 minutes",
                    location: "Hotel restaurant",
                    tips: "Pack snacks and water for the day",
                },
                {
                    time: "8:30 AM",
                    title: "RER C Train to Versailles",
                    description: "Direct train from central Paris to Versailles",
                    type: "transport",
                    duration: "1 hour",
                    location: "From Invalides to Versailles Château",
                    tips: "Buy round-trip tickets and validate before boarding",
                },
                {
                    time: "10:00 AM",
                    title: "Palace of Versailles Tour",
                    description: "Opulent royal palace with Hall of Mirrors and State Apartments",
                    type: "sightseeing",
                    duration: "3 hours",
                    location: "Place d'Armes, Versailles",
                    tips: "Audio guide essential; avoid crowds by arriving early",
                },
                {
                    time: "1:30 PM",
                    title: "Lunch at La Petite Venise",
                    description: "Restaurant in the palace grounds",
                    type: "dining",
                    duration: "1 hour",
                    location: "Versailles Palace Grounds",
                    tips: "Convenient location within the estate",
                },
                {
                    time: "3:00 PM",
                    title: "Gardens of Versailles",
                    description: "Magnificent formal gardens with fountains and groves",
                    type: "activity",
                    duration: "2.5 hours",
                    location: "Versailles Palace Gardens",
                    tips: "Rent a bike or golf cart to cover more ground",
                },
                {
                    time: "6:00 PM",
                    title: "Marie Antoinette's Estate",
                    description: "The Queen's private retreat with Petit Trianon",
                    type: "sightseeing",
                    duration: "1.5 hours",
                    location: "Trianon Estate, Versailles",
                    tips: "Peaceful contrast to the main palace's grandeur",
                },
                {
                    time: "8:00 PM",
                    title: "Return to Paris",
                    description: "RER C train back to central Paris",
                    type: "transport",
                    duration: "1 hour",
                    location: "Versailles to Paris",
                    tips: "Trains run frequently until late evening",
                },
                {
                    time: "9:30 PM",
                    title: "Late Dinner at L'As du Fallafel",
                    description: "Famous falafel in the Marais district",
                    type: "dining",
                    duration: "45 minutes",
                    location: "34 Rue des Rosiers, 4th Arrondissement",
                    tips: "Perfect quick meal after a long day",
                },
            ],
            tips: ["Start early to avoid crowds", "Wear comfortable walking shoes", "Bring water and snacks"],
        },
        // Day 6 - Latin Quarter & Panthéon
        {
            dayNumber: 6,
            date: "Saturday, July 20, 2024",
            title: "Latin Quarter & Intellectual Paris",
            weather: {
                temperature: "24°C / 75°F",
                condition: "Partly cloudy",
                recommendation: "Perfect for walking and exploring",
            },
            budget: { total: 500, meals: 210, activities: 190, transport: 100 },
            activities: [
                {
                    time: "8:30 AM",
                    title: "Breakfast at Café Procope",
                    description: "Historic café frequented by Voltaire and Napoleon",
                    type: "dining",
                    duration: "1 hour",
                    location: "13 Rue de l'Ancienne Comédie, 6th Arrondissement",
                    tips: "Oldest café in Paris with incredible history",
                },
                {
                    time: "10:00 AM",
                    title: "Panthéon",
                    description: "Mausoleum of famous French figures including Curie and Voltaire",
                    type: "sightseeing",
                    duration: "1.5 hours",
                    location: "Place du Panthéon, 5th Arrondissement",
                    tips: "Don't miss the Foucault Pendulum demonstration",
                },
                {
                    time: "12:00 PM",
                    title: "Latin Quarter Walking Tour",
                    description: "Medieval streets, Sorbonne University, and bookshops",
                    type: "cultural",
                    duration: "2 hours",
                    location: "5th Arrondissement",
                    tips: "Visit Shakespeare and Company bookstore",
                },
                {
                    time: "2:30 PM",
                    title: "Lunch at Le Procope",
                    description: "Traditional French cuisine in historic setting",
                    type: "dining",
                    duration: "1.5 hours",
                    location: "13 Rue de l'Ancienne Comédie, 6th Arrondissement",
                    tips: "Try the coq au vin and crème brûlée",
                },
                {
                    time: "4:30 PM",
                    title: "Sainte-Chapelle",
                    description: "Gothic chapel famous for stunning stained glass windows",
                    type: "sightseeing",
                    duration: "1 hour",
                    location: "8 Boulevard du Palais, 1st Arrondissement",
                    tips: "Visit on a sunny day for best stained glass effect",
                },
                {
                    time: "6:00 PM",
                    title: "Notre-Dame Exterior & Île de la Cité",
                    description: "Explore the island and cathedral exterior (under restoration)",
                    type: "sightseeing",
                    duration: "1 hour",
                    location: "Île de la Cité, 4th Arrondissement",
                    tips: "Walk around the entire island for different perspectives",
                },
                {
                    time: "7:30 PM",
                    title: "Aperitif at Harry's Bar",
                    description: "Historic American bar, birthplace of the Bloody Mary",
                    type: "dining",
                    duration: "1 hour",
                    location: "5 Rue Daunou, 2nd Arrondissement",
                    tips: "Try their famous cocktails and bar snacks",
                },
                {
                    time: "9:00 PM",
                    title: "Farewell Dinner at Le Grand Véfour",
                    description: "Michelin-starred restaurant for a special final night",
                    type: "dining",
                    duration: "2.5 hours",
                    location: "17 Rue de Beaujolais, 1st Arrondissement",
                    tips: "Book well in advance; dress code required",
                },
            ],
            tips: ["Book restaurant reservations early", "Combine nearby attractions", "Save energy for special dinner"],
        },
        // Day 7 - Departure
        {
            dayNumber: 7,
            date: "Sunday, July 21, 2024",
            title: "Au Revoir Paris",
            weather: { temperature: "22°C / 72°F", condition: "Clear", recommendation: "Perfect final day" },
            budget: { total: 400, meals: 150, activities: 100, transport: 150 },
            activities: [
                {
                    time: "8:00 AM",
                    title: "Farewell Breakfast at Breizh Café",
                    description: "Modern crêperie for a final French breakfast",
                    type: "dining",
                    duration: "1 hour",
                    location: "109 Rue Vieille du Temple, 3rd Arrondissement",
                    tips: "Try both sweet and savory crêpes",
                },
                {
                    time: "10:00 AM",
                    title: "Check-out & Luggage Storage",
                    description: "Check out of hotel and store luggage",
                    type: "accommodation",
                    duration: "30 minutes",
                    location: "Hotel des Grands Boulevards",
                    tips: "Confirm luggage pickup time and airport transfer",
                },
                {
                    time: "11:00 AM",
                    title: "Last-Minute Shopping at Galeries Lafayette",
                    description: "Iconic department store for souvenirs and French goods",
                    type: "shopping",
                    duration: "2 hours",
                    location: "40 Boulevard Haussmann, 9th Arrondissement",
                    tips: "Don't miss the beautiful Art Nouveau dome",
                },
                {
                    time: "1:30 PM",
                    title: "Final Lunch at L'Ami Jean",
                    description: "Return to favorite bistro for last meal",
                    type: "dining",
                    duration: "1.5 hours",
                    location: "27 Rue Malar, 7th Arrondissement",
                    tips: "Order your favorite dishes from the week",
                },
                {
                    time: "3:30 PM",
                    title: "Collect Luggage & Airport Transfer",
                    description: "RER B train to Charles de Gaulle Airport",
                    type: "transport",
                    duration: "1.5 hours",
                    location: "Hotel to CDG Airport",
                    tips: "Allow extra time for international departure procedures",
                },
                {
                    time: "6:00 PM",
                    title: "Departure Flight to New York",
                    description: "Air France flight AF007 to JFK",
                    type: "transport",
                    duration: "8 hours",
                    location: "CDG Terminal 2E",
                    tips: "Arrive 3 hours early for international flights",
                },
            ],
            tips: ["Pack the night before", "Keep receipts for tax refunds", "Exchange remaining euros"],
        },
    ];
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
        console.log("Schedule: ",updatedPreferences.schedule);
        sessionStorage.setItem("tripData", JSON.stringify(updatedPreferences))
        console.log("Saving to sessionStorage: ", updatedPreferences.schedule);
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