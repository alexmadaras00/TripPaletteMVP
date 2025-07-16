import BookingLink from "./BookingLink.jsx";
import StationCard from "./StationCard.jsx";

export default function RouteCard({route, selectedRoute, setSelectedRoute, id, homeLocation, destination}) {
    console.log("start: ", homeLocation)
    const getRouteIcon = (type) => {
        const icons = {
            flight: "✈️",
            train: "🚄",
            bus: "🚌",
            car: "🚗",
        };
        return icons[type] || "✈️";
    };
    const getMode = (type) => {
        switch (type) {
            case "car":
                return "driving";
            case "train":
            case "bus":
                return "transit";
            case "bike":
                return "bicycling";
            case "walk":
                return "walking";
            default:
                return null;
        }
    };
    const itinerary = route.itinerary;

// Extract all intermediate waypoints (exclude first and last)
    const waypoints = itinerary
        .slice(1, -1) // everything except first and last
        .map(stop => stop.location)
        .join("|");
    const getFlightLink = (origin, destination) =>
        `https://www.google.com/flights?hl=en#flt=${origin}.${destination}`;

    return (
        <div
            className={`card-route${selectedRoute === id ? "-selected" : ""}`}
            onClick={() => {
                setSelectedRoute(id);
            }}
        >
            <div className="card-content">
                <div className="route-grid">
                    <div className="card-left">
                        <div>
                            <div className="card-header">
                                <div>
                                    <h3 className="route-title">
                                        {getRouteIcon(route.type)} {route.title}
                                    </h3>
                                    <p className="route-subtitle">
                                        {route.comfort} • {route.airline || route.operator}
                                    </p>
                                </div>

                                <div className="route-price">€{route.price}</div>

                            </div>

                            <div className="metrics-box">
                                <div className="metric">
                                    <div className="metric-value">{route.duration}</div>
                                    <div className="metric-label">Duration</div>
                                </div>
                                <div className="metric">
                                    <div className="metric-value">{route.distance}</div>
                                    <div className="metric-label">Distance</div>
                                </div>
                                <div className="metric">
                                    <div className="metric-value">{route.stops}</div>
                                    <div className="metric-label">Stops</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="timeline-title">Journey Timeline</div>
                            <div className="timeline-placeholder">
                                {
                                    route.itinerary.map((station, id) => (
                                        <StationCard key={id} station={station} itinerary={route.itinerary} id={id}/>
                                    ))
                                }
                            </div>

                            <div className="booking-box">
                                <div className="text-prop">🔗 Book Your Journey</div>
                                <div className="booking-links">
                                    {route.bookingLinks.map((bookingLink, index) => (
                                        <BookingLink key={index} bookingLink={bookingLink}/>
                                    ))}
                                </div>
                            </div>

                            <div className="booking-note">
                                💡 Click any link to check current prices and book tickets directly
                            </div>

                            {selectedRoute === id && (
                                <div className="selected-indicator">
                                    <div className="indicator-dot">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                                            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" fill="none"/>
                                        </svg>
                                    </div>
                                    <span className="indicator-text">Selected Route</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card-right">
                        <div className="map-header">
                            <h3 className="route-title">🗺️ Route Map</h3>
                            <p className="route-subtitle">
                                {route.distance} • {route.duration}
                            </p>
                        </div>

                        {route.type === "flight" ? (
                            <div className="map-unavailable">
                                <p>🛫 Flight map not available. </p>
                                <a
                                    href={getFlightLink(homeLocation, destination)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flight-link"
                                >
                                    View on Google Flights
                                </a>
                            </div>
                        ) : (
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/directions?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&origin=${homeLocation}&destination=${destination}&mode=${getMode(route.type)}&waypoints=${waypoints}`}
                                width="100%"
                                height="80%"
                                style={{border: 0, minHeight: "200px"}}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Route map for ${route.title}`}
                            />
                        )}
                        <div className="button-container">
                            <button className="btn btn-primary"
                                    onClick={() => (window.location.href = "/schedule")}>
                                View Complete Trip Schedule →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
