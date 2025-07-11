export default function Step3({
                                  budgetValue,
                                  setBudgetValue,
                                  startDate,
                                  setStartDate,
                                  endDate,
                                  setEndDate,
                                  tripDuration,
                                  budgetRange
                              }) {

    return (<div className="form-container">
        <div className="section-title">When and how much?</div>
        <div className="section-subtitle">Let us know your travel dates and budget</div>

        <div className="form-grid">
            <div className="input-group">
                <label className="input-label">Start Date</label>
                <input
                    type="date"
                    className="input-field"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Prevent past dates
                />
            </div>
            <div className="input-group">
                <label className="input-label">End Date</label>
                <input
                    type="date"
                    className="input-field"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]} // End date must be after start date
                />
            </div>
        </div>

        {/* Add validation message */}
        {endDate && startDate && new Date(endDate) <= new Date(startDate) && (
            <div
                style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    textAlign: "center",
                }}
            >
                End date must be after start date
            </div>
        )}

        <div className="input-group">
            <label className="input-label">
                Budget (per person) - {tripDuration} {tripDuration === 1 ? "day" : "days"}
            </label>
            <input
                type="range"
                min={budgetRange.min}
                max={budgetRange.max}
                value={budgetValue}
                onChange={(e) => setBudgetValue(Number.parseInt(e.target.value))}
                className="input-field"
                style={{height: "2rem"}}
            />
            <div
                style={{display: "flex", justifyContent: "space-between", marginTop: "0.5rem"}}>
                <span>Budget (€{budgetRange.dailyMin}/day)</span>
                <div className="budget-display">
                    <div>€{budgetValue} total</div>
                    <div style={{fontSize: "0.75rem", color: "#6b7280"}}>
                        €{Math.round(budgetValue / tripDuration)}/day
                    </div>
                </div>
                <span>Luxury (€{budgetRange.dailyMax}/day)</span>
            </div>
        </div>
    </div>);
}