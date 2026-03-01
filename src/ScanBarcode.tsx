import { Link, useNavigate } from "react-router-dom";
import { getPatientRecord } from "../backend/api";
import { useCurrentPatientData } from "./store/PatientDataContext";
import { useRef, useState } from "react";
import Loader from "./utils/Loader";

export const ScanBarcode = () => {
  const { setPatientData } = useCurrentPatientData();
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const idInput = useRef<HTMLInputElement>(null);

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

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  };

  const tryoutBtn = () => {
    if (idInput.current) {
      console.log(idInput.current.value);
      idInput.current.value = "P654321";
      idInput.current.focus();
    }
  };

  return (
    <main className="scan-barcode">
      {/* Show loader if isLoading is true */}

      <p className="login-logo" aria-hidden="true">
        Med<span>Scan</span>
      </p>
      <button onClick={tryoutBtn} className="sample-record glass-blue-btn p-3">
        Click To View Sample Record : P654321
      </button>

      {isLoading && <Loader title="Fetching Patient Data..." />}

      <div className="login-card glassmorph-nohover">
        <i className="fi fi-rs-barcode-read barcode-icon" aria-hidden="true"></i>
        <h1>Scan Barcode</h1>

        <form className="scan-form glassmorph" onSubmit={onFormSubmit} aria-label="Patient lookup form">
          <label htmlFor="patientID" className="sr-only">
            Patient ID
          </label>
          <input
            ref={idInput}
            className="mx-2"
            type="text"
            id="patientID"
            name="patientID"
            placeholder="Enter barcode"
            required
            aria-describedby={showError ? "patient-error" : undefined}
          />
          <button type="submit" className="glassmorph glass-green-btn">
            Submit
          </button>
        </form>

        {/* Error with role="alert" so screen readers announce it immediately */}
        {showError && (
          <div className="glass-red-btn" role="alert" id="patient-error">
            Patient not found
          </div>
        )}

        <div className="scan-action-btns">
          <button className="glassmorph" aria-label="Scan barcode with camera">
            <i className="fi fi-br-camera-viewfinder icon glass-blue-btn" aria-hidden="true"></i>
            <p className="mx-2">Scan Barcode</p>
          </button>

          <Link className="new-profile-btn" to="/new-profile">
            <button className="glassmorph" aria-label="Create new patient profile">
              <i className="fi fi-br-add icon glass-green-btn ml-3" aria-hidden="true"></i>
              <p className="mx-2">New Profile</p>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};
