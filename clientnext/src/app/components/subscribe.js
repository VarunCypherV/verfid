"use client";

import React from "react";

function Subscribe() {
  return (
    <div className="sub-container">
      <div className="input-section">
        <input
          type="email"
          placeholder="Email address"
          className="email-input"
        />
      </div>
      <div className="button-section">
        <button className="subscribe-button">Subscribe</button>
      </div>
    </div>
  );
}

export default Subscribe;
