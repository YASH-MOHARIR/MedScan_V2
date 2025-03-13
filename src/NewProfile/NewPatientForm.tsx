import React, { useState, ChangeEvent } from "react";

import BasicInfoStep from "./BasicInfoStep";
import ContactAndHistoryStep from "./ContactAndHistoryStep";
import MedicationAndEmergencyStep from "./MedicationAndEmergencyStep";

import { updateNestedState } from "./updateNestedState";
import { createPatientRecord } from "../../backend/api";

import { v4 as uuidv4 } from "uuid";
import { PatientRecordType } from "../HomeSections/ProfileDataType";
import Loader from "../utils/Loader";

const NewPatientForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const [patientData, setPatientData] = useState<PatientRecordType>({
    pid: "",
    name: "",
    age: 20,
    gender: "",
    height: 150,
    weight: 60,
    dateOfBirth: "",
    bloodType: "",
    medicalConditions: [],
    allergies: [],
    previousMedication: [],
    detailedMedicalHistory: {
      pastSurgeries: [],
      immunizations: [],
      familyHistory: [],
      socialHistory: {
        smoking: "Occasionally",
        alcohol: "Occasionally",
        drugUse: "Occasionally",
      },
    },
    contactInfo: {
      phone: "",
      email: "",
      address: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: 1231231230,
    },
    todos: [],
    appointments: [],
    specimens: [],
    createdAt: "",
    updatedAt: "",
  });

  // General change handler with dot-notation support.
  const handleGeneralChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue: number | string = value;
    if (type === "number") newValue = parseInt(value);
    setPatientData((prev) => updateNestedState(prev, name, newValue));
  };

  // Handler for comma-separated fields.
  const handleCommaSeparated = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setPatientData((prev) => updateNestedState(prev, field, values));
  };

  // Basic information validation.
  const validateBasicInfo = (): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};
    if (!patientData.name.trim()) newErrors.name = "Name is required.";
    if (!patientData.age || patientData.age <= 0) newErrors.age = "Age must be greater than 0.";
    if (!patientData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    if (!patientData.gender) newErrors.gender = "Gender is required.";
    if (!patientData.bloodType.trim()) newErrors.bloodType = "Blood type is required.";
    return newErrors;
  };

  const nextStep = () => {
    // Validate basic info on step 1
    if (currentStep === 0) {
      const basicErrors = validateBasicInfo();
      if (Object.keys(basicErrors).length > 0) {
        setErrors(basicErrors);
        return;
      } else {
        setErrors({});
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleFormSubmit = async () => {
    try {
      // Create a new patient record
      setIsLoading(true);
      const newPatientData = { ...patientData, pid: uuidv4() };
      const createdRecord = await createPatientRecord(newPatientData);
      console.log("Patient created:", createdRecord);
      console.log("Patient  ID:", createdRecord.patientId);

      setIsLoading(false);
    } catch (error) {
      console.error("Error with patient operations:", error);
    }
  };

  return (
    <div className=" new-patient-form-main    ">
      {isLoading && <Loader title="Creating Patient Profile" />}
      <div className=" new-patient-form   w-50 mt-4 glassmorph-nohover">
        <h2>Patient Form - Step {currentStep + 1} of 3</h2>
        <div className="new-pateient form">
          {currentStep === 0 && (
            <BasicInfoStep
              patientData={patientData}
              handleGeneralChange={handleGeneralChange}
              handleCommaSeparated={handleCommaSeparated}
              errors={errors}
            />
          )}
          {currentStep === 1 && (
            <ContactAndHistoryStep
              patientData={patientData}
              handleGeneralChange={handleGeneralChange}
              handleCommaSeparated={handleCommaSeparated}
            />
          )}
          {currentStep === 2 && (
            <MedicationAndEmergencyStep patientData={patientData} handleGeneralChange={handleGeneralChange} />
          )}
          <hr />
          <div className="action-step-btns  mt-3">
            {currentStep > 0 && (
              <button type="button" className="glass-red-btn col-5" onClick={prevStep}>
                Back
              </button>
            )}
            {currentStep < 2 ? (
              <button type="button" className="glass-blue-btn col-5" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button onClick={handleFormSubmit} className="glass-green-btn col-5">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPatientForm;
