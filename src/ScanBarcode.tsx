import { Link, useNavigate } from "react-router-dom";
import { getPatientRecord } from "../backend/api";
import { useCurrentPatientData } from "./store/PatientDataContext";
import { useState } from "react";
import Loader from "./utils/Loader";

export const ScanBarcode = () => {
  const { setPatientData } = useCurrentPatientData();
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  // The same handleSubmit logic as before
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      setShowError(false);

      const patientID = formData.get("patientID");
      const res = await getPatientRecord(patientID as string);
      console.log("Patient Record:", res);

      await setPatientData(res);
      navigateTo(`/home/${res.pid}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data === " Patient not found.") {
        setShowError(true);
      } else {
        console.error("Error getting patient record", error);
      }
    }
    setIsLoading(false);
  };

  // This function is called by the form's onSubmit
  // It prevents the default page reload and constructs FormData
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  };

  return (
    <div className="scan-barcode">
      {/* Show loader if isLoading is true */}
      {isLoading && <Loader title="Fetching Patient Data..." />}

      <div className="login-card glassmorph-nohover">
        <i className="fi fi-rs-barcode-read barcode-icon"></i>
        <h1>Scan Barcode</h1>

        {/* Use onSubmit instead of action */}
        <form className="scan-form glassmorph" onSubmit={onFormSubmit}>
          <input
            className="mx-2"
            type="text"
            name="patientID"
            placeholder="Enter barcode"
            required
          />
          <button type="submit" className="glassmorph glass-green-btn">
            Submit
          </button>
        </form>

        {showError && <div className="glass-red-btn">Patient not found</div>}

        <div className="scan-action-btns">
          <button className="glassmorph">
            <i className="fi fi-br-camera-viewfinder icon"></i>
            <p className="mx-2">Scan Barcode</p>
          </button>

          <Link className="new-profile-btn" to="/new-profile">
            <button className="glassmorph">
              <i className="fi fi-br-add icon glass-green-btn ml-3"></i>
              <p className="mx-2">New Profile</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
