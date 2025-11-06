import NavBar from "../NavBar.jsx";
import "../../styles/destination-recommender.css";
import "../../styles/my-trips.css";
import "../../styles/my-profile.css";
import {useEffect, useState} from "react";
import Autocomplete from "react-google-autocomplete";
import MyTrips from "../my-trips/MyTrips.jsx";
import {TravelPreferences} from "./TravelPreferences.jsx";
import ProfileInfo from "./ProfileInfo.jsx";
import {POPULAR_DESTINATIONS} from "../../constants/constants.js";


export default function MyProfile() {
    const [favoriteDestinations, setFavoriteDestinations] = useState([]);
    const [activeTab, setActiveTab] = useState("personal");
    const [formData, setFormData] = useState({
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1990-05-15",
        nationality: "American",
        passportNumber: "US123456789",
        passportExpiry: "2028-12-31",
        emergencyContact: "John Johnson",
        emergencyPhone: "+1 (555) 987-6543",
        travelStyle: "adventure",
        budget: "mid-range",
        groupType: "solo",
        interests: ["culture", "food", "nature"],
    });
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
    const [newFavDest, setNewFavDest] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Profile updated:", {...formData, favoriteDestinations: selectedDestinations})
        alert("Profile updated successfully!")
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

    };
    const getInitialState = () => {

        const storedDestinations = localStorage.getItem("selectedDestinations");

        if (storedDestinations) {
            try {
                // Return parsed data if found
                const parsed = JSON.parse(storedDestinations);
                return Array.isArray(parsed) ? parsed : POPULAR_DESTINATIONS;
            } catch (e) {
                console.error("Could not parse stored destinations:", e);
                // Fallback on error
                return POPULAR_DESTINATIONS;
            }
        }

        // 2. Fallback to the default list
        return POPULAR_DESTINATIONS;
    };
    // State definitions
    const [selectedDestinations, setSelectedDestinations] = useState(getInitialState);
    useEffect(() => {
        // This effect runs every time selectedDestinations changes

        localStorage.setItem("selectedDestinations", JSON.stringify(selectedDestinations));
    }, [selectedDestinations]);


    return (<>
        <NavBar/>
        <div className="dest-landing-profile">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                        alt="Profile"
                    />
                    <button className="avatar-edit-btn">📷</button>
                </div>
                <div className="profile-info">
                    <h1>Sarah Johnson</h1>
                    <p>✈️ Travel Enthusiast | 🌍 15 Countries Visited</p>
                    <div className="profile-stats">
                        <div className="stat">
                            <span className="stat-number">12</span>
                            <span className="stat-label">Trips Planned</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">8</span>
                            <span className="stat-label">Completed</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">15</span>
                            <span className="stat-label">Countries</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-tabs">
                <button
                    className={`tab ${activeTab === "personal" ? "active" : ""}`}
                    onClick={() => setActiveTab("personal")}
                >
                    👤 Personal Info
                </button>
                <button className={`tab ${activeTab === "travel" ? "active" : ""}`}
                        onClick={() => setActiveTab("travel")}>
                    ✈️ Travel Preferences
                </button>
                {/*<button*/}
                {/*    className={`tab ${activeTab === "security" ? "active" : ""}`}*/}
                {/*    onClick={() => setActiveTab("security")}*/}
                {/*>*/}
                {/*    🔒 Security*/}
                {/*</button>*/}
            </div>
            <form onSubmit={handleSubmit} className="profile-form">
                {activeTab === "personal" && (<ProfileInfo formData={formData} handleInputChange={handleInputChange}/>)}
                {activeTab === "travel" && (
                    <TravelPreferences setSelectedDestinations={setSelectedDestinations} newFavDest={newFavDest}
                                       selectedDestinations={selectedDestinations} API_KEY={API_KEY}
                                       favoriteDestinations={favoriteDestinations} formData={formData}
                                       setFormData={setFormData} handleInputChange={handleInputChange}
                                       setFavoriteDestinations={setFavoriteDestinations}
                                       setNewFavDest={setNewFavDest}/>)}

                {/*{activeTab === "security" && (<div className="tab-content">*/}
                {/*        <h2>Security Settings</h2>*/}
                {/*        <div className="security-section">*/}
                {/*            <h3>Password</h3>*/}
                {/*            <button type="button" className="btn-secondary">*/}
                {/*                Change Password*/}
                {/*            </button>*/}

                {/*            <h3>Two-Factor Authentication</h3>*/}
                {/*            <div className="security-option">*/}
                {/*                <span>Enable 2FA for added security</span>*/}
                {/*                <button type="button" className="btn-secondary">*/}
                {/*                    Enable 2FA*/}
                {/*                </button>*/}
                {/*            </div>*/}

                {/*            <h3>Login Activity</h3>*/}
                {/*            <div className="login-activity">*/}
                {/*                <div className="activity-item">*/}
                {/*                    <span>Last login: Today at 2:30 PM</span>*/}
                {/*                    <span className="activity-location">📍 New York, USA</span>*/}
                {/*                </div>*/}
                {/*                <div className="activity-item">*/}
                {/*                    <span>Previous login: Yesterday at 9:15 AM</span>*/}
                {/*                    <span className="activity-location">📍 New York, USA</span>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <h3>Data & Privacy</h3>*/}
                {/*            <div className="privacy-options">*/}
                {/*                <button type="button" className="btn-secondary">*/}
                {/*                    Download My Data*/}
                {/*                </button>*/}
                {/*                <button type="button" className="btn-danger">*/}
                {/*                    Delete Account*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>)*/}
                {/*}*/}

                <div className="form-actions">
                    <button type="button" className="btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary-profile">
                        Save Changes
                    </button>
                </div>
            </form>

        </div>

    </>)
        ;
}