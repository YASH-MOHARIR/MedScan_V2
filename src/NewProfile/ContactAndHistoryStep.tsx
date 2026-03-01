import React, { ChangeEvent } from "react";
import { PatientRecordType } from "../HomeSections/ProfileDataType";

interface ContactAndHistoryStepProps {
  patientData: PatientRecordType;
  handleGeneralChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleCommaSeparated: (e: ChangeEvent<HTMLInputElement>, field: string) => void;
}

/**
 * ACCESSIBILITY: Same pattern as BasicInfoStep — every label has htmlFor + id.
 */
const ContactAndHistoryStep: React.FC<ContactAndHistoryStepProps> = ({
  patientData,
  handleGeneralChange,
  handleCommaSeparated,
}) => {
  return (
    <div role="group" aria-label="Allergies, medical history, and social history">
      <h4>Allergies</h4>
      <div className="mb-3">
        <label htmlFor="field-allergies">Allergies (comma separated)</label>
        <input
          type="text"
          className="form-control"
          id="field-allergies"
          value={patientData.allergies.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "allergies")}
        />
      </div>

      <h4>Detailed Medical History</h4>
      <div className="mb-3">
        <label htmlFor="field-conditions">Medical Conditions (comma separated)</label>
        <input
          type="text"
          className="form-control"
          id="field-conditions"
          value={patientData.medicalConditions.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "medicalConditions")}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="field-surgeries">Past Surgeries (comma separated)</label>
        <input
          type="text"
          className="form-control"
          id="field-surgeries"
          value={patientData.detailedMedicalHistory.pastSurgeries.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "detailedMedicalHistory.pastSurgeries")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="field-immunizations">Immunizations (comma separated)</label>
        <input
          type="text"
          className="form-control"
          id="field-immunizations"
          value={patientData.detailedMedicalHistory.immunizations.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "detailedMedicalHistory.immunizations")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="field-familyHistory">Family History (comma separated)</label>
        <input
          type="text"
          className="form-control"
          id="field-familyHistory"
          value={patientData.detailedMedicalHistory.familyHistory.join(", ")}
          onChange={(e) => handleCommaSeparated(e, "detailedMedicalHistory.familyHistory")}
        />
      </div>
      <h4>Social History</h4>
      <div className="inline-inputs-wrapper">
        <div className="mb-3">
          <label htmlFor="field-smoking">Smoking</label>
          <select
            className="form-select"
            id="field-smoking"
            name="detailedMedicalHistory.socialHistory.smoking"
            value={patientData.detailedMedicalHistory.socialHistory.smoking}
            onChange={handleGeneralChange}>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Regularly">Regularly</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="field-alcohol">Alcohol</label>
          <select
            className="form-select"
            id="field-alcohol"
            name="detailedMedicalHistory.socialHistory.alcohol"
            value={patientData.detailedMedicalHistory.socialHistory.alcohol}
            onChange={handleGeneralChange}>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Regularly">Regularly</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="field-drugUse">Drug Use</label>
          <select
            className="form-select"
            id="field-drugUse"
            name="detailedMedicalHistory.socialHistory.drugUse"
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
