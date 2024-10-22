"use client";

import React from "react";

function RegField({ handleChange, data }) {
  return (
    <div className="RF">
      <div className="form-group">
        <label htmlFor="FirstName">
          First Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="FirstName"
          name="FirstName"
          placeholder={data?.FirstName? data.FirstName : "Enter your First Name"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Gender">
          Gender <span className="required">*</span>
        </label>
        <input
          type="text"
          id="Gender"
          name="Gender"
          placeholder={data?.Gender?data.Gender : "Enter your gender"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="DateOfBirth">
          Date of Birth <span className="required">*</span>
        </label>
        <input
          type="text"
          id="DateOfBirth"
          name="DateOfBirth"
          placeholder={data?.DateOfBirth?data.DateOfBirth : "Enter your Date of Birth"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="PhoneNumber">
          Phone Number <span className="required">*</span>
        </label>
        <input
          type="text"
          id="PhoneNumber"
          name="PhoneNumber"
          placeholder={data?.PhoneNumber? data.PhoneNumber: "Enter your Phone Number"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="GovtIDType">
          Govt ID Type <span className="required">*</span>
        </label>
        <input
          type="text"
          id="GovtIDType"
          name="GovtIDType"
          placeholder={data?.GovtIDType? data.GovtIDType: "Enter your Govt ID Type"}
          className="input-field"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default RegField;
