"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import ThemeSwitcher from "../components/themeswitcher";

const smoothScrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    window.location.href = "/#" + id;
  }
};

function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="Nav">
      <div className="Left">
        <img
          src={isDarkTheme ? "/assets/darklogo.png" : "/assets/lightlogo.png"}
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
      <div className={`Right ${isMenuOpen ? "open" : ""}`}>
        <ThemeSwitcher />
        <a
          href="#goals"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("goals");
          }}
        >
          Goals
        </a>
        <a
          href="#workflow"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("workflow");
          }}
        >
          Workflow
        </a>
        <a
          href="#contact-us"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("contact-us");
          }}
        >
          Contact Us
        </a>
        <Link href="/login" className="nav-link">
          Login
        </Link>
        <Link href="/profile" className="ProfileImg">
          <img
            src={
              isDarkTheme
                ? "/assets/darkprofile.png"
                : "/assets/lightprofile.png"
            }
          />
        </Link>
      </div>

      <div className="Hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {isMenuOpen && (
        <div className="MobileMenu">
          <ThemeSwitcher />
          <a
            href="#goals"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              smoothScrollTo("goals");
            }}
          >
            Goals
          </a>
          <a
            href="#workflow"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              smoothScrollTo("workflow");
            }}
          >
            Workflow
          </a>
          <a
            href="#contact-us"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              smoothScrollTo("contact-us");
            }}
          >
            Contact Us
          </a>
          <Link href="/login" className="nav-link">
            Login
          </Link>
          <Link href="/profile" className="ProfileImg">
            <img
              src={
                isDarkTheme
                  ? "/assets/darkprofile.png"
                  : "/assets/lightprofile.png"
              }
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
