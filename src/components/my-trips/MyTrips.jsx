import NavBar from "../NavBar.jsx";
import "../../styles/trip-routes.css";
import "../../styles/my-trips.css";
import "../../styles/schedule.css"
import {useEffect, useState} from "react";
import TripStatCard from "./TripStatCard.jsx";
import TripCard from "./TripCard.jsx";

export default function MyTrips() {

    const [trips, setTrips] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [sortBy, setSortBy] = useState("date");
    const [isLoading, setIsLoading] = useState(true);
    const tripStats = [
        {
            picture: "📊",
            amount: 5,
            text: "Total Trips",
        },
        {
            picture: "✈️",
            amount: 1,
            text: "Upcoming",
        },
        {
            picture: "✅",
            amount: 4,
            text: "Completed",
        },
        {
            picture: "🌍",
            amount: 4,
            text: "Countries",
        },
    ];
    const sampleTrips = [
        {
            id: 1,
            destination: "Paris, France",
            country: "France",
            flag: "🇫🇷",
            image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
            status: "upcoming",
            startDate: "2024-03-15",
            endDate: "2024-03-22",
            duration: "7 days",
            budget: "$2,500",
            activities: ["Museums", "Fine Dining", "Architecture"],
            groupType: "Couple",
            travelStyle: "Luxury",
            transportation: "Flight",
            matchScore: 95,
            interests: ["Culture", "Food", "History"],
            savedDate: "2024-01-15",
        },
        {
            id: 2,
            destination: "Tokyo, Japan",
            country: "Japan",
            flag: "🇯🇵",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
            status: "completed",
            startDate: "2023-11-10",
            endDate: "2023-11-20",
            duration: "10 days",
            budget: "$3,200",
            activities: ["Temples", "Street Food", "Shopping"],
            groupType: "Solo",
            travelStyle: "Adventure",
            transportation: "Flight",
            matchScore: 92,
            interests: ["Culture", "Food", "Technology"],
            savedDate: "2023-09-20",
        },
        {
            id: 3,
            destination: "Santorini, Greece",
            country: "Greece",
            flag: "🇬🇷",
            image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
            status: "completed",
            startDate: "2023-08-05",
            endDate: "2023-08-12",
            duration: "7 days",
            budget: "$1,800",
            activities: ["Beaches", "Sunset Views", "Wine Tasting"],
            groupType: "Couple",
            travelStyle: "Relaxation",
            transportation: "Flight + Ferry",
            matchScore: 88,
            interests: ["Beaches", "Photography", "Wine"],
            savedDate: "2023-06-10",
        },
        {
            id: 4,
            destination: "New York City, USA",
            country: "USA",
            flag: "🇺🇸",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
            status: "draft",
            startDate: "2024-05-01",
            endDate: "2024-05-05",
            duration: "4 days",
            budget: "$1,500",
            activities: ["Broadway", "Museums", "Central Park"],
            groupType: "Family",
            travelStyle: "Urban",
            transportation: "Flight",
            matchScore: 90,
            interests: ["Culture", "Entertainment", "Food"],
            savedDate: "2024-01-20",
        },
        {
            id: 5,
            destination: "Bali, Indonesia",
            country: "Indonesia",
            flag: "🇮🇩",
            image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
            status: "upcoming",
            startDate: "2024-06-15",
            endDate: "2024-06-25",
            duration: "10 days",
            budget: "$2,000",
            activities: ["Temples", "Beaches", "Yoga"],
            groupType: "Solo",
            travelStyle: "Wellness",
            transportation: "Flight",
            matchScore: 94,
            interests: ["Wellness", "Culture", "Nature"],
            savedDate: "2024-02-01",
        },
        {
            id: 6,
            destination: "Swiss Alps, Switzerland",
            country: "Switzerland",
            flag: "🇨🇭",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            status: "completed",
            startDate: "2023-12-20",
            endDate: "2023-12-27",
            duration: "7 days",
            budget: "$3,500",
            activities: ["Skiing", "Mountain Views", "Hot Springs"],
            groupType: "Friends",
            travelStyle: "Adventure",
            transportation: "Flight + Train",
            matchScore: 91,
            interests: ["Adventure", "Nature", "Sports"],
            savedDate: "2023-10-15",
        },
    ];


    useEffect(() => {
        // Simulate loading from localStorage or API
        setTimeout(() => {
            setTrips(sampleTrips)
            setFilteredTrips(sampleTrips)
            setIsLoading(false)
        }, 500)
    }, [])
    useEffect(() => {
        let filtered = trips

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (trip) =>
                    trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    trip.activities.some((activity) => activity.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        }

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter((trip) => trip.status === statusFilter)
        }

        // Sort trips
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "date":
                    return new Date(b.startDate) - new Date(a.startDate)
                case "destination":
                    return a.destination.localeCompare(b.destination)
                case "budget":
                    return Number.parseInt(b.budget.replace(/[$,]/g, "")) - Number.parseInt(a.budget.replace(/[$,]/g, ""))
                case "duration":
                    return Number.parseInt(b.duration) - Number.parseInt(a.duration)
                default:
                    return 0
            }
        })
        setFilteredTrips(filtered)
    }, [trips, searchTerm, statusFilter, sortBy]);

    const getStatusCounts = () => {
        return {
            all: trips.length,
            upcoming: trips.filter((t) => t.status === "upcoming").length,
            completed: trips.filter((t) => t.status === "completed").length,
            draft: trips.filter((t) => t.status === "draft").length,
        }
    }

    const statusCounts = getStatusCounts()
    const uniqueCountries = [...new Set(trips.map((trip) => trip.country))].length

    return (
        <>
            <NavBar/>
            <div className="dest-landing">
                <h1 className="trips-title">My Trips 🗂️</h1>
                <sub className="trips-subtitle">Manage and explore your travel history</sub>
                <ul className="stats">
                    {
                        tripStats.map((tripStat) => (
                            <TripStatCard name={tripStat.text} image={tripStat.picture} value={tripStat.amount}/>
                        ))
                    }
                </ul>
                <div className="bottom-section-mytrips ">
                    <div className="action">
                        <label className="text-help-section">🔍 Search Trips</label>
                        <input className="search-bar"
                               type="text"
                               placeholder="Search destinations or activities..."
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}

                               onFocus={(e) => (e.target.style.borderColor = "#ff6b35")}
                               onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                        />
                    </div>
                    <div className="action">
                        <label className="text-help-section">▲ Filter by Status</label>
                        <select className="selector"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Trips ({statusCounts.all})</option>
                            <option value="upcoming">Upcoming ({statusCounts.upcoming})</option>
                            <option value="completed">Completed ({statusCounts.completed})</option>
                            <option value="draft">Drafts ({statusCounts.draft})</option>
                        </select>
                    </div>
                    <div className="action">
                        <label className="text-help-section">🔄 Sort by</label>
                        <select
                            className="selector"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}>
                            <option value="date">Date</option>
                            <option value="destination">Destination</option>
                            <option value="budget">Budget</option>
                            <option value="duration">Duration</option>
                        </select>
                    </div>
                </div>

                <div className="trips-container">
                    <ul className="trips-list">
                        {sampleTrips.map((tripCard) => (
                            <TripCard setTripsList={setTrips} tripsList={sampleTrips} trip={tripCard}/>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
        ;
}