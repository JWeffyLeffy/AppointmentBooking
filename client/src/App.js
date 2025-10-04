import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Link,
    Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

const App = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        // Check if a user token is stored in local storage
        const token = localStorage.getItem("token");

        if (token) {
            // Fetch user data using the stored token
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            // Fetch the user's data from the backend using the provided token
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                // Handle invalid token or error
                console.log("Invalid token or error occurred");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogin = async () => {
        try {
            // Make a POST request to the backend with the email and password
            // to log in the user
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                // Store the token in localStorage
                localStorage.setItem("token", token);

                // Fetch user data and set the user in state
                fetchUserData(token);
            } else {
                // Handle login error
                console.log("Login failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegister = async () => {
        try {
            // Make a POST request to the backend with the name, email, and password
            // to register a new user
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                }
            );

            if (response.ok) {
                console.log("User registered successfully");
                // Automatically log in the user after registration
                handleLogin();
            } else {
                // Handle registration error
                console.log("Registration failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        // Clear the token from localStorage and reset the user state
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <div>
            <Router>
            <Header user={user} handleLogout={handleLogout} />
                <div className="container">
                    <h1>Appointment Booking App</h1>
                    <Routes>
                        <Route path="/" element={<Outlet />}>
                            <Route
                                path="/"
                                element={
                                    user ? (
                                        <Navigate
                                            to="/dashboard"
                                            replace={true}
                                        />
                                    ) : (
                                        <Login
                                            email={email}
                                            password={password}
                                            setEmail={setEmail}
                                            setPassword={setPassword}
                                            handleLogin={handleLogin}
                                        />
                                    )
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    user ? (
                                        <Navigate
                                            to="/dashboard"
                                            replace={true}
                                        />
                                    ) : (
                                        <Signup
                                            name={name}
                                            email={email}
                                            password={password}
                                            setName={setName}
                                            setEmail={setEmail}
                                            setPassword={setPassword}
                                            handleRegister={handleRegister}
                                        />
                                    )
                                }
                            />
                        </Route>
                        <Route
                            path="/dashboard"
                            element={
                                user ? (
                                    <Dashboard
                                        user={user}
                                        handleLogout={handleLogout}
                                    />
                                ) : (
                                    <Navigate to="/" replace={true} />
                                )
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
