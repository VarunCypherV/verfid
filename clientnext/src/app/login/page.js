"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  
  // State to hold the input values
  const [verifID, setVerifID] = useState("");
  const [password, setPassword] = useState("");

  const handleRegClick = () => {
    router.push("/Register"); // Navigate to the registration page
  };

  const handleLogin = () => {
    // Retrieve registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];

    // Find a user that matches the entered verifID and password
    const user = registeredUsers.find(user => user.verifID === verifID && user.Password === password);

    if (user) {
      // If a matching user is found, store verifID and verifIDIssueDate in localStorage
      localStorage.setItem("verifID", user.verifID);
      localStorage.setItem("verifIDIssueDate", user.verifIDIssueDate);
      
      // Redirect to the profile page (replace with the actual path)
      router.push("/Profile");
    } else {
      // Optionally, handle the case where no matching user is found
      alert("Invalid VerifID or password. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="WBox">
        <div className="WB_Head">
          <div className="WB_Title">
            <img src="/Assets/Back.png" alt="Back" />
            <h1>Welcome Back to VerifID</h1>
          </div>
          <p>Log in to stay connected and secure with VerifID</p>
        </div>
        <div className="LogFieldContainer">
          <div className="form-group">
            <label htmlFor="verifID">
              VerifID <span className="required">*</span>
            </label>
            <input
              type="text"
              id="verifID"
              name="verifID"
              placeholder="Enter your VerifID"
              className="input-field"
              value={verifID}
              onChange={(e) => setVerifID(e.target.value)} // Update state on change
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
          </div>
        </div>
        <div className="RegButtons">
          <button className="secondary" onClick={handleLogin}>
            <p>Login</p>
          </button>
          <button className="dotted" onClick={handleRegClick}>
            <p>Go to Register</p>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
