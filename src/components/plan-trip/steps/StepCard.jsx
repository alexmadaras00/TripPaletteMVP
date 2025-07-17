export default function StepCard({step,currentStep}) {
    return ( <div
        key={step.number}
        className={`stat-card ${currentStep === step.number ? "selected" : ""}`}
        style={{
            borderColor: currentStep === step.number ? "#ff6b35" : "transparent",
        }}
    >
        <div
            className="stat-number"
            style={{
                backgroundColor: currentStep >= step.number ? "#ff6b35" : "#e5e7eb",
                color: currentStep >= step.number ? "white" : "#6b7280",
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.25rem",
            }}
        >
            {step.number}
        </div>
        <div className="stat-label" style={{fontWeight: "600", marginBottom: "0.5rem"}}>
            {step.title}
        </div>
        <div className="stat-label">{step.description}</div>
    </div>);
}