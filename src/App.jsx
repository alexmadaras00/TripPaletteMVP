import './App.css'

import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import {Login} from "./components/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import PlanTrip from "./components/PlanTrip.jsx";
import DestinationRecommendations from "./components/DestinationRecommendations.jsx";
import GoogleForm from "./components/GoogleForm.jsx";
import TripRoutes from "./components/TripRoutes.jsx";
import ScheduleActivities from "./components/ScheduleActivities.jsx";

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
            </Routes>
        </BrowserRouter>);

}

export default App
