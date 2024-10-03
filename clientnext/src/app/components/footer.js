"use client";

import Link from "next/link";
import React from "react";
import Subscribe from "./subscribe";

function Footer() {
  return (
    <div className="Footer">
      <div className="F_Left">
        <img src="/Assets/Logo.jpg" />
        <div>
          <p>VerifID Headquarters</p>
          <p>#27, Taramani Road,</p>
          <p>Saidapet, Chennai - 96</p>
        </div>
        <div>
          <p>Copyright © 2024 All Rights Reserved</p>
        </div>
      </div>

      <div className="F_Middle">
        <div>
          <h3>CONTACT US</h3>

          <p>T: +91 123 456 789</p>
          <p>E: verifID@gmail.com</p>
        </div>
      </div>
      <div className="F_Right">
        <h3>NEWSLETTER</h3>

        <p>Want to keep your digital identity secure and verified?</p>
        <p>Sign up to stay informed and access updates, insights!</p>
        <Subscribe />
      </div>
    </div>
  );
}

export default Footer;
