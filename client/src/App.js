import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import MyBookings from "./components/MyBookings"; // 1. Import the new component

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
            // FIXED: Use relative path to work with the proxy
            const response = await fetch("/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.log("Invalid token or error occurred");
                // If token is bad, log the user out
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogin = async () => {
        try {
            // FIXED: Use relative path
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                fetchUserData(data.token);
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegister = async () => {
        try {
            // FIXED: Use relative path
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                console.log("User registered successfully");
                handleLogin();
            } else {
                console.log("Registration failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <Router>
            <Header user={user} handleLogout={handleLogout} />
            <div className="container mt-4">
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/"
                        element={user ? <Navigate to="/dashboard" /> : <Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} />}
                    />
                    <Route
                        path="/signup"
                        element={user ? <Navigate to="/dashboard" /> : <Signup name={name} email={email} password={password} setName={setName} setEmail={setEmail} setPassword={setPassword} handleRegister={handleRegister} />}
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
                    />
                    {/* 2. Add the new protected route for MyBookings */}
                    <Route
                        path="/my-appointments"
                        element={user ? <MyBookings /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

