"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Land from "./Land/page";
import Register from "./Register/page";
import Profile from "./Profile/page";
import Login from "./Login/page";

export default function Home() {
  return (
    <div>
      <Land />
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Profile /> */}
    </div>
  );
}
