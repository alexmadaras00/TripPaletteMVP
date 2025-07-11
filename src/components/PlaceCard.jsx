export default function PlaceCard({place}) {
    return (<div className="card-props">
        <div >
            <div className="card-general-info">
                <h1>{place.flag} {place.city}, {place.country}</h1>
                <p>{place.subtitle}</p>
            </div>
            <div className="card-details">

            </div>
        </div>
        <div className="bottom-container">

        </div>
    </div>)
}