import App from "../App.jsx";
import tripPalette from "../assets/trip_palette.png"
// import person from "../assets/person.png"
import Profile from "../assets/profile.svg?react";
import "../styles/navbar.css"
import {useEffect, useState} from "react";
import {auth} from "../auth/firebase.jsx";
// import Search from "./Search.jsx";
// import {auth} from "../auth/firebase.jsx";
import "../styles/trip-routes.css";
import "../styles/plan-trip.css";
import "../styles/schedule.css";
// import {useEffect, useState} from "react";

function NavBar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);
    const accountPage = user ? "/profile" : "/login";

    return (
        <nav className="App-header">
            <ul className="list1">
                <div className="sublist">
                    <li><a href="/"><img src={tripPalette} alt="trip_palette"/></a></li>
                    {/*<li><a href="/explore">Explore</a></li>*/}
                    <li className="nav-item"><a href="/plan">✈️ Plan a Trip</a></li>
                    <li className="nav-item"><a href="/my-trips">📋 My Trips</a></li>
                    <li className="nav-item"><a href={accountPage}>👤 Account</a></li>
                </div>
                <div className="sublist">
                    <li> {user ? (
                       <a href="/home" onClick={() => auth.signOut()}>🚪 Log out</a>
                    ) : (
                        <a href="/login"><div className="btn btn-primary-navbar">🔐 Login</div></a>
                    )}</li>

                </div>
            </ul>

        </nav>
    );
}

export default NavBar;
