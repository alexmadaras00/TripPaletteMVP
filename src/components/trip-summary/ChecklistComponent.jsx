export default function ChecklistComponent({ beforeYouGo, duringYourTrip, destination }) {
    return (
        <div>
            <h2>Your Travel Checklist for {destination}</h2>
            <div>
                <h3>📋 Before You Go</h3>
                {beforeYouGo.map((item, index) => (
                    <div key={index}>
                        <input type="checkbox" checked={item.isDone} readOnly />
                        <span>{item.task}</span>
                    </div>
                ))}
            </div>
            <div>
                <h3>🎒 During Your Trip</h3>
                {duringYourTrip.map((item, index) => (
                    <div key={index}>
                        <input type="checkbox" checked={item.isDone} readOnly />
                        <span>{item.task}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}