import {travelInterests} from "../constants/constants.js";


export default function Step4({selectedInterests, setSelectedInterests}) {
    const handleInterestToggle = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest)); // keeps the interests that are not equal to the current ones after clicking
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    }
    return (<div className="form-container">
        <div className="section-title">What are your interests?</div>
        <div className="section-subtitle">Help us personalize your trip recommendations</div>

        <div className="grid-3">
            {travelInterests.map((interest) => (
                <div
                    key={interest.id}
                    className={`card ${selectedInterests.includes(interest.id) ? "selected" : ""}`}
                    onClick={() => handleInterestToggle(interest.id)}
                >
                    <div className="card-content" style={{textAlign: "center"}}>
                        <div style={{
                            fontSize: "2rem",
                            marginBottom: "1rem"
                        }}>{interest.icon}</div>
                        <div className="card-title">{interest.title}</div>
                        <div className="card-description">{interest.description}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>);
}