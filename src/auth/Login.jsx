import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {useEffect, useState} from "react";
import tripPalette from "../assets/trip_palette.png"
import {auth} from "./firebase.jsx";
import "../styles/login.css"
import {Link, useNavigate} from 'react-router-dom';
import ScrollToTop from "../components/ScrollToTop.jsx";


export function Login({mode}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    // const [name, setName] = useState("");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (mode === "signup")
            setPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword, mode]);


    const handleLogin = async (e) => {
        e.preventDefault();
        if (mode === "signup" && password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (mode === "login") {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/home");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        } else {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/home");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
    }


    return (
        <div className="login-page">
            <ScrollToTop/>
            <div className="header">
                <img className="logo" src={tripPalette} alt="logo"/>
                <h1 className="title">{mode === "login" ? 'Welcome Back' : 'Create an Account'}</h1>
                <sub
                    className="subtitle">{mode === "login" ? 'Sign in to continue planning your perfect trips' : 'Join thousands of travelers planning smarter trips with AI'}</sub>
            </div>
            <div className="login-form">
                <form className="form" onSubmit={handleLogin}>
                    {mode === "signup" && (<div className="name-fields">
                        <p className="text-name">First Name</p>
                        <p className="text-name">Last Name</p>
                        <input type="text"
                               className="input-name"
                               placeholder="First Name"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                               required
                        />

                        <input
                            type="text"
                            className="input-name"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required/></div>)}
                    <p className="title-text">E-mail Address</p>
                    <input
                        type="email"
                        className="input-text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-text">
                        <p className={mode === "login" ? 'password-login-text' : 'password-register-text'}>Password</p>
                        {mode === "login" && (
                            <Link className="form-link-password" to="/forgot-password"><p
                                className="title-forgot">Forgot
                                password?</p>
                            </Link>)}
                    </div>

                    <input
                        type="password"
                        placeholder="Password"
                        className="input-text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {mode === "signup" &&
                        <div className="confirm-password">
                            <p className="title-text">Confirm Password</p>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="input-text"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    }
                    {!passwordMatch && (
                        <p style={{color: 'red'}}>Passwords do not match</p>
                    )}
                    {/* Terms and Privacy */}
                    {mode === "signup" && (
                        <div className="form-checkbox-wrapper">
                            <input type="checkbox" id="terms" className="form-checkbox"/>
                            <label htmlFor="terms" className="form-checkbox-label">
                                I agree to the{" "}
                                <Link to="/terms" className="form-link">Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="/privacy" className="form-link">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>)}

                    {/* Marketing Emails */}
                    {mode === "signup" && (<div className="form-checkbox-wrapper-marketing">
                        <input type="checkbox" id="marketing" className="form-checkbox"/>
                        <label htmlFor="marketing" className="form-checkbox-label">
                            Send me travel tips, destination guides, and special offers
                        </label>
                    </div>)}
                    <button type="submit" disabled={!passwordMatch}
                            className="form-button">
                        {mode === "login" ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-switch">
                    <p className="form-link" onClick={() => {
                        if (mode === "login") {
                            navigate("/signup");
                            console.log(window.scrollY);
                            window.scrollTo(0, 0);


                        } else {
                            navigate("/login");

                        }
                        setTimeout(() => window.scrollTo(0, 0), 200);
                    }}>
                        {mode === "login" ? "Don't have an account? Create Account" : "Already have an account? Login"}

                    </p>
                </div>
            </div>

        </div>
    );
}
