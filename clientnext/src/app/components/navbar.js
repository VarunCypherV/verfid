"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import ThemeSwitcher from "../components/themeswitcher";

function Navbar() {
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
    <div className="Nav">
      <div className="Left">
        <img
          src={isDarkTheme ? "/assets/darklogo.png" : "/assets/lightlogo.png"}
        />
      </div>
      <div className="Right">
        <ThemeSwitcher />
        <Link href="#goals" className="nav-link">
          Goals
        </Link>
        <Link href="#workflow"  className="nav-link">
          Workflow
        </Link>
        <Link href="#footer" className="nav-link">
          Contact Us
        </Link>
        <Link href="/Login" className="nav-link">
          Login
        </Link>
        <Link href="/Profile" className="ProfileImg">
          <img
          src={isDarkTheme ? "/assets/darkprofile.png" : "/assets/lightprofile.png"}
        />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
