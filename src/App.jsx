import './App.css'
import NavBar from "./components/Navigation.jsx";
import Navigation from "./components/Navigation.jsx";
import HomePage from "./components/HomePage.jsx";
import {Login} from "./components/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";
import ForgotPasswordForm from "./components/ForgotPassword.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import PlanTrip from "./components/PlanTrip.jsx";
import DestinationRecommendations from "./components/DestinationRecommendation.jsx";
import {ErrorBoundary} from "next/dist/client/components/error-boundary.js";

function App() {

    return (
        <BrowserRouter>

            <ScrollToTop/>
            <Routes>
                <Route path="/home" element={
                    <div className="App">
                        <div id="header" className="navigation-bar">
                            <Navigation/>
                        </div>
                        <div id="content" className="container">
                            <HomePage/>
                        </div>
                    </div>
                }/>
                <Route path="/" element={
                    <div className="App">
                        <div id="header" className="navigation-bar">
                            <Navigation/>
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
                <Route path="/destination-recommendations" element={<DestinationRecommendations/>}/>

            </Routes>
        </BrowserRouter>);
}

export default App
