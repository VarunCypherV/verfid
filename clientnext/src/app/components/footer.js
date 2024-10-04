"use client";

import Link from "next/link";
import React from "react";
import Subscribe from "./subscribe";

function Footer() {
  return (
    <div className="Footer">
      <div className="F_Left">
        <img className="top" src="/Assets/Logo.jpg" />
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
