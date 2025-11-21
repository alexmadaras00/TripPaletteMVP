import "../../constants/colors.js";
import {COLORS} from "../../constants/colors.js";
import {useNavigate} from "react-router-dom";


export default function PlaceCard({place, selectedPlace, setSelectedPlace, preferences}) {

    const navigate = useNavigate();
    const navigateToRoutes = () => {
        const updatedPreferences  = {...preferences,destination: place};
        localStorage.setItem("tripData",JSON.stringify(updatedPreferences));
        navigate("/trip-routes");
    }
    return (<div className={`card-place${place.id === selectedPlace ? "-selected" : ""}`} onClick={() => {
        setSelectedPlace(place.id);
    }}>
        <div className="card-upper-container">
            <div className="card-general-info">
                <img className="image-place" src={place.image} alt={place.name}/>
                <div className="card-info">
                    <h1 className="text-name">{place.flag} {place.city}, {place.country}</h1>
                    <p className="text-price">€{place.price}</p>
                </div>
                <p className="subtitle-place">{place.subtitle}</p>
                <span className="match">{place.matchScore}% match</span>
            </div>
            <div className="card-details">
                <h1 className="text-match">🎯 Why This Destination?</h1>
                <p className="text-why">{place.whyMatch}</p>
                <ul className="list-highlights">
                    {place.highlights.map((item, index) => (
                        <li key={index}><span style={{color: COLORS.primary}}>✓ </span>{item}</li>
                    ))}
                </ul>
                <h1 className="text-prop">✈️ Flight Time</h1>
                <p className="text-val">{place.flightTime}</p>
                <h1 className="text-prop">🌤️ Climate</h1>
                <p className="text-val">{place.climate}</p>
                <h1 className="text-prop">💱 Currency</h1>
                <p className="text-val">{place.currency}</p>
                <h1 className="text-prop">🗣️ Language</h1>
                <p className="text-val">{place.language}</p>

            </div>
        </div>
        <div className="bottom-container" hidden={selectedPlace!== place.id}>
                <div className="text-bottom">
                    <h1 className="selected-dest"><span style={{color: COLORS.primary}}>✓ </span>Selected Destination</h1>
                    <p className="text-prop">This destination matches {place.matchScore}% of your preferences</p>
                </div>
                <button className="btn btn-primary-plan" onClick={() => {navigateToRoutes()}}>Explore Routes in {place.city}</button>
        </div>
    </div>)
}