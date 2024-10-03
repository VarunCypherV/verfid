'use client'

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
          <div className="WB_Cap">
            <p>Secure your Digital Identity and get Verified today</p>
          </div>
        </div>
        <div className="LogFieldContainer">
        <div className="form-group">
        <div className="fg_content">
          <label htmlFor="firstName">
            First Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Ramesh"
            className="input-field"
          />
        </div>
      </div><div className="form-group">
        <div className="fg_content">
          <label htmlFor="firstName">
            First Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Ramesh"
            className="input-field"
          />
        </div>
      </div>
        </div>
        <div className="RegButtons">
          <div className="ButtonLeft">
            <p>Register</p>
          </div>
          <div className="ButtonRight">
            <p>Go to Login</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;