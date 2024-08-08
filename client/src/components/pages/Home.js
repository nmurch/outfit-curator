import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutAuth from "../LogoutAuth";
import axios from "axios";

function Home() {
  const [user, setUser] = useState(null);

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
  }, []);

  const { logout } = LogoutAuth();

  return <div>{user ? <User user={user} logout={logout} /> : <Guest />}</div>;
}

function User({ user, logout }) {
  return (
    <div>
      <h1>Welcome, {user.fname} </h1>
      <Link onClick={logout} to="/login">
        Log out
      </Link>
    </div>
  );
}

function Guest() {
  return (
    <div>
      <h1>Welcome, Guest</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
