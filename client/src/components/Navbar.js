import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutAuth from "./LogoutAuth";
import axios from "axios";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("http://localhost:5001/", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, [location]);

  const { logout } = LogoutAuth();

  return (
    <div>
      <nav>
        <Link to="/" className="navbar-logo">
          outfit curator
        </Link>
        <ul className="nav-list">
          {user ? (
            <>
              <li className="nav-item">
                <Link to="#" className="nav-links">
                  // page 1
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-links">
                  // page 2
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-links">
                  // page 3
                </Link>
              </li>
              <li className="nav-item">Welcome, {user.fname}</li>
              <li className="nav-item">
                <Link className="btn" onClick={logout} to="/login">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
