import './App.css'

import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import {Login} from "./auth/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";
import PlanTrip from "./components/plan-trip/PlanTrip.jsx";
import DestinationRecommendations from "./components/destination-recommendations/DestinationRecommendations.jsx";
import GoogleForm from "./components/GoogleForm.jsx";
import TripRoutes from "./components/trip-routes/TripRoutes.jsx";
import ScheduleActivities from "./components/schedule-activities/ScheduleActivities.jsx";
import TripSummary from "./components/trip-summary/TripSummary.jsx";
import MyTrips from "./components/my-trips/MyTrips.jsx";
import MyProfile from "./components/profile/MyProfile.jsx";

function App() {

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/home" element={
                    <div className="App">
                        <div id="header" className="navigation-bar">
                            <NavBar />
                        </div>
                        <div id="content" className="container">
                            <HomePage />
                        </div>
                    </div>
                }/>

                <Route path="/" element={
                    <div className="App">
                        <div id="header" className="navigation-bar">
                            <NavBar/>
                        </div>
                        <div id="content" className="container">
                            <HomePage/>
                        </div>
                    </div>
                }/>
                <Route path="/login" element={<Login mode="login"/>}/>
                <Route path="/signup" element={<Login mode="signup"/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/plan" element={<PlanTrip/>}/>
                <Route path="/destination-recommendations" element={<DestinationRecommendations />}/>
                <Route path="/form" element={<GoogleForm />}/>
                <Route path="/trip-routes" element={<TripRoutes />}/>
                <Route path="/schedule" element={<ScheduleActivities />}/>
                <Route path="/trip-summary" element={<TripSummary />}/>
                <Route path="/my-trips" element={<MyTrips />}/>
                <Route path="/my-profile" element={<MyProfile />}/>
            </Routes>
        </BrowserRouter>);

}

export default App
