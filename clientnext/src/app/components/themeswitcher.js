"use client";
import React, { useState, useEffect } from "react";

function ThemeSwitcher() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Toggle class on root (html) element
    document.documentElement.classList.toggle("dark-theme", !isDarkTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.classList.add("dark-theme");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <div className="theme-switcher" onClick={toggleTheme}>
      <img
        src={isDarkTheme ? "/assets/DarkSwitch.png" : "/assets/LightSwitch.png"}
        alt="Theme Switcher"
        className="theme-icon"
      />
    </div>
  );
}

export default ThemeSwitcher;
