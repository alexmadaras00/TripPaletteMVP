export default function BookingLink(props) {
    const bookingLink = props.bookingLink;
    return (<a
        key={props.key}
        href={bookingLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="booking-link-card"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f9fafb"
            e.target.style.borderColor = "#ff6b35"
        }}
        onMouseLeave={(e) => {
            e.target.style.backgroundColor = "white"
            e.target.style.borderColor = "#e5e7eb"
        }}
    >
        <div className="link-dot"></div>
        <div className="link-container">
            <div className="link-name">{bookingLink.name}</div>
            <div className="link-description">{bookingLink.description}</div>
        </div>
    </a>);
}