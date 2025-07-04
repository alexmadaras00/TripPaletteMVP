import Autocomplete from "react-google-autocomplete";

export default function Step1({homeLocation,setHomeLocation, selectedTravelStyle,setSelectedTravelStyle}) {
    const API_KEY =  import.meta.env.VITE_GOOGLE_MAPS_KEY;

    return (  <div className="form-container">
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
                onPlaceSelected={(place) => {setHomeLocation(place.name || place.formatted_address);}}
            />
        </div>

        <div className="section-title" style={{marginTop: "2rem"}}>
            Travel Style
        </div>
        <div className="grid-3">
            {[
                {
                    id: "Relaxer",
                    icon: "🏖️",
                    title: "Relaxer",
                    description: "Beaches, spas, resorts"
                },
                {
                    id: "Explorer",
                    icon: "🏛️",
                    title: "Explorer",
                    description: "Sightseeing, culture, history"
                },
                {
                    id: "Adventurer",
                    icon: "🏔️",
                    title: "Adventurer",
                    description: "Hiking, sports, thrills"
                },
            ].map((style) => (
                <div
                    key={style.id}
                    className={`card ${selectedTravelStyle === style.id ? "selected" : ""}`}
                    onClick={() => setSelectedTravelStyle(style.id)}
                >
                    <div className="card-content" style={{textAlign: "center"}}>
                        <div style={{fontSize: "2rem", marginBottom: "1rem"}}>{style.icon}</div>
                        <div className="card-title">{style.title}</div>
                        <div className="card-description">{style.description}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>);
}