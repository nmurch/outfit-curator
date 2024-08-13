import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [errors, setErrors] = useState({});

  async function submit(e) {
    e.preventDefault();

    setErrors({});

    const payload = {
      fname,
      lname,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Registration Error:", error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  }

  return (
    <div className="register-container">
      <form className="standard-form" onSubmit={submit}>
        <h1>Register</h1>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          value={fname}
          onChange={(e) => setFName(e.target.value)}
          name="fname"
          id="fname"
        />
        <div className="error">{errors.fname}</div>
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          value={lname}
          onChange={(e) => setLName(e.target.value)}
          name="lname"
          id="lname"
        />
        <div className="error">{errors.lname}</div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
        <div className="error">{errors.email}</div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
        <div className="error">{errors.password}</div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
