import BookingLink from "./BookingLink.jsx";
import StationCard from "./StationCard.jsx";

export default function RouteCard({route, selectedRoute, setSelectedRoute, id}) {

    const getRouteIcon = (type) => {
        const icons = {
            flight: "✈️",
            train: "🚄",
            bus: "🚌",
            car: "🚗",
        };
        return icons[type] || "✈️";
    };

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
                                    route.itinerary.map((station,id)=>(
                                       <StationCard key={id} station={station} id={id} />
                                    ))
                                }
                            </div>

                            <div className="booking-box">
                                <div className="text-prop">🔗 Book Your Journey</div>
                                <div className="booking-links">
                                    {route.bookingLinks.map((bookingLink, index) => (
                                       <BookingLink key={index} bookingLink={bookingLink} />
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
                            <div className="map-title">🗺️ Route Map</div>
                            <div className="map-subtitle">
                                {route.distance} • {route.duration}
                            </div>
                        </div>

                        <div className="map-container">
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=Enschede,Netherlands&destination=Paris,France&mode=${route.type === "car" ? "driving" : route.type === "train" ? "transit" : route.type === "bus" ? "transit" : "flying"}&waypoints=${route.type === "train" ? "Amsterdam,Netherlands|Brussels,Belgium" : route.type === "bus" ? "Amsterdam,Netherlands|Brussels,Belgium" : route.type === "car" ? "Brussels,Belgium" : "Amsterdam,Netherlands"}`}
                                width="100%"
                                height="100%"
                                style={{border: 0, minHeight: "200px"}}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Route map for ${route.title}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
