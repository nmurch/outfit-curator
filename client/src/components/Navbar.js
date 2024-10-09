import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutAuth from "./LogoutAuth";
import "../styles/Navbar.css";

const Navbar = ({ user, setUser }) => {
  const [dropdown, setDropdown] = useState(false);

  const { logout } = LogoutAuth();

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  console.log("user", user);

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
                <Link to="/upload" className="nav-links">
                  Upload
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-links">
                  Curate
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-links">
                  View your feed
                </Link>
              </li>
              <li className="nav-item">Welcome, {user.fname}</li>
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
          <p
            className="dropdown-btn"
            onClick={() => setDropdown((prev) => !prev)}
          >
            <i class="fa-solid fa-user"></i>
          </p>
        </ul>
        {dropdown && (
          <div className="dropdown-content">
            <ul>
              <li className="drop-item">
                <Link to="/profile">Profile</Link>
              </li>
              {user && (
                <li className="drop-item">
                  <Link onClick={handleLogout} to="/login">
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;