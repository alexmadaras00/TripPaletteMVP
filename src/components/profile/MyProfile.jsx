import NavBar from "../NavBar.jsx";
import "../../styles/destination-recommender.css";
import "../../styles/my-trips.css";
import {useState} from "react";
import Autocomplete from "react-google-autocomplete";

export default function MyProfile() {
    const [favoriteDestinations, setFavoriteDestinations] = useState([]);
    const [budgetRange, setBudgetRange] = useState(0);
    const [prefferedTravelStyle, setPrefferedTravelStyle] = useState("Explorer");
    const [activeTab, setActiveTab] = useState("personal");
    const [selectedDestinations, setSelectedDestinations] = useState([{
        id: "1",
        name: "Paris",
        country: "France",
        flag: "🇫🇷"
    }, {id: "2", name: "Tokyo", country: "Japan", flag: "🇯🇵"},]);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
    const [newFavDest, setNewFavDest] = useState([""]);
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
    const POPULAR_DESTINATIONS = [{id: "1", name: "Paris", country: "France", flag: "🇫🇷"}, {
        id: "2",
        name: "Tokyo",
        country: "Japan",
        flag: "🇯🇵"
    }, {id: "3", name: "New York City", country: "USA", flag: "🇺🇸"}, {
        id: "4",
        name: "London",
        country: "United Kingdom",
        flag: "🇬🇧"
    }];
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Profile updated:", {...formData, favoriteDestinations: selectedDestinations})
        alert("Profile updated successfully!")
    }
    const handleDestinationRemove = (id) => {
        selectedDestinations.filter((dest)=>id!==dest.id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleInterestToggle = (interest) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }))
    };

    return (<>
        <NavBar/>
        <div className="dest-landing">
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
                {activeTab === "personal" && (<div className="tab-content">
                    <h2>Personal Information</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality">Nationality</label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/*<h3>Travel Documents</h3>*/}
                    {/*<div className="form-grid">*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="passportNumber">Passport Number</label>*/}
                    {/*        <input*/}
                    {/*            type="text"*/}
                    {/*            id="passportNumber"*/}
                    {/*            name="passportNumber"*/}
                    {/*            value={formData.passportNumber}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="passportExpiry">Passport Expiry</label>*/}
                    {/*        <input*/}
                    {/*            type="date"*/}
                    {/*            id="passportExpiry"*/}
                    {/*            name="passportExpiry"*/}
                    {/*            value={formData.passportExpiry}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<h3>Emergency Contact</h3>*/}
                    {/*<div className="form-grid">*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="emergencyContact">Contact Name</label>*/}
                    {/*        <input*/}
                    {/*            type="text"*/}
                    {/*            id="emergencyContact"*/}
                    {/*            name="emergencyContact"*/}
                    {/*            value={formData.emergencyContact}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label htmlFor="emergencyPhone">Contact Phone</label>*/}
                    {/*        <input*/}
                    {/*            type="tel"*/}
                    {/*            id="emergencyPhone"*/}
                    {/*            name="emergencyPhone"*/}
                    {/*            value={formData.emergencyPhone}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>)}

                {activeTab === "travel" && (<div className="tab-content">
                        <h2>Travel Preferences</h2>

                        <div className="form-group">
                            <label>Top 3 Favorite Destinations</label>
                            <p className="form-help">Select up to 3 destinations you love most or want to visit</p>

                            <div className="selected-destinations">
                                {selectedDestinations.map((dest) => (
                                    <div key={dest.id} className="selected-destination">
                                        <span className="destination-flag">{dest.flag}</span>
                                        <span className="destination-name">{dest.name}</span>
                                        <span className="destination-country">{dest.country}</span>
                                        <button
                                            type="button"
                                            className="remove-destination"
                                            onClick={() => handleDestinationRemove(dest.id)}
                                            title="Remove destination"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}

                                {selectedDestinations.length < 3 && (<div className="destination-search-container">
                                        <Autocomplete
                                            apiKey={API_KEY}
                                            className="input-field"
                                            placeholder="City, country, or region"
                                            inputAutocompleteValue={newFavDest}
                                            onPlaceSelected={(place) => {
                                                setNewFavDest(place);
                                                setFavoriteDestinations([...favoriteDestinations, newFavDest]);
                                            }}
                                        />
                                    </div>
                                )};
                            </div>
                            {selectedDestinations.length === 3 && (
                                <div className="destinations-complete">✅ You've selected your top 3 favorite
                                    destinations!</div>
                            )}
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="travelStyle">Travel Style</label>
                                    <select id="travelStyle" name="travelStyle" value={formData.travelStyle}
                                            onChange={handleInputChange}>
                                        <option value="luxury">🏖️ Luxury</option>
                                        <option value="mid-range">🏨 Mid-range</option>
                                        <option value="budget">🎒 Budget</option>
                                        <option value="adventure">🏔️ Adventure</option>
                                        <option value="cultural">🏛️ Cultural</option>
                                        <option value="relaxation">🧘 Relaxation</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="budget">Typical Budget Range</label>
                                    <select id="budget" name="budget" value={formData.budget}
                                            onChange={handleInputChange}>
                                        <option value="budget">💰 $500-1500 per trip</option>
                                        <option value="mid-range">💰💰 $1500-3000 per trip</option>
                                        <option value="luxury">💰💰💰 $3000+ per trip</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="groupType">Preferred Group Type</label>
                                    <select id="groupType" name="groupType" value={formData.groupType}
                                            onChange={handleInputChange}>
                                        <option value="solo">🚶 Solo Travel</option>
                                        <option value="couple">👫 Couple</option>
                                        <option value="family">👨‍👩‍👧‍👦 Family</option>
                                        <option value="friends">👥 Friends</option>
                                        <option value="group">🚌 Group Tours</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Travel Interests</label>
                                <div className="interests-grid">
                                    {[{id: "culture", label: "🏛️ Culture & History", value: "culture"}, {
                                        id: "food",
                                        label: "🍜 Food & Cuisine",
                                        value: "food"
                                    }, {id: "nature", label: "🌿 Nature & Wildlife", value: "nature"}, {
                                        id: "adventure",
                                        label: "🏔️ Adventure Sports",
                                        value: "adventure"
                                    }, {id: "beaches", label: "🏖️ Beaches & Islands", value: "beaches"}, {
                                        id: "nightlife",
                                        label: "🌃 Nightlife & Entertainment",
                                        value: "nightlife"
                                    }, {id: "shopping", label: "🛍️ Shopping", value: "shopping"}, {
                                        id: "wellness",
                                        label: "🧘 Wellness & Spa",
                                        value: "wellness"
                                    }, {id: "photography", label: "📸 Photography", value: "photography"}, {
                                        id: "festivals",
                                        label: "🎭 Festivals & Events",
                                        value: "festivals"
                                    },].map((interest) => (<label key={interest.id} className="interest-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={formData.interests.includes(interest.value)}
                                            onChange={() => handleInterestToggle(interest.value)}
                                        />
                                        <span className="checkmark"></span>
                                        {interest.label}
                                    </label>))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                    <button type="submit" className="btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>

        </div>
    </>)
        ;
}