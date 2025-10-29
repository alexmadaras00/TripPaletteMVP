import React, {useState, useEffect, useRef} from "react";
import "../../styles/navbar.css";
import "../../styles/trip-routes.css";
import "../../styles/trip-summary.css";
import "../../styles/plan-trip.css";
import NavBar from "../NavBar.jsx";
import {useNavigate} from "react-router-dom";
import {beforeYouGo, duringYourTrip} from "../../constants/constants.js";
import ChecklistComponent from "./ChecklistComponent.jsx";
import html2canvas from "html2canvas";
import TripDocument from "./TripDocument.jsx";
import jsPDF from "jspdf";


export default function TripSummary() {
    const [tripData, setTripData] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [documentData, setDocumentData] = useState(null);
    const [documentRefAvailable, setDocumentRefAvailable] = useState(false);
    const navigate = useNavigate();
    const componentRef = useRef();


    useEffect(() => {
        const loadTripData = async () => {
            try {
                const storedData = localStorage.getItem("tripData");

                if (storedData) {
                    const data = JSON.parse(storedData);
                    // This is an important fix from your previous code.
                    // The data structure stored in local storage doesn't match the one you were expecting.
                    setTripData(data);
                    console.log(data);
                    setSelectedDestination(data.destination);
                    setSelectedRoute(data.route);
                    setSchedule(data.schedule || []);
                } else {
                    // Fallback example data. Note the corrected property names.
                    const exampleData = {
                        userPreferences: {
                            homeLocation: "New York, NY",
                            startDate: "2024-07-15",
                            endDate: "2024-07-22",
                            budgetValue: 3500,
                            travelStyle: "Explorer",
                            travelGroup: "Couple",
                            adults: 2,
                            children: 0,
                            interests: ["Food & Dining", "History & Culture", "Arts & Entertainment"],
                            numberOfDays: 8,
                        },
                        selectedDestination: {
                            id: 1,
                            title: "Paris, France",
                            city: "Paris",
                            country: "France",
                            subtitle: "The City of Light - Perfect for culture and cuisine lovers",
                            price: 2650,
                            matchScore: 95,
                            flag: "🇫🇷",
                        },
                        selectedRoute: {
                            id: 2,
                            title: "High-Speed Train",
                            type: "train",
                            duration: "6h 30m",
                            price: 2275,
                            carbonFootprint: "0.2 tons CO2",
                        },
                        detailedSchedule: [
                            {
                                day: 1,
                                date: "Monday, July 15, 2024",
                                title: "Welcome to Paris",
                                weather: { temperature: "24°C / 75°F", condition: "Sunny" },
                                activities: [
                                    { time: "10:00 AM", title: "Arrive at Charles de Gaulle Airport", type: "transport", location: "CDG Airport" },
                                    { time: "2:00 PM", title: "Check-in at Hotel des Grands Boulevards", type: "accommodation", location: "2nd Arrondissement" },
                                    { time: "3:30 PM", title: "Welcome Lunch at L'Ami Jean", type: "dining", location: "7th Arrondissement" },
                                    { time: "5:30 PM", title: "Seine River Walk", type: "activity", location: "From Pont Neuf to Île Saint-Louis" },
                                    { time: "8:00 PM", title: "Dinner at Le Comptoir du Relais", type: "dining", location: "6th Arrondissement" },
                                ],
                            },
                        ],
                    };
                    setTripData(exampleData.userPreferences);
                    setSelectedDestination(exampleData.selectedDestination);
                    setSelectedRoute(exampleData.selectedRoute);
                    setSchedule(exampleData.detailedSchedule);
                }
            } catch (error) {
                console.error("Error loading trip data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTripData();
        // This setTimeout is the key fix. It waits for the DOM to render the off-screen
        // component before attempting to access its ref, which enables the download button.
        setTimeout(() => {
            if (componentRef.current) {
                setDocumentRefAvailable(true);
            }
        }, 100);
    }, []);

    const calculateDuration = () => {
        const start = new Date(tripData.startDate)
        const end = new Date(tripData.endDate)
        return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24))
    }
    const createDate = (dateString) => {
        if (!dateString) return null;
        const parts = dateString.split('/');
        // The Date constructor expects month as 0-indexed, so we subtract 1
        return new Date(parts[2], parts[1] - 1, parts[0]);
    };

    const formatDate = (dateString) => {
        const date = createDate(dateString);
        if (!date) return "Invalid Date";
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };
    const totalActivities = schedule.reduce((acc, day) => acc + day.activities.length, 0);
    const totalMeals = schedule.reduce((acc, day) => acc + day.activities.filter((a) => a.type === "dining").length, 0);

    const getActivityIcon = (type) => ({
        transport: "✈️",
        accommodation: "🏨",
        dining: "🍽️",
        sightseeing: "🏛️",
        cultural: "🎭",
        activity: "📍"
    }[type] || "📍");

    const handlePrint = () => {
        window.print();
        setTimeout(() => window.print(), 1000);
    }
    const handleDownloadPDF = async () => {
        // 1. Prepare all the data to be passed to the TripDocument
        const dataToRender = {
            tripData,
            selectedDestination,
            selectedRoute,
            schedule,
        };

        // 2. Set the state to render the document
        // We use an empty object to trigger a re-render.
        setDocumentData(dataToRender);

        // 3. Wait a moment for the DOM to update and the ref to be attached.
        await new Promise(resolve => setTimeout(resolve, 50));

        // 4. Check if the ref is now available
        const input = componentRef.current;
        if (!input) {
            console.error("Component reference is null after render attempt.");
            setDocumentData(null);
            return;
        }

        // 5. Run the PDF generation logic
        try {
            const canvas = await html2canvas(input, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            let position = 0;
            let heightLeft = pdfHeight;
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }
            pdf.save("MyGeneratedTrip.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            // 6. Clean up by removing the document from the DOM
            setDocumentData(null);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: `My Trip to ${selectedDestination.city}`,
                text: `Check out my itinerary!`,
                url: window.location.href
            })
        } else {
            await navigator.clipboard.writeText(window.location.href)
            alert("Trip link copied to clipboard!")
        }
    }

    if (loading) {
        return (
            <div>
                <NavBar/>
                <div className="page-container">
                    <div className="page-content">
                        <div className="loading-container">
                            <div className="loading-text">Loading your trip summary...</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!tripData || !selectedDestination) {
        return (
            <div>
                <NavBar/>
                <div className="page-container">
                    <div className="page-content">
                        <div className="loading-container">
                            <div className="error-text">No trip data found</div>
                            <button className="btn btn-primary" onClick={() => (window.location.href = "/plan")}>Start
                                Planning Your Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const duration = calculateDuration()

    const navigateToSchedule = () => {
        navigate("/schedule");
    };
    const renderChecklist = (list) => {
        return (
            <div className="checklist-container">
                {list.map((task, index) => (
                    <div key={index} className="checklist-item">
                        <input type="checkbox" readOnly />
                        <span>{task}</span>
                    </div>
                ))}
            </div>
        );
    };

    function navigateToHome() {
        navigate("/home");
    }

    return (
        <div>
            <NavBar/>
            <div className="page-container">
                <div className="page-content">
                    <div className="page-header">
                        <h1 className="page-title">🎉 Your {tripData.numberOfDays}-Day {selectedDestination.city} Trip is Ready!</h1>
                        <p className="page-subtitle">
                            {formatDate(tripData.startDate)} - {formatDate(tripData.endDate)} • {tripData.travelGroup} • {tripData.travelPace} Style
                        </p>
                    </div>
                    <div className="page-section">
                        <h3 className="dest-title">🎉 Ready for Your Adventure?</h3>
                        <p style={{color: "#6b7280", marginBottom: "2rem"}}>
                            Your complete {tripData.numberOfDays}-day itinerary to {selectedDestination.city} is ready. Have
                            an amazing trip!
                        </p>
                        <div className="quick-actions-bar">
                            <button className="btn btn-primary-summary" onClick={handlePrint}>🖨️ Print Itinerary
                            </button>
                            <button onClick={handleDownloadPDF} className="btn btn-primary-summary" >
                                📄 Download Travel Document
                            </button>
                            <button className="btn btn-secondary" onClick={handleShare}>📤 Share Trip</button>
                            <button className="btn btn-secondary"
                                    onClick={() => navigateToSchedule()}>✏️ Edit Schedule
                            </button>
                            <button className="btn btn-main-summary" onClick={navigateToHome}>💾 Save Trip</button>
                        </div>
                    </div>

                    <div className="page-section">
                        <h1 className="dest-title">Trip Overview</h1>
                        <div className="card overview-card">
                            <div className="card-content">
                                <div className="grid-2 centered-grid">
                                    <div>
                                        <h2 className="overview-card-title">{selectedDestination.title}</h2>
                                        <div className="overview-card-subtitle">{selectedDestination.subtitle}</div>
                                        <div className="overview-card-details">
                                            <div>
                                                <div className="detail-label">🏠 From</div>
                                                <div>{tripData.homeLocation}</div>
                                            </div>
                                            <div>
                                                <div className="detail-label">🚄 Transport</div>
                                                <div>{selectedRoute?.title || "Selected Route"}</div>
                                            </div>
                                            <div>
                                                <div className="detail-label">👥 Travelers</div>
                                                <div>
                                                    {tripData.adults} Adult{tripData.adults > 1 ? "s" : ""}
                                                    {tripData.children > 0 && `, ${tripData.children} Child${tripData.children > 1 ? "ren" : ""}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overview-card-pricing">
                                        <div className="overview-card-budget">€{tripData.budget}</div>
                                        <div className="overview-card-subtext">Total Budget •
                                            €{Math.round(tripData.budget / tripData.numberOfDays)}/day
                                        </div>
                                        <div className="match-score">{selectedDestination.matchScore}% Perfect Match
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-section">
                        <div className="tabs-container">
                            {[
                                {id: "overview", label: "📊 Overview"},
                                {id: "schedule", label: "📅 Daily Schedule"},
                                {id: "transport", label: "🚄 Transportation"},
                                // {id: "checklist", label: "✅ Checklist"},
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`btn tab-button ${activeTab === tab.id ? 'active' : 'btn-secondary'}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="tab-content">
                            {activeTab === "overview" && (
                                <div>
                                    <div className="stats-list">
                                        <div className="stat-card">
                                            <div className="stat-number-summary">{tripData.numberOfDays}</div>
                                            <div className="stat-label">Days</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-number-summary">{totalActivities}</div>
                                            <div className="stat-label">Activities</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-number-summary">{totalMeals}</div>
                                            <div className="stat-label">Meals Planned</div>
                                        </div>
                                        <div className="stat-card">
                                            <div
                                                className="stat-number-summary">{selectedRoute?.carbonFootprint || "0.5 tons"}</div>
                                            <div className="stat-label-summary">CO2 Footprint</div>
                                        </div>
                                    </div>
                                    <div className="card card-margin">
                                        <div className="card-content">
                                            <h3 className="card-title">🎯 Your Interests Covered</h3>
                                            <div className="interests-container">
                                                {tripData.interests.map((interest, index) => <span key={index}
                                                                                                   className="interest-tag">{interest}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-2">
                                        <div className="card">
                                            <div className="card-content">
                                                <h3 className="card-title">🌤️ Weather Forecast</h3>
                                                <div className="weather-info">
                                                    <div className="weather-temp">☀️ 24°C</div>
                                                    <div className="weather-desc">Sunny with occasional clouds.</div>
                                                    <div className="weather-details">
                                                        • High: 26°C, Low: 18°C <br/>• 10% chance of rain
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-content">
                                                <h3 className="card-title">🎒 Packing Essentials</h3>
                                                <div className="packing-list">
                                                    <ul className="checklist">
                                                        {["Comfortable walking shoes", "Light jacket", "Phone charger", "Travel adapter (Type C/E)"].map((item, index) => (
                                                            <li key={index}><span className="check-icon">✓</span>{item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === "schedule" && (
                                <div>
                                    {schedule.length > 0 ? (
                                        schedule.map((day,index) => (
                                            <div key={day.dayNumber} className="card schedule-day-card">
                                                <div className="card-content">
                                                    <div className="schedule-day-header">
                                                        <div>
                                                            <h3 className="schedule-day-title">Day {day.dayNumber}: {day.title}</h3>
                                                            <p className="schedule-day-date">{day.date}</p>
                                                        </div>
                                                        <div
                                                            className="schedule-day-activity-count">{day.activities.length} activities
                                                        </div>
                                                    </div>
                                                    <div className="schedule-activity-list">
                                                        {day.activities.slice(0, 4).map((activity, index) => (
                                                            <div key={index} className="schedule-activity-item">
                                                                <div
                                                                    className="activity-icon-summary">{getActivityIcon(activity.type)}</div>
                                                                <div className="activity-details">
                                                                    <div className="activity-time">{activity.time}</div>
                                                                    <div
                                                                        className="activity-title">{activity.title}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {day.activities.length > 4 && (
                                                            <div className="view-more-activities">
                                                                +{day.activities.length - 4} more activities...
                                                                <button className="btn btn-secondary btn-small"
                                                                        onClick={() => navigateToSchedule()}>
                                                                    View Full Day
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (<div className="card">
                                        <div className="card-content centered-text padded-content">
                                            <div className="icon-large">📅</div>
                                            <h3>No detailed schedule</h3>
                                            <button className="btn btn-primary"
                                                    onClick={() => navigateToSchedule()}>Create
                                                Schedule
                                            </button>
                                        </div>
                                    </div>)}
                                </div>
                            )}
                            {activeTab === "transport" && (
                                <div>
                                    <div className="card">
                                        <div className="card-content">
                                            <h3 className="card-title">🚄 Your Selected Transportation</h3>
                                            {selectedRoute ? (
                                                <div className="transport-details">
                                                    <div className="transport-header">
                                                        <div>
                                                            <h4 className="transport-title">{selectedRoute.title}</h4>
                                                            <div
                                                                className="transport-meta">Duration: {selectedRoute.duration} •
                                                                Carbon: {selectedRoute.carbonFootprint}</div>
                                                        </div>
                                                        <div className="transport-pricing">
                                                            <div
                                                                className="transport-price">${selectedRoute.price}</div>
                                                            <div className="transport-price-label">per person</div>
                                                        </div>
                                                    </div>
                                                    <div className="booking-info">
                                                        <h5 className="booking-info-title">📋 Booking Information</h5>
                                                        <div className="booking-info-details">
                                                            • Book tickets in advance for best prices
                                                            <br/>• Arrive 30 minutes early for departures
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary"
                                                            onClick={() => (window.location.href = "/trip-routes")}>📝
                                                        Book Transportation
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="centered-text padded-content">
                                                    <div className="icon-large">🚄</div>
                                                    <p>No transportation selected yet</p>
                                                    <button className="btn btn-primary"
                                                            onClick={() => (window.location.href = "/trip-routes")}>Select
                                                        Transportation
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === "checklist" && (
                                <div>
                                    <div className="grid-2">
                                      <ChecklistComponent beforeYouGo={beforeYouGo} duringYourTrip={duringYourTrip} destination={tripData.country}/>
                                    </div>
                                    <div className="card card-margin">
                                        <div className="card-content">
                                            <h3 className="card-title">🚨 Emergency Information</h3>
                                            <div className="grid-3">
                                                <div>
                                                    <h4 className="emergency-title">🚓 Services</h4>
                                                    <div className="emergency-details">Police: 17<br/>Medical: 15</div>
                                                </div>
                                                <div>
                                                    <h4 className="emergency-title">🏥 Tourist Helpline</h4>
                                                    <div className="emergency-details">+33 1 49 52 42 63<br/>24/7
                                                        assistance
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="emergency-title">🏛️ Embassy</h4>
                                                    <div className="emergency-details">US Embassy Paris<br/>+33 1 43 12
                                                        22 22
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: 'absolute', left: '-9999px', top: '0' }}>
                <TripDocument tripData={tripData} ref={componentRef} />
            </div>
        </div>
    )
}




