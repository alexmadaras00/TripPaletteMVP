import {travelGroups} from "../../../constants/constants.js";

export default function Step2({ selectedTravelGroup, setSelectedTravelGroup, adults, setAdults,children,setChildren}) {

    const optionsAdults = () => {
        if (selectedTravelGroup === "Solo") {

            return [<option key="1">1</option>];
        }
        if (selectedTravelGroup === "Couple") {

            return [<option key="2">2</option>];
        }
        const options = [];
        options.push(<option key="2">2</option>);
        options.push(<option key="3">3</option>);
        options.push(<option key="4">4+</option>);
        return options;
    };
    const optionsChildren = () => {
        const options = [<option key="0">0</option>];
        if (selectedTravelGroup !== "Solo" && selectedTravelGroup !== "Couple") {
            options.push(<option key="1">1</option>);
            options.push(<option key="2">2</option>);
            options.push(<option key="3">3+</option>);
        }
        return options;
    };
    const handleAdultsChange = (e) => {
        const value = e.target.value;
        // Convertim valoarea la număr întreg înainte de a o salva în stare
        // Folosim parseInt sau Number. Daca valoarea este "5+", va salva 5.
        const numericValue = parseInt(value, 10) || 0;
        setAdults(numericValue);
    };

    const handleChildrenChange = (e) => {
        const value = e.target.value;
        const numericValue = parseInt(value, 10) || 0;
        setChildren(numericValue);
    };

    console.log("Number of people: ", adults+children)
    return (<div className="form-container">
        <div className="section-title">Who's traveling?</div>
        <div className="section-subtitle">Tell us about your travel group</div>

        <div className="section-title" style={{fontSize: "1rem", marginBottom: "1rem"}}>
            Travel Group
        </div>
        <div className="grid-4">
            {travelGroups.map((group) => (
                <div
                    key={group.id}
                    className={`card ${selectedTravelGroup === group.id ? "selected" : ""}`}
                    onClick={() => setSelectedTravelGroup(group.id)}
                >
                    <div className="card-content" style={{textAlign: "center"}}>
                        <div style={{fontSize: "2rem", marginBottom: "1rem"}}>{group.icon}</div>
                        <div className="card-title">{group.title}</div>
                    </div>
                </div>
            ))}
        </div>

        <div className="form-grid" style={{marginTop: "2rem"}}>
            <div className="input-group">
                <label className="input-label">Adults</label>
                <select className="input-field select-field" onChange={e=> handleAdultsChange(e)} value={adults}>
                    {optionsAdults()}
                </select>
            </div>
            <div className="input-group">
                <label className="input-label">Children</label>
                <select className="input-field select-field" onChange={e=> handleChildrenChange(e)} value={children}>
                    {optionsChildren()}
                </select>
            </div>
        </div>
    </div>);
}