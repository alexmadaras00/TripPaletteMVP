import Autocomplete from "react-google-autocomplete";

export function TravelPreferences({
                                      handleInputChange,
                                      setSelectedDestinations,
                                      selectedDestinations,
                                      setNewFavDest,
                                      setFormData,
                                      formData,
                                      API_KEY,
                                      newFavDest
                                  }) {

    const handleAddDestination = (placeObject) => {
        let words= placeObject.formatted_address.split(" ");
        let destinationName = words[0];
        let destinationCountry = words[1];
        let destinationFlag = '📍';

        if (placeObject && placeObject.name) {
            destinationName = placeObject.name;
            destinationCountry = placeObject.address_components?.find(
                (c) => c.types.includes('country')
            )?.long_name || 'Selected';
            destinationFlag = '🗺️';

        }


        if (destinationName !== '' && selectedDestinations.length < 3) {
            const newDestination = {
                id: Date.now(),
                name: destinationName,
                country: destinationCountry,
                flag: destinationFlag
            };
            console.log("Before adding: ",selectedDestinations);
            setSelectedDestinations((prevDestinations) => {
                console.log(`Adding destination: ${newDestination.name}`);
                return [...prevDestinations, newDestination];

            });

            console.log("After adding it: ",selectedDestinations);
            setNewFavDest('');


        }
    };


    const handleInterestToggle = (interest) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));

    };
    const handleDestinationRemove = (destinationId) => {
        setSelectedDestinations(selectedDestinations.filter((dest) => dest.id !== destinationId))
    };
    const handleDestinationInputChange = (e) => {
        // We only care about the value of the target input element
        setNewFavDest(e.target.value);
        // setNewFavDest(selectedDestinations);
    }



    return (
        <div className="tab-content">
            <h2>Travel Preferences</h2>

            <div className="form-group-profile">
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
                                onChange={handleDestinationInputChange}
                                onPlaceSelected={(place) => {
                                    console.log(place);
                                    console.log(place.formatted_address)
                                    setNewFavDest(place.formatted_address);
                                    console.log(newFavDest);
                                    handleAddDestination(place);
                                }}
                            />
                            <button className="btn-primary-profile"  onClick={handleAddDestination}>Add</button>
                        </div>
                    )}
                </div>
                {selectedDestinations.length === 3 && (
                    <div className="destinations-complete">✅ You've selected your top 3 favorite
                        destinations!</div>
                )}
                <div className="form-grid">
                    <div className="form-group-profile">
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
                    <div className="form-group-profile">
                        <label htmlFor="budget">Typical Budget Range</label>
                        <select id="budget" name="budget" value={formData.budget}
                                onChange={handleInputChange}>
                            <option value="budget">💰 $500-1500 per trip</option>
                            <option value="mid-range">💰💰 $1500-3000 per trip</option>
                            <option value="luxury">💰💰💰 $3000+ per trip</option>
                        </select>
                    </div>
                    <div className="form-group-profile">
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

                <div className="form-group-profile">
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
    )
}