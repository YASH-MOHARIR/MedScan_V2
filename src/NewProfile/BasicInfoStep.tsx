import React, { ChangeEvent } from "react";
import { PatientRecordType } from "../HomeSections/ProfileDataType";

interface BasicInfoStepProps {
  patientData: PatientRecordType;
  handleGeneralChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleCommaSeparated: (e: ChangeEvent<HTMLInputElement>, field: string) => void;
  errors?: { [key: string]: string };
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  patientData,
  handleGeneralChange,
  errors = {},
}) => {
  return (
    <div className="basic-info-form">
      <h4>Basic Information</h4>
      <div className="mb-3">
        <label>ID*</label>
        <input type="text" className="form-control" name="id" value={patientData.pid} disabled />
      </div>
      <div className="mb-3  ">
        <label>Name*</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={patientData.name}
          onChange={handleGeneralChange}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
      <div className="inline-inputs-wrapper">
        <div className="mb-3  ">
          <label>Age*</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={patientData.age}
            onChange={handleGeneralChange}
          />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div>
        <div className="mb-3">
          <label>Date of Birth*</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={patientData.dateOfBirth}
            onChange={handleGeneralChange}
          />
          {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
        </div>
      </div>
      
      <div className="inline-input-wrapper row">
        <div className="mb-3 col">
          <label>Gender*</label>
          <select className="form-select" name="gender" value={patientData.gender} onChange={handleGeneralChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>
        <div className="mb-3 col">
          <label>Blood Type*</label>
          <input
            type="text"
            className="form-control"
            name="bloodType"
            value={patientData.bloodType}
            onChange={handleGeneralChange}
          />
          {errors.bloodType && <div className="text-danger">{errors.bloodType}</div>}
        </div>
      </div>

      <h4>Contact Information</h4>
      <div className="inline-inputs-wrapper">
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="contactInfo.phone"
            value={patientData.contactInfo.phone}
            onChange={handleGeneralChange}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="contactInfo.email"
            value={patientData.contactInfo.email}
            onChange={handleGeneralChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label>Address</label>
        <textarea
          className="form-control"
          name="contactInfo.address"
          value={patientData.contactInfo.address}
          onChange={handleGeneralChange}
        />
      </div>

    </div>
  );
};

export default BasicInfoStep;
