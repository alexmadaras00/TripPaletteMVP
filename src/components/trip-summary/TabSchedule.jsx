import React from "react";

export default function TabSchedule({schedule, navigate}) {

    const getActivityIcon = (type) => ({
        transport: "✈️",
        accommodation: "🏨",
        dining: "🍽️",
        sightseeing: "🏛️",
        cultural: "🎭",
        activity: "📍"
    }[type] || "📍");

    const navigateToSchedule = () => {
        navigate("/schedule");
    };

    return (<div>
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
    </div>);
}