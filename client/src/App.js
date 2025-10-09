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

// Define your base API URL in one place
const API_URL = "http://localhost:5000";

const App = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            // **FIXED**: Changed endpoint to a more appropriate one like /me or /profile
            // Note: You will need to create this route on your server.
            // For now, this is a placeholder. A GET to /register is not standard.
            const response = await fetch(`${API_URL}/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.log("Invalid token or error fetching user data");
                localStorage.removeItem("token"); // Clear bad token
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    const handleLogin = async () => {
        try {
            // **FIXED**: URL now points to the local server
            const response = await fetch(
                `${API_URL}/api/users/login`,
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
                localStorage.setItem("token", token);
                // After login, you would typically fetch user data
                // For now, let's assume login returns the user object or redirect.
                // This will depend on your backend implementation.
                window.location.href = "/dashboard"; // Simple redirect
            } else {
                const errorData = await response.json();
                console.log("Login failed:", errorData.message);
            }
        } catch (error) {
            console.log("Login error:", error);
        }
    };

    const handleRegister = async () => {
        try {
            // **FIXED**: URL now points to the local server
            const response = await fetch(
                `${API_URL}/api/users/register`,
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
                const errorData = await response.json();
                console.log("Registration failed:", errorData.message);
            }
        } catch (error) {
            console.log("Registration error:", error);
        }
    };

    const handleLogout = () => {
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
