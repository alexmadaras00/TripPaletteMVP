export default function StationCard({station, id, itinerary}) {

    return (<div className="card-station">
        <div className="station-dot">
        </div>
        <div className="connection-line" hidden={id === itinerary.length - 1}>

        </div>
        <div className="station-info">
            <h1 className="text-station">{station.time} - {station.location}</h1>
            <div className="details-station"><a className="link-station" href={station.bookingUrl} target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                }}>{station.transport + " "}</a> <span
                className="duration-station">{station.duration === "0m" ? "" : ` (${station.duration})`}</span></div>
        </div>
    </div>);
}