import "../../styles/destination-recommender.css";


export default function TripStatCard({name,value,image}) {
    let color = "#000000";
    switch (name){
        case "Upcoming": color = "#3b82f6"; break;
        case "Completed": color = "#10b981"; break;
        case "Countries": color = "#8b5cf6"; break;
        default: color = "#000000";
    }
    return (
        <div className="card-props">
            <div className="image-props">{image}</div>
            <h1 className="value-props" style={{color: color}} >{value}</h1>
            <h1 className="name-props" >{name}</h1>
        </div>
    );
}