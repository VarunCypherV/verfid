"use client";
import React from "react";

function AboutUsSection() {
  return (
    <div className="about-us-section">
      <h1>About Us</h1>
      <div className="card-grid">
        <div className="card large blue">
          <h3>EMPOWER YOUR IDENTITY WITH DECENTRALIZED VERIFICATION</h3>
          <u>Secure and User-controlled</u>
        </div>
        <div className="card small blue-light">
          <h3>YOUR DATA, YOUR CONTROL</h3>
          <p>Store and share tamper-proof credentials with ease</p>
        </div>
        <div className="card small">
          <img src="/Assets/card-image.png" />
        </div>
        <div className="card medium blue-lighter">
          <h3>KEEP DOCUMENTS SAFE WITH ADVANCED ENCRYPTION.</h3>
        </div>
        <div className="card medium green">
          <h3>TRUSTED BY PROFESSIONALS WORLDWIDE</h3>
          <u>Leave a review</u>
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;
