import App from "../App.jsx";
import tripPalette from "../assets/trip_palette.png"
// import person from "../assets/person.png"
import profile from "../assets/profile.svg"
import "./navbar.css"
import Search from "./Search.jsx";


function NavBar() {
    return (
        <nav className="App-header">
            <ul className="list1">
                <li><img src={tripPalette} alt="trip_palette"/></li>
                <li><a href="/explore">Explore</a></li>
                <li><a href="/plan">Plan a trip</a></li>
                <li><a href="/profile">My Profile</a></li>
            </ul>
            <ul className="list2">
                <li><Search/></li>
                <li><img src={profile} alt="person" id="profile"/></li>
            </ul>
        </nav>
    );
}

export default NavBar;
