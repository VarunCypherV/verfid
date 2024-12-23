
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RegField from "../components/regFields";
import RegFieldR from "../components/regFieldsR";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";


// Initialize personal state
const initialPersonal = {
  FirstName: "Please Login",
  LastName: "Please Login",
  year: "Please Login",
  verifId: "Please Login",
  issueDate: "Please Login",
  email: "Please Login",
  phoneNumber: "Please Login",
  gender: "Please Login",
  govtIDType: "Please Login",
  govtIDNumber: "Please Login",
  permanentAddress: "Please Login",
  dateOfBirth: "Please Login",
};

function Profile() {
  const [personal, setPersonal] = useState(initialPersonal); // Use state for personal data
  const [UserData, setUserData] = useState([]);
  const [username, setUsername] = useState("Please Login"); // Separate state for username
  const [isUpdated, setIsUpdated] = useState(false); // Track whether data is updated
  const router = useRouter();
const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(!localStorage.getItem("verifID"));
  }, []);
  
  useEffect(() => {
    // Function to fetch user data from localStorage
    const fetchUserData = () => {
      const verifId = localStorage.getItem("verifID");
      const verifIdIssue = localStorage.getItem("verifIDIssueDate");
      if (verifId) {
        const registeredUsers = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];
        const currentUser = registeredUsers.find(user => user.verifID === verifId);

        if (currentUser) {
          const userData = {
            FirstName: currentUser.FirstName,
            LastName: currentUser.LastName,
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
          };

          setPersonal(userData);
          setUsername(`${currentUser.FirstName} ${currentUser.LastName}`); // Set initial username when data is fetched
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
    };

    fetchUserData(); // Fetch user data on initial load

    // Re-fetch user data whenever `isUpdated` is true (after profile update)
    if (isUpdated) {
      fetchUserData();
      setIsUpdated(false); // Reset the update flag after re-fetching
    }
  }, [isUpdated]); // Dependency on `isUpdated`

  // Handle field changes and update the `personal` state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBackClick = () => {
        router.push("/Land"); // Replace with your desired path
      };

  const handleUpdateProfile = () => {
    // Get all registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];
    const verifId = localStorage.getItem("verifID");

    // Find the user and update their data
    const updatedUsers = registeredUsers.map(user =>
      user.verifID === verifId
        ? {
            ...user,
            FirstName: personal.FirstName,
            LastName: personal.LastName,
            EmailId: personal.EmailId,
            PhoneNumber: personal.PhoneNumber,
            Gender: personal.Gender,
            GovtIDType: personal.GovtIDType,
            GovtIDNumber: personal.GovtIDNumber,
            PermanentAddress: personal.PermanentAddress,
            DateOfBirth: personal.DateOfBirth,
          }
        : user
    );
    if (!updatedUsers.FirstName || !/^[a-zA-Z\s]+$/.test(updatedUsers.FirstName)) {
      alert('Invalid First Name! It should contain only letters.');
      return;
    }
    
    // Last Name: Required, should be non-empty and alphabetic
    if (!updatedUsers.LastName || !/^[a-zA-Z\s]+$/.test(updatedUsers.LastName)) {
      alert('Invalid Last Name! It should contain only letters.');
      return;
    }
    
    // Gender: Required, should be non-empty and match specific values (e.g., Male, Female, Other)
    if (!updatedUsers.Gender || !/^(Male|Female|Other)$/i.test(updatedUsers.Gender)) {
      alert('Invalid Gender! Please enter Male, Female, or Other.');
      return;
    }
    
    // Date of Birth: Required, format YYYY-MM-DD, and should be a valid date
    if (!updatedUsers.DateOfBirth || !/^\d{4}-\d{2}-\d{2}$/.test(updatedUsers.DateOfBirth)) {
      alert('Invalid Date of Birth! Please use the format YYYY-MM-DD.');
      return;
    }
    
    // Phone Number: Required, should be exactly 10 digits
    if (!updatedUsers.PhoneNumber || updatedUsers.PhoneNumber.length !== 10 || !/^\d{10}$/.test(updatedUsers.PhoneNumber)) {
      alert('Invalid Phone Number! It should be exactly 10 digits.');
      return;
    }
    
    // Govt ID Type: Required, should be non-empty (e.g., Aadhar, Passport, etc.)
    if (!updatedUsers.GovtIDType || !/^[a-zA-Z\s]+$/.test(updatedUsers.GovtIDType)) {
      alert('Invalid Govt ID Type! It should contain only letters.');
      return;
    }
    
    // Password: Required, minimum length of 8 characters
    if (!updatedUsers.Password || updatedUsers.Password.length < 8) {
      alert('Invalid Password! It should be at least 8 characters long.');
      return;
    }
    
    // Permanent Address: Required, should be non-empty
    if (!updatedUsers.PermanentAddress || updatedUsers.PermanentAddress.length < 5) {
      alert('Invalid Permanent Address! Please enter a valid address.');
      return;
    }
    
    // Email ID: Required, should be in valid email format
    if (!updatedUsers.EmailId || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(updatedUsers.EmailId)) {
      alert('Invalid Email ID! Please enter a valid email address.');
      return;
    }
    // Save updated users back to localStorage
    localStorage.setItem("RegisteredUsers", JSON.stringify(updatedUsers));

    // Update the username only after clicking update
    setUsername(`${personal.FirstName} ${personal.LastName}`);

    // Trigger re-render by setting `isUpdated` to true
    setIsUpdated(true);

    alert("Profile updated successfully!");
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
      const issueResponse = await fetch("https://verfid.vercel.app/issue-credential", {
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
      const storeResponse = await fetch("https://verfid.vercel.app/store-credential", {
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
    fetch("https://verfid.vercel.app/verify-all-credentials", {
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
    fetch("https://verfid.vercel.app/revoke-credential", {
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
              src="/assets/Back.png"
              className="back"
              onClick={() => router.push("/Land")}
            />
            <img src="/assets/User.png" className="user" />
          </div>
          <div className="PFP_Name">
            <p>{username}</p>{" "}
            <img src="/assets/Verified.png" className="bluetick" />
          </div>
          <p>{personal.VerifId}</p>
        </div>

        <div className="RegFieldContainer">
          <RegField data={personal} handleChange={handleChange} />
          <RegFieldR data={personal} handleChange={handleChange} />
        </div>

        <div className={`RegButtons ${isDisabled ? "disabled" : ""}`}>
          <button className="secondary" onClick={handleUpdateProfile}>
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
                  <img src="/assets/Expand_down.png" />
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
      <Footer id="contact-us" />
    </div>
  );
}

export default Profile;
