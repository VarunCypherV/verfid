"use client";

import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="Nav">
      <div className="Left">
        <img src="/Assets/Logo.jpg"/>
      </div>
      <div className="Right">
        <div>
            <img src="/Assets/LightSwitch.png"/>
        </div>
        <Link href="/goals" className="nav-link">Goals</Link>
        <Link href="/goals" className="nav-link">Workflow</Link>
        <Link href="/goals" className="nav-link">Contact Us</Link>
        <Link href="/goals" className="nav-link">Your Identity</Link>
        <Link href="" className="ProfileImg">
            <img  src="/Assets/Profile.png"/>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
