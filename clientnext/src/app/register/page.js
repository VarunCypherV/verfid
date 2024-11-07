"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RegisterField from "../components/registerFields";
import RegisterFieldR from "../components/registerFieldsR";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const handleBackClick = () => {
        router.push("/Land"); // Replace with your desired path
  };
  // State to hold the form data
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    DateOfBirth: "",
    PhoneNumber: "",
    GovtIDType: "",
    Password: "",
    PermanentAddress: "",
    EmailId: "",
    GovtIDNumber: "",
    verifID: "",           // For storing generated VerifID
    verifIDIssueDate: "",  // For storing the date issued
  });

  const handleLogClick = () => {
    router.push("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const generateVerifID = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // Generates an 8-digit random number
  };
  

  const handleRegister = () => {
    const verifID = generateVerifID();
    const verifIDIssueDate = new Date().toISOString().split("T")[0];
    const newUser = {
      ...formData,
      verifID,
      verifIDIssueDate,
    };
    const registeredUsers = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];
    registeredUsers.push(newUser);
    localStorage.setItem("RegisteredUsers", JSON.stringify(registeredUsers));

    alert("Registration successful! Verif ID :" + newUser.verifID);
    router.push("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="WBox">
        <div className="WB_Head">
          <div className="WB_Title">
            <img
              src="/assets/Back.png"
              onClick={handleBackClick}
              className="back1"
            />
            <h1>Create Your VerifID Account</h1>
          </div>
          <p>Secure your Digital Identity and get Verified today</p>
        </div>
        <div className="RegFieldContainer">
          <RegisterField handleChange={handleChange} />
          <RegisterFieldR handleChange={handleChange} />
        </div>
        <div className="RegButtons">
          <button className="secondary" onClick={handleRegister}>
            <p>Register</p>
          </button>
          <button className="dotted" onClick={handleLogClick}>
            <p>Go to Login</p>
          </button>
        </div>
      </div>
      <Footer id="contact-us" />
    </div>
  );
}

export default Register;
