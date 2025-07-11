import React from 'react';
import '../styles/home.css';
import {Link} from 'react-router-dom';

export default function HomePage() {
    return (<div className="landing-container">
        <div className="landing-content">
            {/* Badge */}
            <div className="landing-badge">AI-Powered Travel Planning</div>

            {/* Main Title */}
            <h1 className="landing-title">
                Your <span className="landing-title-highlight">Perfect Trip</span>, Planned by AI
            </h1>

            {/* Subtitle */}
            <p className="landing-subtitle">
                Trip Palette AI creates personalized travel experiences based on your unique preferences, budget, and
                travel
                style.
            </p>

            {/* Action Buttons */}
            <div className="landing-buttons">
                <Link to="/plan" className="landing-button-primary">
                    Start Planning
                    <svg className="arrow-icon" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </Link>
                <Link to="/form" className="landing-button-secondary">
                    Explore Destinations
                </Link>
            </div>

            {/* Social Proof */}
            <div className="landing-social-proof">
                <div className="landing-avatars">
                    <div className="landing-avatar landing-avatar-1">JD</div>
                    <div className="landing-avatar landing-avatar-2">KL</div>
                    <div className="landing-avatar landing-avatar-3">MR</div>
                </div>
                <p className="landing-social-text">Join 10,000+ travelers planning smarter trips</p>
            </div>
        </div>
    </div>)
}