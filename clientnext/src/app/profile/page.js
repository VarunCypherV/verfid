"use client";

import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RegField from "../components/regFields";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";


const UserData = [];


function Profile() {
  // Define the functions for each action
  const handleNewFile = () => {
    console.log("New file created");
    // Add your logic here
  };

  const handleCopyLink = () => {
    console.log("Link copied");
    // Add your logic here
  };

  const handleEditFile = () => {
    console.log("File edited");
    // Add your logic here
  };

  const handleDeleteFile = () => {
    console.log("File deleted");
    // Add your logic here
  };

  // Action handler for dropdown
  const handleAction = (key) => {
    switch (key) {
      case "new":
        handleNewFile();
        break;
      case "copy":
        handleCopyLink();
        break;
      case "edit":
        handleEditFile();
        break;
      case "delete":
        handleDeleteFile();
        break;
      default:
        console.log("Unknown action");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="WBox">
        <div className="WB_Head">
          <div className="PFP_Title">
            <img src="/Assets/Back.png" className="back" />
            <img src="/Assets/user.png" className="user" />
          </div>
          <div className="PFP_Name">
            <p>RAJESH KUMAR</p>
            <img src="/Assets/verified.png" className="bluetick" />
          </div>
          <p>2021 BCSE 1000</p>
        </div>
        <div className="RegFieldContainer">
          <RegField />
          <RegField />
        </div>
        <div className="RegButtons">
          <button className="secondary">
            <p>Update Profile</p>
          </button>
        </div>
      </div>
      <div className="PFP_Block">
        <div className="PFPB_Left">
          <p>
            Verifd: <span>121431234</span>
          </p>
          <p>
            Date of Issue: <span>12/10/20</span>
          </p>
          <p>
            Blockchain Type: <span>eht</span>
          </p>
          <p>
            Bockchainid: <span>1231412</span>
          </p>
        </div>
        <div className="PFPB_Right">
          <p>
            Verifd: <span>121431234</span>
          </p>
          <p>
            Date of Issue: <span>12/10/20</span>
          </p>
          <p>
            Blockchain Type: <span>eht</span>
          </p>
          <p>
            Bockchainid: <span>1231412</span>
          </p>
        </div>
        <div className="PFPB_Button">
          <Dropdown>
            <DropdownTrigger>
              <div className="PFPB_Action">
                <p>Actions</p>
                <img src="/Assets/Expand_down.png" />
              </div>
            </DropdownTrigger>
            <DropdownMenu className="customDropdown" aria-label="Static Actions" onAction={handleAction}>
              <DropdownItem className="customDropdownItem" key="new">New file</DropdownItem>
              <DropdownItem className="customDropdownItem" key="copy">Copy link</DropdownItem>
              <DropdownItem className="customDropdownItem" key="edit">Edit file</DropdownItem>
              <DropdownItem  key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <div className="PFPB_Revoke">
            <p>REVOKE</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
