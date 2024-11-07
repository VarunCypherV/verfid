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
    if (!formData.FirstName || !/^[a-zA-Z\s]+$/.test(formData.FirstName)) {
      alert('Invalid First Name! It should contain only letters.');
      return;
    }
  
    // Last Name: Required, should be non-empty and alphabetic
    if (!formData.LastName || !/^[a-zA-Z\s]+$/.test(formData.LastName)) {
      alert('Invalid Last Name! It should contain only letters.');
      return;
    }
  
    // Gender: Required, should be non-empty and match specific values (e.g., Male, Female, Other)
    if (!formData.Gender || !/^(Male|Female|Other)$/i.test(formData.Gender)) {
      alert('Invalid Gender! Please enter Male, Female, or Other.');
      return;
    }
  
    // Date of Birth: Required, format YYYY-MM-DD, and should be a valid date
    if (!formData.DateOfBirth || !/^\d{4}-\d{2}-\d{2}$/.test(formData.DateOfBirth)) {
      alert('Invalid Date of Birth! Please use the format YYYY-MM-DD.');
      return;
    }
  
    // Phone Number: Required, should be exactly 10 digits
    const phone = formData.PhoneNumber;
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      alert('Invalid Phone Number! It should be exactly 10 digits.');
      return;
    }
  
    // Govt ID Type: Required, should be non-empty (e.g., Aadhar, Passport, etc.)
    if (!formData.GovtIDType || !/^[a-zA-Z\s]+$/.test(formData.GovtIDType)) {
      alert('Invalid Govt ID Type! It should contain only letters.');
      return;
    }
  
    // Password: Required, minimum length of 8 characters
    if (!formData.Password || formData.Password.length < 8) {
      alert('Invalid Password! It should be at least 8 characters long.');
      return;
    }
  
    // Permanent Address: Required, should be non-empty
    if (!formData.PermanentAddress || formData.PermanentAddress.length < 5) {
      alert('Invalid Permanent Address! Please enter a valid address.');
      return;
    }
  
    // Email ID: Required, should be in valid email format
    const email = formData.EmailId;
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert('Invalid Email ID! Please enter a valid email address.');
      return;
    }
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
