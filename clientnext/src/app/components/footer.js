"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Subscribe from "./subscribe";

function Footer() {
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
    <div className="Footer">
      <div className="F_Left">
        <img
          src={isDarkTheme ? "/assets/darklogo.png" : "/assets/lightlogo.png"}
        />
        <p>VerifID Headquarters</p>
        <p>#27, Taramani Road,</p>
        <p>Saidapet, Chennai - 96</p>
        <p className="bottom">Copyright © 2024 All Rights Reserved</p>
      </div>

      <div className="F_Middle">
        <h3 className="top">CONTACT US</h3>

        <p>T: +91 123 456 789</p>
        <p>E: verifID@gmail.com</p>
      </div>
      <div className="F_Right">
        <h3 className="top">NEWSLETTER</h3>

        <p>Want to keep your digital identity secure and verified?</p>
        <p>Sign up to stay informed and access updates, insights!</p>
        <Subscribe />
      </div>
    </div>
  );
}

export default Footer;
