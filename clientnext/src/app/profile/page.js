

import React, { useState } from "react"; // Import useState
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RegField from "../components/regFields";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

// User data stored in JSON format
const personal = {
  name: "Rajesh Kumar",
  year: "2021 BCSE 1000",
};

const initialUserData = [
  {
    verifiedId: "121431234",
    issueDate: "12/10/20",
    credential: "-",
    credIssueDate: "-",
    employer: "-",
    localID: "-",
    status: "Create New With Action",
  },
  {
    verifiedId: "121431234",
    issueDate: "12/10/20",
    credential: "123423423",
    credIssueDate: "12/10/23",
    employer: "ding dong",
    localID: "-",
    status: "Created",
  },
  {
    verifiedId: "121431234",
    issueDate: "12/10/20",
    credential: "12342313213423",
    credIssueDate: "12/1123210/23",
    employer: "ding dong",
    localID: "-",
    status: "Created",
  }
];

function Profile() {
  const [UserData, setUserData] = useState(initialUserData); // Use state for UserData

  const handleCreateCred = async () => {
    const workerDid = "yourWorkerDid"; // You can replace this with actual DID
    // Get job details from user input using prompts
    const jobTitle = prompt("Enter Job Title:");
    const completionDate = prompt("Enter Completion Date (YYYY-MM-DD):");
    const description = prompt("Enter Job Description:");

    const jobDetails = {
      jobTitle: jobTitle,
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

      console.log("Credential Issued:", credential);

      // Generate a random 5-digit Local ID
      const localId = Math.floor(10000 + Math.random() * 90000).toString();

      // Store the issued credential in local storage as an array of objects
      let issuedCredentials = JSON.parse(localStorage.getItem("issuedCredentials")) || [];
      issuedCredentials.push({ localId, credential });
      localStorage.setItem("issuedCredentials", JSON.stringify(issuedCredentials));

      // Add the new credential to the top of the UserData array
      const newUser = {
        verifiedId: localStorage.getItem("DID") || "1231123",
        issueDate: localStorage.getItem("DID_Date") || "8/10/24",
        credential: credential,
        credIssueDate: new Date().toLocaleDateString(),
        employer: "newEmployer",
        localID: localId,  // Associate the Local ID
        status: "Created",
      };

      // Add the new user data to the top of the array
      setUserData((prevData) => [...prevData.slice(0, 1), newUser, ...prevData.slice(1)]); // Update state to re-render
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
    const issuedCredentials = JSON.parse(localStorage.getItem("issuedCredentials")) || [];
    
    // Filter the credentials by localID
    const credentialsToVerify = issuedCredentials
        .filter(item => item.localId === localID)
        .map(item => item.credential);

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
    .then(response => response.json())
    .then(data => {
        console.log("Verification Results:", data.results);

        // Find the index of the credential being verified
        const index = UserData.findIndex(user => user.localID === localID);
        
        // If the credential is valid, update its status to "VERIFIED"
        if (data.results[0].valid === true) {
            alert("Verification Successful");

            // Update the UserData state with the new status
            setUserData(prevData => {
                // Create a new array to hold the updated data
                const newData = [...prevData];
                newData[index] = { ...newData[index], status: "VERIFIED" }; // Update status
                
                // Move verified credentials down
                const verified = newData.filter(user => user.status === "VERIFIED");
                const unverified = newData.filter(user => user.status !== "VERIFIED");

                // Return the reordered array
                return [...unverified, ...verified];
            });
        } else {
            alert("Verification Failed");
        }
    })
    .catch(error => {
        console.error("Error verifying credentials:", error);
    });
};

//   const handleVerifyCred = (localID) => {
//     // Retrieve issued credentials from localStorage
//     const issuedCredentials = JSON.parse(localStorage.getItem("issuedCredentials")) || [];
    
//     // Filter the credentials by localID
//     const credentialsToVerify = issuedCredentials
//         .filter(item => item.localId === localID)
//         .map(item => item.credential);

//     if (credentialsToVerify.length === 0) {
//         console.log("No credentials found for the selected Local ID.");
//         return;
//     }

//     // Hit the verify-all-credentials API
//     fetch("http://localhost:3001/verify-all-credentials", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ credentials: credentialsToVerify }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Verification Results:", data.results);

//         // Find the index of the credential being verified
//         const index = UserData.findIndex(user => user.localID === localID);
        
//         // If the credential is valid, update its status to "VERIFIED"
//         if (data.results[0].valid === true) {
//             alert("Verification Successful");

//             // Update the UserData state with the new status
//             setUserData(prevData => {
//                 const newData = [...prevData];
//                 newData[index] = { ...newData[index], status: "VERIFIED" }; // Update status
//                 return newData; // Return updated array
//             });
//         } else {
//             alert("Verification Failed");
//         }
//     })
//     .catch(error => {
//         console.error("Error verifying credentials:", error);
//     });
// };


  // Action handler for dropdown
  const handleAction = (key, localID) => {
    switch (key) {
      case "create":
        handleCreateCred();
        break;
      case "verify":
        handleVerifyCred(localID);  // Pass localID when verifying
        break;
      default:
        console.log("Unknown action");
    }
  };

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
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
            <p>{personal.name}</p>
            <img src="/Assets/verified.png" className="bluetick" />
          </div>
          <p>{personal.year}</p>
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

      {UserData.map((user, index) => (
        <div className="PFP_Block" key={index}>
          <div className="PFPB_Left">
            <p>
              Verified: <span>{user.verifiedId}</span>
            </p>
            <p>
              Date of Issue: <span>{user.issueDate || "-"}</span>
            </p>
            <p>
              Employer: <span>{user.employer || "-"}</span>
            </p>
          </div>
          <div className="PFPB_Right">
            <p>
              LocalID: <span>{user.localID || "-"}</span>
            </p>
            <p>
              Credential: <span>{truncateString(user.credential || "Create With Action", 45)}</span>
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
                  user.status === "Create New With Action" ? ["verify"] : ["create"]
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

            <div className="PFPB_Revoke">
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
