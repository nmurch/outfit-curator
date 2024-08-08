import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [error, setError] = useState({});

  async function submit(e) {
    e.preventDefault();

    setError({});

    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      console.log(response.status);

      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setError(err.response.data.errors);
      } else {
        console.log(err.response.data.errors);
      }
      
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={submit}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
        <div className="error">{error.password}</div>
        <button type="submit">Log in</button>
      </form>

      <p>OR</p>

      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
