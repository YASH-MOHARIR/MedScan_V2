import React, { useState } from "react";
import CustomModal from "../../utils/CustomModal";
import { updatePatientRecord } from "../../../backend/api";
import { useParams } from "react-router";
import { useCurrentPatientData } from "../../store/PatientDataContext";
import { Specimen } from "../ProfileDataType";
import { updateDataType } from "../updateProfileType";

const AddSpecimen: React.FC = () => {
  const { uid } = useParams();
  const { setPatientData, patientData } = useCurrentPatientData();

  const [isOpen, setIsOpen] = useState(false);
  const [specimen, setSpecimen] = useState<Specimen>({
    id: "",
    specimenType: "",
    date: "",
    time: "",
    collectedBy: "",
    collectionMethod: "",
    testResults:  {
      id: "",
      specimenId: "",
      testType: "",
      results: {},
      notes: "",
      date: "",
      createdAt: "",
      updatedAt: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSpecimen((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTestResultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSpecimen((prev) => ({
      ...prev,
      testResults: { ...prev.testResults, [name]: value },
    }));
  };

  const addTestResult = () => {
    setSpecimen((prev) => ({
      ...prev,
      testResults: {
        ...prev.testResults,
        results: { ...prev.testResults.results, "New Test": 0 },
      },
    }));
  };

  const updateTestResult = (key: string, value: number) => {
    setSpecimen((prev) => ({
      ...prev,
      testResults: {
        ...prev.testResults,
        results: { ...prev.testResults.results, [key]: value },
      },
    }));
  };

  const removeTestResult = (key: string) => {
    setSpecimen((prev) => {
      const updatedResults = { ...prev.testResults.results };
      delete updatedResults[key];
      return {
        ...prev,
        testResults: { ...prev.testResults, results: updatedResults },
      };
    });
  };

  const handleSubmit = async () => {
    try {
      // ✅ Generate Unique IDs
      const newSpecimen = {
        ...specimen,
        id: `spec_${Date.now()}`,
        testResults: {
          ...specimen.testResults,
          id: `result_${Date.now()}`,
          specimenId: `spec_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      // ✅ Optimistic UI Update
 setPatientData({
      ...patientData,
      specimens: [...patientData.specimens, newSpecimen],// Append new appointment
    });

      const data : updateDataType = {
        patientId: uid,
        updateType: "specimen",
        updateData: newSpecimen,
      };

      console.log("Submitting:", data);
      const response = await updatePatientRecord(data);

      console.log("Updated:", response);

      if (!response.success) {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating:", error);

 
    }

    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="glass-green-btn" style={{lineHeight:'0', alignItems: "center"}}>
      <i className="fi fi-br-add mx-2" ></i>

        Add Specimen
      </button>

      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Specimen">
        <div className="modal-body specimen-form">
          <div className="form-group">
            <label>Specimen Type:</label>
            <input type="text" name="specimenType" value={specimen.specimenType} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={specimen.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Time:</label>
            <input type="time" name="time" value={specimen.time} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Collected By:</label>
            <input type="text" name="collectedBy" value={specimen.collectedBy} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Collection Method:</label>
            <input type="text" name="collectionMethod" value={specimen.collectionMethod} onChange={handleChange} />
          </div>

          <h3>Test Results</h3>
          <div className="form-group">
            <label>Test Type:</label>
            <input type="text" name="testType" value={specimen.testResults.testType} onChange={handleTestResultChange} />
          </div>

          {Object.entries(specimen.testResults.results).map(([key, value], index) => (
            <div key={index} className="test-result-item">
              <label>{key}:</label>
              <input
                type="number"
                value={value}
                onChange={(e) => updateTestResult(key, Number(e.target.value))}
              />
              <button className="glass-red-btn" onClick={() => removeTestResult(key)}>
                Remove
              </button>
            </div>
          ))}

          <button className="glass-green-btn" onClick={addTestResult}>
            + Add Test Result
          </button>

          <div className="form-group">
            <label>Test Notes:</label>
            <textarea name="notes" value={specimen.testResults.notes} onChange={handleTestResultChange} />
          </div>

          <button onClick={handleSubmit} className="glass-green-btn mt-3">
            Submit
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default AddSpecimen;
