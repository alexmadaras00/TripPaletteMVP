import React from "react";
import "../../styles/navbar.css";
import "../../styles/plan-trip.css";

// Use React.forwardRef to correctly receive the ref.
// The first argument is a single props object, which we'll destructure.
// The second argument is the ref itself.
const TripDocument = React.forwardRef(
    ({ tripData, selectedDestination, selectedRoute, schedule }, ref) => {

        // Add a safeguard for the schedule, interests, and other props.
        // This prevents errors if any data is missing.
        const finalSchedule = schedule || [];
        const finalInterests = tripData?.interests || [];
        const duration = tripData?.numberOfDays;
        const finalSelectedDestination = selectedDestination || {};
        const finalSelectedRoute = selectedRoute || {};

        const totalActivities = finalSchedule.reduce((acc, day) => acc + (day.activities?.length || 0), 0);
        const totalMeals = finalSchedule.reduce((acc, day) => acc + (day.activities?.filter((a) => a.type === "dining").length || 0), 0);

        const formatDate = (dateString) =>
            new Date(dateString).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            });

        const getActivityIcon = (type) => {
            const icons = {
                transport: "✈️",
                accommodation: "🏨",
                dining: "🍽️",
                sightseeing: "🏛️",
                cultural: "🎭",
                activity: "📍",
            };
            return icons[type] || "📍";
        };

        const getCurrentDate = () => {
            return new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
        };

        const getPersonalizedGreeting = () => {
            const greetings = {
                Explorer: "Ready to discover the world's wonders?",
                Relaxer: "Time to unwind and rejuvenate your soul.",
                Adventurer: "Your next great adventure awaits!",
            };
            return greetings[tripData?.travelStyle] || "Your perfect journey begins now!";
        };

        const getDestinationQuote = () => {
            const quotes = {
                Paris: "When good Americans die, they go to Paris. - Oscar Wilde",
                Rome: "All roads lead to Rome. - Ancient Proverb",
                Tokyo: "Tokyo is a model of how large cities can be both highly efficient and livable. - Sadiq Khan",
                London: "When a man is tired of London, he is tired of life. - Samuel Johnson",
                Barcelona: "Barcelona is a very old city in which you can feel the weight of history. - Felipe VI",
            };
            return quotes[finalSelectedDestination.city] || "Travel makes one modest. You see what a tiny place you occupy in the world.";
        };

        if (!tripData || !finalSelectedDestination) {
            // Return a loading or error message if essential data is missing
            return <div>Error: Trip data is incomplete.</div>;
        }

        return (
            <div
                ref={ref}
                style={{
                    fontFamily: "'Georgia', serif",
                    lineHeight: "1.6",
                    color: "#2d3748",
                    backgroundColor: "#ffffff",
                    minHeight: "100vh",
                }}
            >
                {/* Cover Page */}
                <div
                    style={{
                        minHeight: "100vh",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        textAlign: "center",
                        padding: "2rem",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Decorative Elements */}
                    <div
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "10%",
                            fontSize: "8rem",
                            opacity: "0.1",
                            transform: "rotate(-15deg)",
                        }}
                    >
                        ✈️
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            bottom: "15%",
                            right: "15%",
                            fontSize: "6rem",
                            opacity: "0.1",
                            transform: "rotate(25deg)",
                        }}
                    >
                        🗺️
                    </div>

                    <div style={{ zIndex: 2 }}>
                        {/* Logo */}
                        <div
                            style={{
                                width: "120px",
                                height: "120px",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 2rem",
                                backdropFilter: "blur(10px)",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                            }}
                        >
                            <span style={{ fontSize: "3rem", fontWeight: "bold" }}>TP</span>
                        </div>

                        <h1
                            style={{
                                fontSize: "4rem",
                                fontWeight: "300",
                                marginBottom: "1rem",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                            }}
                        >
                            Your Personal Journey
                        </h1>

                        <div
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: "600",
                                marginBottom: "2rem",
                                background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {finalSelectedDestination.flag} {finalSelectedDestination.title}
                        </div>

                        <div
                            style={{
                                fontSize: "1.5rem",
                                marginBottom: "3rem",
                                opacity: "0.9",
                                fontStyle: "italic",
                            }}
                        >
                            {formatDate(tripData.startDate)} - {formatDate(tripData.endDate)}
                        </div>

                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                padding: "2rem",
                                borderRadius: "20px",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                maxWidth: "600px",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "1.25rem",
                                    marginBottom: "1rem",
                                    fontWeight: "300",
                                }}
                            >
                                {getPersonalizedGreeting()}
                            </p>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    opacity: "0.8",
                                    fontStyle: "italic",
                                }}
                            >
                                "{getDestinationQuote()}"
                            </p>
                        </div>

                        <div
                            style={{
                                marginTop: "3rem",
                                fontSize: "1rem",
                                opacity: "0.7",
                            }}
                        >
                            Crafted with ❤️ by Trip Palette AI • {getCurrentDate()}
                        </div>
                    </div>
                </div>

                {/* Trip Overview Page */}
                <div
                    style={{
                        minHeight: "100vh",
                        padding: "4rem 2rem",
                        background: "linear-gradient(to bottom, #f7fafc, #edf2f7)",
                    }}
                >
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <h2
                                style={{
                                    fontSize: "3rem",
                                    color: "#2d3748",
                                    marginBottom: "1rem",
                                    fontWeight: "300",
                                }}
                            >
                                Your {duration}-Day Adventure
                            </h2>
                            <div
                                style={{
                                    width: "100px",
                                    height: "4px",
                                    background: "linear-gradient(90deg, #667eea, #764ba2)",
                                    margin: "0 auto 2rem",
                                    borderRadius: "2px",
                                }}
                            ></div>
                        </div>

                        {/* Personal Touch Section */}
                        <div
                            style={{
                                background: "white",
                                padding: "3rem",
                                borderRadius: "20px",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                marginBottom: "3rem",
                                border: "1px solid #e2e8f0",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "2rem",
                                    color: "#4a5568",
                                    marginBottom: "2rem",
                                    textAlign: "center",
                                }}
                            >
                                🎯 Perfectly Tailored for You
                            </h3>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                                    gap: "2rem",
                                    marginBottom: "2rem",
                                }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏠</div>
                                    <h4 style={{ color: "#2d3748", marginBottom: "0.5rem" }}>From Home</h4>
                                    <p style={{ color: "#718096" }}>{tripData.homeLocation}</p>
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👥</div>
                                    <h4 style={{ color: "#2d3748", marginBottom: "0.5rem" }}>Travel Style</h4>
                                    <p style={{ color: "#718096" }}>
                                        {tripData.travelGroup} • {tripData.travelStyle}
                                    </p>
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💰</div>
                                    <h4 style={{ color: "#2d3748", marginBottom: "0.5rem" }}>Your Budget</h4>
                                    <p style={{ color: "#718096" }}>${tripData.budgetValue} total</p>
                                </div>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <h4 style={{ color: "#2d3748", marginBottom: "1rem" }}>Your Interests</h4>
                                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                                    {finalInterests.map((interest, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                padding: "0.5rem 1.5rem",
                                                background: "linear-gradient(135deg, #667eea, #764ba2)",
                                                color: "white",
                                                borderRadius: "25px",
                                                fontSize: "0.9rem",
                                                fontWeight: "500",
                                            }}
                                        >
                      {interest}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Destination Highlight */}
                        <div
                            style={{
                                background: "white",
                                padding: "3rem",
                                borderRadius: "20px",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                marginBottom: "3rem",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{finalSelectedDestination.flag}</div>
                            <h3
                                style={{
                                    fontSize: "2.5rem",
                                    color: "#2d3748",
                                    marginBottom: "1rem",
                                }}
                            >
                                {finalSelectedDestination.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "1.25rem",
                                    color: "#718096",
                                    marginBottom: "2rem",
                                    fontStyle: "italic",
                                }}
                            >
                                {finalSelectedDestination.subtitle}
                            </p>

                            <div
                                style={{
                                    background: "linear-gradient(135deg, #48bb78, #38a169)",
                                    color: "white",
                                    padding: "1rem 2rem",
                                    borderRadius: "50px",
                                    display: "inline-block",
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                }}
                            >
                                {finalSelectedDestination.matchScore}% Perfect Match for You!
                            </div>
                        </div>

                        {/* Trip Statistics */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                gap: "2rem",
                                marginBottom: "3rem",
                            }}
                        >
                            {[
                                { icon: "📅", label: "Days", value: duration },
                                { icon: "🎯", label: "Activities", value: totalActivities },
                                { icon: "🍽️", label: "Meals", value: totalMeals },
                                { icon: "🌱", label: "CO2", value: finalSelectedRoute?.carbonFootprint || "0.5 tons" },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: "white",
                                        padding: "2rem",
                                        borderRadius: "15px",
                                        textAlign: "center",
                                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
                                    <div style={{ fontSize: "2rem", fontWeight: "600", color: "#2d3748", marginBottom: "0.5rem" }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ color: "#718096", fontSize: "0.9rem" }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Daily TabSchedule Pages */}
                {finalSchedule.map((day, dayIndex) => (
                    <div
                        key={day.day}
                        style={{
                            minHeight: "100vh",
                            padding: "4rem 2rem",
                            background: dayIndex % 2 === 0 ? "#f7fafc" : "white",
                        }}
                    >
                        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                            {/* Day Header */}
                            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                                <div
                                    style={{
                                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                                        color: "white",
                                        padding: "1rem 2rem",
                                        borderRadius: "50px",
                                        display: "inline-block",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Day {day.day}
                                </div>
                                <h2
                                    style={{
                                        fontSize: "2.5rem",
                                        color: "#2d3748",
                                        marginBottom: "0.5rem",
                                        fontWeight: "300",
                                    }}
                                >
                                    {day.title}
                                </h2>
                                <p
                                    style={{
                                        fontSize: "1.25rem",
                                        color: "#718096",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {day.date}
                                </p>
                                {day.weather && (
                                    <div
                                        style={{
                                            background: "rgba(255, 255, 255, 0.8)",
                                            padding: "0.75rem 1.5rem",
                                            borderRadius: "25px",
                                            display: "inline-block",
                                            fontSize: "0.9rem",
                                            color: "#4a5568",
                                        }}
                                    >
                                        🌤️ {day.weather.condition} • {day.weather.temperature}
                                    </div>
                                )}
                            </div>

                            {/* Activities Timeline */}
                            <div style={{ position: "relative" }}>
                                {/* Timeline Line */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "2rem",
                                        top: "0",
                                        bottom: "0",
                                        width: "3px",
                                        background: "linear-gradient(to bottom, #667eea, #764ba2)",
                                        borderRadius: "2px",
                                    }}
                                ></div>

                                {day.activities.map((activity, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            marginBottom: "3rem",
                                            position: "relative",
                                        }}
                                    >
                                        {/* Timeline Dot */}
                                        <div
                                            style={{
                                                width: "3rem",
                                                height: "3rem",
                                                background: "white",
                                                border: "4px solid #667eea",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "1.2rem",
                                                marginRight: "2rem",
                                                zIndex: 2,
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                            }}
                                        >
                                            {getActivityIcon(activity.type)}
                                        </div>

                                        {/* Activity Content */}
                                        <div
                                            style={{
                                                background: "white",
                                                padding: "2rem",
                                                borderRadius: "15px",
                                                flex: 1,
                                                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                                                border: "1px solid #e2e8f0",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                    marginBottom: "1rem",
                                                }}
                                            >
                                                <div>
                                                    <div
                                                        style={{
                                                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                                                            color: "white",
                                                            padding: "0.5rem 1rem",
                                                            borderRadius: "20px",
                                                            fontSize: "0.9rem",
                                                            fontWeight: "600",
                                                            display: "inline-block",
                                                            marginBottom: "0.5rem",
                                                        }}
                                                    >
                                                        {activity.time}
                                                    </div>
                                                    <h4
                                                        style={{
                                                            fontSize: "1.5rem",
                                                            color: "#2d3748",
                                                            marginBottom: "0.5rem",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {activity.title}
                                                    </h4>
                                                    {activity.location && (
                                                        <p
                                                            style={{
                                                                color: "#718096",
                                                                fontSize: "0.9rem",
                                                                margin: "0",
                                                            }}
                                                        >
                                                            📍 {activity.location}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Activity Type Badge */}
                                            <div
                                                style={{
                                                    display: "inline-block",
                                                    padding: "0.25rem 0.75rem",
                                                    background: "#edf2f7",
                                                    color: "#4a5568",
                                                    borderRadius: "15px",
                                                    fontSize: "0.8rem",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {activity.type}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Memory Pages */}
                <div
                    style={{
                        minHeight: "100vh",
                        padding: "4rem 2rem",
                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        color: "white",
                    }}
                >
                    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
                        <h2
                            style={{
                                fontSize: "3rem",
                                marginBottom: "2rem",
                                fontWeight: "300",
                            }}
                        >
                            📸 Capture Your Memories
                        </h2>

                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                padding: "3rem",
                                borderRadius: "20px",
                                backdropFilter: "blur(10px)",
                                marginBottom: "3rem",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "1.25rem",
                                    marginBottom: "2rem",
                                    lineHeight: "1.8",
                                }}
                            >
                                This journey is more than just a trip—it's a collection of moments that will become treasured memories.
                                Use the spaces below to document your favorite experiences, unexpected discoveries, and the people you
                                meet along the way.
                            </p>
                        </div>

                        {/* Memory Sections */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                                gap: "2rem",
                                marginBottom: "3rem",
                            }}
                        >
                            {[
                                { title: "Best Meal", icon: "🍽️", prompt: "What was the most delicious dish you tried?" },
                                { title: "Favorite Moment", icon: "⭐", prompt: "What moment made you smile the most?" },
                                { title: "New Discovery", icon: "🔍", prompt: "What surprised you about this destination?" },
                                { title: "People Met", icon: "👥", prompt: "Who made your journey more special?" },
                            ].map((section, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.15)",
                                        padding: "2rem",
                                        borderRadius: "15px",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                    }}
                                >
                                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{section.icon}</div>
                                    <h4 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{section.title}</h4>
                                    <p style={{ fontSize: "0.9rem", marginBottom: "1rem", opacity: "0.8" }}>{section.prompt}</p>
                                    <div
                                        style={{
                                            background: "rgba(255, 255, 255, 0.1)",
                                            height: "100px",
                                            borderRadius: "10px",
                                            border: "2px dashed rgba(255, 255, 255, 0.3)",
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>

                        {/* Photo Collage Section */}
                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                padding: "3rem",
                                borderRadius: "20px",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <h3 style={{ fontSize: "2rem", marginBottom: "2rem" }}>📷 Your Photo Journey</h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                                    gap: "1rem",
                                }}
                            >
                                {Array.from({ length: 6 }, (_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            aspectRatio: "1",
                                            background: "rgba(255, 255, 255, 0.1)",
                                            borderRadius: "10px",
                                            border: "2px dashed rgba(255, 255, 255, 0.3)",
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Closing Page */}
                <div
                    style={{
                        minHeight: "100vh",
                        background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        textAlign: "center",
                        padding: "2rem",
                    }}
                >
                    <div style={{ zIndex: 2 }}>
                        <div style={{ fontSize: "6rem", marginBottom: "2rem" }}>✨</div>
                        <h2 style={{ fontSize: "3rem", fontWeight: "300", marginBottom: "1rem" }}>
                            Enjoy your trip!
                        </h2>
                        <p style={{ fontSize: "1.5rem", opacity: "0.9" }}>
                            May your journey be filled with unforgettable moments and amazing stories.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);

export default TripDocument;