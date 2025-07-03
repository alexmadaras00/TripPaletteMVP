
import React from "react"
import tripPalette from "../assets/trip_palette.png";
import { useState } from "react";
import "../styles/forgot-password.css";

export default function ForgotPassword() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="auth-container">
                <div className="auth-wrapper">
                    <div className="auth-logo-container">
                        <img src={tripPalette} alt="Trip Palette AI" width={200} height={80} className="auth-logo" />
                    </div>

                    <div className="auth-form-container">
                        <div className="success-container">
                            <div className="success-icon">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18a2 2 0 0 1 2 2v10Z"></path>
                                    <path d="m2 9 10 5 10-5"></path>
                                </svg>
                            </div>
                            <h1 className="auth-title">Check Your Email</h1>
                            <p className="auth-subtitle">
                                We've sent a password reset link to your email address. Please check your inbox and follow the
                                instructions to reset your password.
                            </p>
                            <p className="auth-subtitle" style={{ marginTop: "1.5rem" }}>
                                Didn't receive the email? Check your spam folder or{" "}
                                <button onClick={() => setIsSubmitted(false)} className="form-link">
                                    try again
                                </button>
                            </p>
                            <Link
                                to="/login"
                                className="form-button"
                                style={{ marginTop: "1.5rem", display: "inline-block", textDecoration: "none" }}
                            >
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                {/* Logo */}
                <div className="auth-logo-container">
                    <Image src="/logo.png" alt="Trip Palette AI" width={200} height={80} className="auth-logo" />
                    <h1 className="auth-title">Reset Your Password</h1>
                    <p className="auth-subtitle">Enter your email and we'll send you a reset link</p>
                </div>


                <div className="auth-form-container">
                    <form onSubmit={handleSubmit} className="auth-form">
                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input id="email" type="email" placeholder="john@example.com" required className="form-input" />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="form-button">
                            Send Reset Link
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="auth-switch">
                        <Link to="/login" className="back-link">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m12 19-7-7 7-7"></path>
                                <path d="M19 12H5"></path>
                            </svg>
                            Back to Sign In
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="auth-footer">
                    <p>
                        Having trouble?{" "}
                        <Link to="/contact" className="form-link">
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
