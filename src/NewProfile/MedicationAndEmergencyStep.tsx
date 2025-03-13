import React, { ChangeEvent } from "react";
import { PatientRecordType } from "../HomeSections/ProfileDataType";


interface MedicationAndEmergencyStepProps {
  patientData: PatientRecordType ;
  handleGeneralChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const MedicationAndEmergencyStep: React.FC<MedicationAndEmergencyStepProps> = ({
  patientData,
  handleGeneralChange,
}) => {
  return (
    <div>
      <h4>Medication History</h4>
      <div className="mb-3">
        <label>Medication Name (Comma Seperated)</label>
        <input
          type="text"
          className="form-control"
          name="previousMedication"
          value={patientData.previousMedication ||""}
          onChange={handleGeneralChange}
        />
      </div>
 
      <h4>Emergency Contacts</h4>
      <div className="mb-3">
        <label>Contact Name</label>
        <input
          type="text"
          className="form-control"
          name="emergencyContact.name"
          value={patientData.emergencyContact.name || ""}
          onChange={handleGeneralChange}
        />
      </div>
      <div className="mb-3">
        <label>Relationship</label>
        <input
          type="text"
          className="form-control"
          name="emergencyContact.relationship"
          value={patientData.emergencyContact.relationship || ""}
          onChange={handleGeneralChange}
        />
      </div>
      <div className="mb-3">
        <label>Phone</label>
        <input
          type="number"
          className="form-control"
          name="emergencyContact.phone"
          value={patientData.emergencyContact.phone || ""}
          onChange={handleGeneralChange}
        />
      </div>
    </div>
  );
};

export default MedicationAndEmergencyStep;
