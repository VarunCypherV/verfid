"use client";

import React from "react";
const HeroSection = ({ id }) => {
  return (
    <section id={id}>
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
              We provide two-way trust between gig workers and employers.
              <br />
              To help enable a more secure future.
            </p>
          </div>
          <div className="HeroButtons">
            <button className="primary">
              <p>About Us</p>
            </button>
            <button
              className="secondary"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              <p>Get Started</p>
            </button>
          </div>
        </div>
        <div className="HeroImage">
          <img src="/assets/Hero Image.png" />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
