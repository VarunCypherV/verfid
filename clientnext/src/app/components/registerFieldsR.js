"use client";

import React, { useEffect, useState } from "react";

function RegFieldR({ handleChange, data }) {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(!localStorage.getItem("verifID"));
  }, []);

  return (
    <div className='RF'>
      <div className="form-group">
        <label htmlFor="LastName">
          Last Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="LastName"
          name="LastName"
          placeholder={data?.LastName || "Enter your Last Name"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Password">
          Password <span className="required">*</span>
        </label>
        <input
          type="password"
          id="Password"
          name="Password"
          placeholder={data?.Password || "Enter your Password"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="PermanentAddress">
          Permanent Address <span className="required">*</span>
        </label>
        <input
          type="text"
          id="PermanentAddress"
          name="PermanentAddress"
          placeholder={data?.PermanentAddress || "Enter your Permanent Address"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="EmailId">
          Email ID <span className="required">*</span>
        </label>
        <input
          type="email"
          id="EmailId"
          name="EmailId"
          placeholder={data?.EmailId || "Enter your Email ID"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="GovtIDNumber">
          Govt ID Number <span className="required">*</span>
        </label>
        <input
          type="text"
          id="GovtIDNumber"
          name="GovtIDNumber"
          placeholder={data?.GovtIDNumber || "Enter your Govt ID Number"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default RegFieldR;
