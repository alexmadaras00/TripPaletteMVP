import App from "../App.jsx";
import tripPalette from "../assets/trip_palette.png"
// import person from "../assets/person.png"
import Profile from "../assets/profile.svg?react";
import "../styles/navbar.css"
import Search from "./Search.jsx";
import {auth} from "../auth/firebase.jsx";
import logout from "../assets/logout.png";
import {useEffect, useState} from "react";

function Navigation() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <nav className="App-header">
            <ul className="list1">
                <li><a href="/"><img src={tripPalette} alt="trip_palette"/></a></li>
                {/*<li><a href="/explore">Explore</a></li>*/}
                <li><a href="/plan">Plan a trip</a></li>
                <li><a href="/profile">My Profile</a></li>
            </ul>
            {/*<ul className="list2">*/}
            {/*    /!*<li><Search/></li>*!/*/}
            {/*    <li className="profile"> {user ? (*/}
            {/*        <img className="logout-image" src={logout} onClick={() => auth.signOut()} alt="logout"/>*/}
            {/*    ) : (*/}
            {/*        <a href="/login"><Profile className="profile-icon"/></a>*/}
            {/*    )}</li>*/}
            {/*</ul>*/}
        </nav>
    );
}

export default Navigation;
