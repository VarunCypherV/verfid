"use client";

import React, { useState, useEffect } from "react";

function ProductGoalsSection() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkTheme(true);
    }
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkModeActive =
            document.documentElement.classList.contains("dark-theme");
          setIsDarkTheme(isDarkModeActive);
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
    });
    return () => observer.disconnect(); // Cleanup observer when the component unmounts
  }, []);

  return (
    <div class="product-goals-section">
      <div class="goal-card left">
        <h1>
          <u>PRODUCT GOALS</u>
        </h1>
        <img
          src={
            isDarkTheme
              ? "/Assets/Product-mandark.png"
              : "/Assets/Product-manlight.png"
          }
        />
        <p>
          &#34;At the heart of our service is a deep commitment to honesty,
          integrity, and the people we serve&#34;
        </p>
      </div>
      <div class="goal-col">
        <div class="goal-card">
          <h3>Securing The Identities of Individuals in Commerce</h3>
          <p>
            Establish a robust digital identity verification system to protect
            economy workers from identity theft and fraud, ensuring secure and
            verifiable identities for freelancers and contract workers.
          </p>
        </div>
        <img src="/Assets/Product-handshake.png" class="goal-image" />
      </div>
      <div class="goal-col">
        <img src="/Assets/Product-globe.png" class="goal-image" />

        <div class="goal-card">
          <h3>Empowering Trust and Economic Opportunity</h3>
          <p>
            Create a trusted digital identity ecosystem that enables people to
            put more trust on the independent economic workers increasing their
            economic status.
          </p>
        </div>
      </div>
    </div>
  );
}
export default ProductGoalsSection;
