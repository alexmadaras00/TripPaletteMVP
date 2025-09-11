export default function DayCard({day}) {
    const getActivityIcon = (type) => {
        const icons = {
            transport: "✈️",
            accommodation: "🏨",
            dining: "🍽️",
            sightseeing: "🏛️",
            cultural: "🎭",
            workshop: "🎨",
            adventure: "🏃‍♂️",
            shopping: "🛍️",
            nightlife: "🌙",
            activity: "📍",
        }
        return icons[type] || "📍"
    }
    return (
        <div className="card-day">
            <div className="card-container">
                <div>
                    <h3 className="card-day-title">
                        Day {day.dayNumber}: {day.title}
                    </h3>
                    <p className="card-date">{day.date}</p>
                </div>
                <div className="card-weather">
                    <div className="weather-info">
                        {day.weather.condition} • {day.weather.temperature}
                    </div>
                    <div className="weather-budget">Daily Budget: ${day.budget.total}</div>
                </div>
            </div>

            {/* Activities Timeline */}
            <div className="activities-container">
                {day.activities.map((activity, index) => (
                    <div className="activity-item" key={index}>
                        {index < day.activities.length - 1 && <div className="timeline-line" />}
                        <div className="activity-icon">{getActivityIcon(activity.type)}</div>

                        {/* Activity details */}
                        <div className="activity-details">
                            <div className="activity-header">
                                <div>
                                    <div className="activity-time">{activity.time}</div>
                                    <h4 className="activity-title">{activity.title}</h4>
                                </div>
                                <span className="activity-duration">{activity.duration}</span>
                            </div>
                            <p className="activity-description">{activity.description}</p>
                            <div className="activity-location">📍 {activity.location}</div>
                            <div className="activity-tips">💡 {activity.tips}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Day Tips */}
            <div className="day-tips">
                <h4 className="day-tips-title">💡 Tips for Day {day.dayNumber}</h4>
                <ul className="day-tips-list">
                    {day.tips.map((tip, index) => (
                        <li className="day-tip-item" key={index}>
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}