"use client";

import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RegField from "../components/regFields";

function Register() {
  return (
    <div>
      <Navbar />
      <div className="WBox">
        <div className="WB_Head">
          <div className="WB_Title">
            <img src="/Assets/Back.png" />
            <h1>Create Your VerifID Account</h1>
          </div>
          <div className="WB_Cap">
            <p>Secure your Digital Identity and get Verified today</p>
          </div>
        </div>
        <div className="RegFieldContainer">
          <RegField />
          <RegField />
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

export default Register;
