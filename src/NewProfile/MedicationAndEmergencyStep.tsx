import React, { ChangeEvent } from "react";
import { PatientRecordType } from "../HomeSections/ProfileDataType";


interface MedicationAndEmergencyStepProps {
  patientData: PatientRecordType;
  handleGeneralChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

/**
 * ACCESSIBILITY: label + htmlFor + id on every input.
 * Also fixed emergency contact phone from type="number" to type="tel" —
 * phone numbers aren't mathematical numbers (555-4321 evaluates as arithmetic!).
 * type="tel" shows a phone keypad on mobile and preserves the string format.
 */
const MedicationAndEmergencyStep: React.FC<MedicationAndEmergencyStepProps> = ({
  patientData,
  handleGeneralChange,
}) => {
  return (
    <div role="group" aria-label="Medication history and emergency contacts">
      <h4>Medication History</h4>
      <div className="mb-3">
        <label htmlFor="field-medication">Medication Name (Comma Separated)</label>
        <input
          type="text"
          className="form-control"
          id="field-medication"
          name="previousMedication"
          value={patientData.previousMedication || ""}
          onChange={handleGeneralChange}
        />
      </div>

      <h4>Emergency Contacts</h4>
      <div className="mb-3">
        <label htmlFor="field-emergencyName">Contact Name</label>
        <input
          type="text"
          className="form-control"
          id="field-emergencyName"
          name="emergencyContact.name"
          value={patientData.emergencyContact.name || ""}
          onChange={handleGeneralChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="field-emergencyRelation">Relationship</label>
        <input
          type="text"
          className="form-control"
          id="field-emergencyRelation"
          name="emergencyContact.relationship"
          value={patientData.emergencyContact.relationship || ""}
          onChange={handleGeneralChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="field-emergencyPhone">Phone</label>
        <input
          type="tel"
          className="form-control"
          id="field-emergencyPhone"
          name="emergencyContact.phone"
          value={patientData.emergencyContact.phone || ""}
          onChange={handleGeneralChange}
        />
      </div>
    </div>
  );
};

export default MedicationAndEmergencyStep;
