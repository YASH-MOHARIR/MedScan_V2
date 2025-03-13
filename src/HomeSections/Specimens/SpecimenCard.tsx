import { useState } from "react";
import CustomModal from "../../utils/CustomModal";
import { Specimen } from "../ProfileDataType";

export const SpecimenCard = ({ specimenDetails }: { specimenDetails: Specimen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const testResultData = specimenDetails.testResults;

  return (
    <div className={`specimen-card glassmorph col-3   `}>
      <div className="row">
        <div className="specimen-icon icon col-3">
          <i className="fi fi-ss-blood-test-tube-alt   m-auto"></i>
        </div>
        <div className="details col row">
          <p>
            <strong> {specimenDetails.specimenType} Sample </strong>
          </p>
          <p>Date : {specimenDetails.date}</p>
          <p>Time : {specimenDetails.time}</p>

          <button onClick={() => setIsModalOpen((prev) => !prev)} className="glassmorph glass-blue-btn mt-2  p-2">
            Test Results
          </button>

          <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Test Result Details">
            {testResultData ? (
              <div>
                <h3>{testResultData.testType}</h3>
                <p>
                  <strong>Date:</strong> {testResultData.date}
                </p>
                <p>
                  <strong>Notes:</strong> {testResultData.notes}
                </p>

                <h4>Results:</h4>
                <ul>
                  {Object.entries(testResultData.results).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>

                <hr />
                <p>Collected By : {specimenDetails.collectedBy}</p>
                <p>Method : {specimenDetails.collectionMethod}</p>
              </div>
            ) : (
              <p>No test result selected.</p>
            )}
          </CustomModal>
        </div>
      </div>
    </div>
  );
};
