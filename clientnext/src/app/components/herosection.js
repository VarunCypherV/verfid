"use client";

import React from "react";
function HeroSection() {
  return (
    <div className="HeroSection">
      <div className="HeroHeader">
        <h1>
          Building
          <span className="TrustTextPrimary"> Trust</span>
          , One <br />
          Verified Identity at a Time
        </h1>
        <div className="HeroText">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor <br />
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="HeroButtons">
          <button className="primary">
            <p>About Us</p>
          </button>
          <button className="secondary">
            <p>Get Started</p>
          </button>
        </div>
      </div>
      <div className="HeroImage">
        <img src="/Assets/heroimage.svg" />
      </div>
    </div>
  );
}
export default HeroSection;
