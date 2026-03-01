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
    <div className="basic-info-form" role="group" aria-label="Basic patient information">
      <h4>Basic Information</h4>
      <div className="mb-3">
        <label htmlFor="field-id">ID*</label>
        <input type="text" className="form-control" id="field-id" name="id" value={patientData.pid} disabled />
      </div>
      <div className="mb-3  ">
        <label htmlFor="field-name">Name*</label>
        <input
          type="text"
          className="form-control"
          id="field-name"
          name="name"
          value={patientData.name}
          onChange={handleGeneralChange}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && <div className="text-danger" id="name-error" role="alert">{errors.name}</div>}
      </div>
      <div className="inline-inputs-wrapper">
        <div className="mb-3  ">
          <label htmlFor="field-age">Age*</label>
          <input
            type="number"
            className="form-control"
            id="field-age"
            name="age"
            value={patientData.age}
            onChange={handleGeneralChange}
            aria-describedby={errors.age ? "age-error" : undefined}
            aria-invalid={!!errors.age}
          />
          {errors.age && <div className="text-danger" id="age-error" role="alert">{errors.age}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="field-dob">Date of Birth*</label>
          <input
            type="date"
            className="form-control"
            id="field-dob"
            name="dateOfBirth"
            value={patientData.dateOfBirth}
            onChange={handleGeneralChange}
            aria-describedby={errors.dateOfBirth ? "dob-error" : undefined}
            aria-invalid={!!errors.dateOfBirth}
          />
          {errors.dateOfBirth && <div className="text-danger" id="dob-error" role="alert">{errors.dateOfBirth}</div>}
        </div>
      </div>

      <div className="inline-input-wrapper row">
        <div className="mb-3 col">
          <label htmlFor="field-gender">Gender*</label>
          <select className="form-select" id="field-gender" name="gender" value={patientData.gender} onChange={handleGeneralChange}
            aria-describedby={errors.gender ? "gender-error" : undefined}
            aria-invalid={!!errors.gender}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="text-danger" id="gender-error" role="alert">{errors.gender}</div>}
        </div>
        <div className="mb-3 col">
          <label htmlFor="field-bloodType">Blood Type*</label>
          <input
            type="text"
            className="form-control"
            id="field-bloodType"
            name="bloodType"
            value={patientData.bloodType}
            onChange={handleGeneralChange}
            aria-describedby={errors.bloodType ? "bloodType-error" : undefined}
            aria-invalid={!!errors.bloodType}
          />
          {errors.bloodType && <div className="text-danger" id="bloodType-error" role="alert">{errors.bloodType}</div>}
        </div>
      </div>

      <h4>Contact Information</h4>
      <div className="inline-inputs-wrapper">
        <div className="mb-3">
          <label htmlFor="field-phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="field-phone"
            name="contactInfo.phone"
            value={patientData.contactInfo.phone}
            onChange={handleGeneralChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="field-email">Email</label>
          <input
            type="email"
            className="form-control"
            id="field-email"
            name="contactInfo.email"
            value={patientData.contactInfo.email}
            onChange={handleGeneralChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="field-address">Address</label>
        <textarea
          className="form-control"
          id="field-address"
          name="contactInfo.address"
          value={patientData.contactInfo.address}
          onChange={handleGeneralChange}
        />
      </div>

    </div>
  );
};

export default BasicInfoStep;
