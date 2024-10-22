"use client";
import React, { useState, useEffect } from "react"; // Import useEffect
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RegField from "../components/regFields";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import RegFieldR from "../components/regFieldsR";

// Initialize personal state
const initialPersonal = {
  name: "Loading...", // Temporary loading state
  year: "",
  verifId: "",
  issueDate: "",
  email: "",
  phoneNumber: "",
  gender: "",
  govtIDType: "",
  govtIDNumber: "",
  permanentAddress: "",
  dateOfBirth: "",
};

function Profile() {
  const [UserData, setUserData] = useState([]); // Use state for UserData
  const [personal, setPersonal] = useState(initialPersonal); // Use state for personal data
  const router = useRouter();

  useEffect(() => {
    // Get verifId from localStorage
    const verifId = localStorage.getItem("verifID");
    const verifIdIssue = localStorage.getItem("verifIDIssueDate");
    // Check if verifId exists
    if (verifId) {
      // Retrieve registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];

      // Find the user with the matching verifId
      const currentUser = registeredUsers.find(user => user.verifID === verifId);
      
      // If user found, set the personal state
      if (currentUser) {
        setPersonal({
          FirstName: `${currentUser.FirstName} `,
          LastName : `${currentUser.LastName}`, // Combine FirstName and LastName
          Year: currentUser.year,
          VerifId: currentUser.verifID,
          IssueDate: currentUser.verifIDIssueDate,
          EmailId: currentUser.EmailId,
          PhoneNumber: currentUser.PhoneNumber,
          Gender: currentUser.Gender,
          GovtIDType: currentUser.GovtIDType,
          GovtIDNumber: currentUser.GovtIDNumber,
          PermanentAddress: currentUser.PermanentAddress,
          DateOfBirth: currentUser.DateOfBirth,
          Password: "***********"
        });

        // Set initial user data for the profile
        const initialUserData = [
          {
            verifId: currentUser.verifID,
            issueDate: currentUser.verifIDIssueDate,
            credential: "-",
            credIssueDate: "-",
            employer: "-",
            localID: "-",
            status: "Create New With Action",
          },
        ];
        setUserData(initialUserData);
      }
    }
  }, []); // Run only once on component mount

  const handleBackClick = () => {
    router.push("/Land"); // Replace with your desired path
  };

  const handleCreateCred = async () => {
    const workerDid = personal.VerifId; // Use the current user's verifId
    // Get job details from user input using prompts
    const jobTitle = prompt("Enter Job Title:");
    const completionDate = prompt("Enter Completion Date (YYYY-MM-DD):");
    const description = prompt("Enter Job Description:");
    const employer = prompt("Enter Employer");
    const jobDetails = {
      jobTitle: jobTitle,
      employer: employer,
      completionDate: completionDate,
      description: description,
    };

    try {
      // Hit the issue-credential API
      const issueResponse = await fetch("http://localhost:3001/issue-credential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workerDid, jobDetails }),
      });

      const issueData = await issueResponse.json();
      const { credential } = issueData;

      // Generate a random 5-digit Local ID
      const localId = Math.floor(10000 + Math.random() * 90000).toString();

      // Store the issued credential in local storage as an array of objects
      let issuedCredentials = JSON.parse(localStorage.getItem("issuedCredentials")) || [];
      issuedCredentials.push({ localId, credential });
      localStorage.setItem("issuedCredentials", JSON.stringify(issuedCredentials));

      // Add the new credential to the top of the UserData array
      const newUser = {
        verifiedId: localStorage.getItem("DID"),
        issueDate: localStorage.getItem("DID_Date"),
        credential: credential,
        credIssueDate: new Date().toLocaleDateString(),
        employer: employer,
        jobTitle: jobTitle,
        localID: localId, // Associate the Local ID
        status: "Created",
      };

      // Add the new user data to the top of the array
      setUserData((prevData) => [
        ...prevData.slice(0, 1),
        newUser,
        ...prevData.slice(1),
      ]); // Update state to re-render
      alert("Successfully Check Immediately Below");

      // Hit the store-credential API
      const storeResponse = await fetch("http://localhost:3001/store-credential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      });

      const storeData = await storeResponse.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerifyCred = (localID) => {
    // Retrieve issued credentials from localStorage
    const employerPublicKey = ["as13423gh42gh412uie127123325", "as13423gh42gh412uie127123324", "as13423gh42gh412uie127123324"]; // Replace with your actual employer secrets
    const userSecret = prompt("Enter employer publicKey:");
    if (!employerPublicKey .includes(userSecret)) {
      alert("Invalid employer PublicKey. Verification failed.");
      return;
    }

    
    
    const issuedCredentials = JSON.parse(localStorage.getItem("issuedCredentials")) || [];

    // Filter the credentials by localID
    const credentialsToVerify = issuedCredentials
      .filter((item) => item.localId === localID)
      .map((item) => item.credential);
    console.log(credentialsToVerify);
    if (credentialsToVerify.length === 0) {
      console.log("No credentials found for the selected Local ID.");
      return;
    }

    // Hit the verify-all-credentials API
    fetch("http://localhost:3001/verify-all-credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credentials: credentialsToVerify }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Find the index of the credential being verified
        const index = UserData.findIndex((user) => user.localID === localID);
        // If the credential is valid, update its status to "VERIFIED"
        if (data.results[0].valid === true) {
          alert("Verification Successful");

          // Update the UserData state with the new status
          setUserData((prevData) => {
            // Create a new array to hold the updated data
            const newData = [...prevData];
            newData[index] = { ...newData[index], status: "VERIFIED" }; // Update status

            // Move verified credentials down
            const verified = newData.filter((user) => user.status === "VERIFIED");
            const unverified = newData.filter((user) => user.status !== "VERIFIED");

            // Return the reordered array
            return [...unverified, ...verified];
          });
        } else {
          alert("Verification Failed");
        }
      })
      .catch((error) => {
        console.error("Error verifying credentials:", error);
      });
  };

  // Action handler for dropdown
  const handleAction = (key, localID) => {
    switch (key) {
      case "create":
        handleCreateCred();
        break;
      case "verify":
        handleVerifyCred(localID); // Pass localID when verifying
        break;
      default:
        console.log("Unknown action");
    }
  };

  const truncateString = (str, x) => {
    if (str.length > 2 * x) {
      return str.slice(0, x) + "..." + str.slice(-x);
    }
    return str;
  };

  const handleRevoke = (localID) => {
    // Retrieve issued credentials from localStorage
    const issuedCredentials = JSON.parse(localStorage.getItem("issuedCredentials")) || [];

    // Find the credential associated with the localID
    const credentialToRevoke = issuedCredentials.find(
      (item) => item.localId === localID
    );

    if (!credentialToRevoke) {
      console.log("No credential found for the selected Local ID.");
      return;
    }

    // Hit the revoke-credential API
    fetch("http://localhost:3001/revoke-credential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: credentialToRevoke.credential }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.revoked) {
          alert("Credential revoked successfully");

          // Update UserData state by removing the revoked credential
          setUserData((prevData) =>
            prevData.filter((user) => user.localID !== localID)
          );

          // Remove the revoked credential from localStorage
          const updatedIssuedCredentials = issuedCredentials.filter(
            (item) => item.localId !== localID
          );
          localStorage.setItem(
            "issuedCredentials",
            JSON.stringify(updatedIssuedCredentials)
          );
        } else {
          alert("Revocation failed: " + (data.error || "Unknown error"));
        }
      })
      .catch((error) => {
        console.error("Error revoking credential:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="WBox">
        <div className="WB_Head">
          <div className="PFP_Title">
            <img
              src="/Assets/Back.png"
              className="back"
              onClick={handleBackClick}
            />
            <img src="/Assets/user.png" className="user" />
          </div>
          <div className="PFP_Name">
            <p>{personal.FirstName + " " + personal.LastName}</p>
            <img src="/Assets/verified.png" className="bluetick" />
          </div>
          <p>{personal.VerifId}</p>
        </div>
        <div className="RegFieldContainer">
          <RegField  data={personal} />
          <RegFieldR data={personal} />
          
        </div>
        <div className="RegButtons">
          <button className="secondary">
            <p>Update Profile</p>
          </button>
        </div>
      </div>

      {UserData.map((user, index) => (
        <div className="PFP_Block" key={index}>
          <div className="PFPB_Left">
            <p>
              VerifID: <span>{personal.VerifId}</span>
            </p>
            <p>
              VerifID Issue: <span>{personal.IssueDate || "-"}</span>
            </p>
            <p>
              Employer: <span>{user.employer || "-"}</span>
            </p>
            <p>
              Job Title: <span>{user.jobTitle || "-"}</span>
            </p>
          </div>
          <div className="PFPB_Right">
            <p>
              LocalID: <span>{user.localID || "-"}</span>
            </p>
            <p>
              Credential:{" "}
              <span>
                {truncateString(user.credential || "Create With Action", 15)}
              </span>
            </p>
            <p>
              Date of Issue: <span>{user.credIssueDate || "-"}</span>
            </p>
            <p>
              Status: <span>{user.status}</span>
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
              <DropdownMenu
                className="customDropdown"
                aria-label="Static Actions"
                onAction={(key) => handleAction(key, user.localID)} // Pass localID to action handler
                disabledKeys={
                  !personal.VerifId
                    ? ["verify", "create"]
                    : user.status === "Create New With Action"
                    ? ["verify"]
                    : ["create"]
                }
              >
                <DropdownItem className="customDropdownItem" key="create">
                  Create Gig Credential
                </DropdownItem>
                <DropdownItem className="customDropdownItem" key="verify">
                  Verify Gig Credential VC
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <div
              className={`PFPB_Revoke ${
                user.status === "VERIFIED" ? "disabled" : ""
              }`}
              onClick={() => handleRevoke(user.localID)}
            >
              <p>REVOKE</p>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Profile;
