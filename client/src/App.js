import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Upload from "./components/pages/Upload";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("http://localhost:5001/", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, [location]);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/upload"
          element={<ProtectedRoute user={user} element={<Upload />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute user={user} element={<Profile />} />}
        />
      </Routes>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}