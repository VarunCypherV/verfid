"use client";

import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Login() {
  return (
    <div>
      <Navbar />
      <div className="WBox">
        <div className="WB_Head">
          <div className="WB_Title">
            <img src="/Assets/Back.png" />
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
            />
          </div>
        </div>
        <div className="RegButtons">
          <button className="secondary">
            <p>Login</p>
          </button>
          <button className="dotted">
            <p>Register</p>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
