import React from "react";
import CardScheduleTab from "./CardScheduleTab.jsx";

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
                 <CardScheduleTab navigateToSchedule={navigateToSchedule} key={day.id} day={day} getActivityIcon={getActivityIcon} />
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