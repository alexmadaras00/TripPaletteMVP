import Autocomplete from "react-google-autocomplete";


export default function Step1({homeLocation, setHomeLocation, travelPace, setTravelPace, getLabel}) {

    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

    return (<div className="form-container">
        <div className="section-title">Where are you traveling from?</div>
        <div className="section-subtitle">
            Enter your home location so we can suggest destinations that are perfect for you
        </div>

        <div className="input-group">
            <label className="input-label">Home Location</label>
            <Autocomplete
                apiKey={API_KEY}
                className="input-field"
                placeholder="City, country, or region"
                inputAutocompleteValue={homeLocation}
                onPlaceSelected={(place) => {
                    setHomeLocation(place.name || place.formatted_address);
                }}
            />
        </div>

        <div className="section-title" style={{marginTop: "1rem"}}>
            Travel Pace
        </div>
        <div className="busyness-container">
            <div className="input-group">
                <label className="input-label">
                    Select your Travel Pace
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={travelPace}
                    onChange={(e) => setTravelPace(Number(e.target.value))}
                    className="input-field"
                    style={{height: "2rem"}}
                />
                <div className="input-group-btn">
                    <span>Relaxing</span>
                    <div className="budget-display">
                        <div>{getLabel(Number(travelPace))} ({travelPace} Pace)</div>
                    </div>
                    <span>Extreme</span>
                </div>
            </div>
        </div>
    </div>);
}