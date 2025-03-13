import React, { ChangeEvent } from "react";
import { PatientRecordType } from "../HomeSections/ProfileDataType";

interface ContactAndHistoryStepProps {
  patientData: PatientRecordType;
  handleGeneralChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleCommaSeparated: (e: ChangeEvent<HTMLInputElement>, field: string) => void;
}

const ContactAndHistoryStep: React.FC<ContactAndHistoryStepProps> = ({
  patientData,
  handleGeneralChange,
  handleCommaSeparated,
}) => {
  return (
    <div>
      <h4>Allergies</h4>
      <div className="mb-3">
        <label>Allergies (comma separated)</label>
        <input
          type="text"
          className="form-control"
          value={patientData.allergies.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "allergies")}
        />
      </div>
   
      <h4>Detailed Medical History</h4>
      <div className="mb-3">
        <label>Medical Conditions (comma separated)</label>
        <input
          type="text"
          className="form-control"
          value={patientData.medicalConditions.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "medicalConditions")}
        />
      </div>

      <div className="mb-3">
        <label>Past Surgeries (comma separated)</label>
        <input
          type="text"
          className="form-control"
          value={patientData.detailedMedicalHistory.pastSurgeries.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "detailedMedicalHistory.pastSurgeries")}
        />
      </div>
      <div className="mb-3">
        <label>Immunizations (comma separated)</label>
        <input
          type="text"
          className="form-control"
          value={patientData.detailedMedicalHistory.immunizations.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "detailedMedicalHistory.immunizations")}
        />
      </div>
      <div className="mb-3">
        <label>Family History (comma separated)</label>
        <input
          type="text"
          className="form-control"
          value={patientData.detailedMedicalHistory.familyHistory.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "detailedMedicalHistory.familyHistory")}
        />
      </div>
      <h4>Social History</h4>
      <div className="inline-inputs-wrapper">
        <div className="mb-3">
          <label>Smoking</label>
          <select
            className="form-select"
            name="detailedMedicalHistory.socialHistory.smoking"
            value={patientData.detailedMedicalHistory.socialHistory.smoking}
            onChange={handleGeneralChange}>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Regularly">Regularly</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Alcohol</label>
          <select
            className="form-select"
            name="detailedMedicalHistory.socialHistory.alcohol"
            value={patientData.detailedMedicalHistory.socialHistory.alcohol}
            onChange={handleGeneralChange}>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Regularly">Regularly</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Drug Use</label>
          <select
            className="form-select"
            name="detailedMedicalHistory.socialHistory.exercise"
            value={patientData.detailedMedicalHistory.socialHistory.drugUse}
            onChange={handleGeneralChange}>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Regularly">Regularly</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ContactAndHistoryStep;
