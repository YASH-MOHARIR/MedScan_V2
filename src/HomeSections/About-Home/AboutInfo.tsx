import { useEffect } from "react";
import { useChatbot } from "../../store/ChatbotContext";
import CustomDrawer from "../../utils/CustomDrawer";
import { PatientRecordType } from "../ProfileDataType";

// Profile Display Component
const AboutInfo: React.FC<{ data: PatientRecordType }> = ({ data }) => {
  const { sendCustomPrompt, messages } = useChatbot();

  const analyzeBasicInfo = async () => {
    const response = sendCustomPrompt("Analyze Basic Info of this patient" , "Analyzing Basic Info");
    console.log(response);
  };

  useEffect(() => {
    if (messages.length === 1) {
      // sendCustomPrompt(
      //   "return a message stating about which patient you are viewing in 10 words." + JSON.stringify(data),
      //   "Fetching Patient Data"
      // );
    }
  }, [messages.length, data, sendCustomPrompt]); // ✅ Runs only when messages.length or data changes


  return (
    <div className="about-main col-7">
      <div className="head d-flex  mb-3">
        <h1>About</h1>
        <button onClick={analyzeBasicInfo} className="analyze-btn mx-3">
          <img className="analyze-icon" src="/icons/chat-gpt-analyze.png" alt="" /> Analyze
        </button>
      </div>

      <div className="mb-4 general-info card-body glassmorph">
        <h3 className="h5">Personal Details</h3>
        <hr />

        <div className="row mb-2">
          <div className="col-md-6">
            <div className="row">
              <div className="col">Height :</div>
              <div className="col">{data.height} Cms</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-4">Weight :</div>
              <div className="col-8">{data.weight} Kgs</div>
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <div className="row">
              <div className="col">DOB :</div>
              <div className="col">{data.dateOfBirth}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-4">Blood Type :</div>
              <div className="col-8">{data.bloodType}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 general-info card-body glassmorph">
        <h3 className="h5">Medical Details</h3>
        <hr />

        <div className="row mb-2">
          <div className="col-5">Allergies :</div>
          <div className="col-7">{data.allergies.join(", ")}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5">Previous Health Conditions:</div>
          <div className="col-7">{data.medicalConditions.join(", ")}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5">Previous Medications :</div>
          <div className="col-7">{data.previousMedication.join(", ")}</div>
        </div>
      </div>

      <div className="mb-4 general-info card-body glassmorph">
        <h3 className="h5">Medical History</h3>
        <hr />

        <div className="row mb-2">
          <div className="col-5">Past Surgery :</div>
          <div className="col-7">{data.detailedMedicalHistory.pastSurgeries.join(", ")}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5">Immunisations:</div>
          <div className="col-7">{data.detailedMedicalHistory.immunizations.join(", ")}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5">Family History :</div>
          <div className="col-7">{data.detailedMedicalHistory.familyHistory.join(", ")}</div>
        </div>

        <h5>Social</h5>
        <div className="row mb-2">
          <div className="col-5">Smoking :</div>
          <div className="col-7">{data.detailedMedicalHistory.socialHistory.smoking}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5">Alcohol :</div>
          <div className="col-7">{data.detailedMedicalHistory.socialHistory.alcohol}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5">Drug Use :</div>
          <div className="col-7">{data.detailedMedicalHistory.socialHistory.drugUse}</div>
        </div>
      </div>

      <div className="mb-4 general-info card-body glassmorph-nohover">
        <CustomDrawer title="Contact Info">
          <div className="row">
            <div className="col-4">Email :</div>
            <div className="col-8">{data.contactInfo.email}</div>

            <div className="col-4">Phone :</div>
            <div className="col-8">{data.contactInfo.phone}</div>

            <div className="col-4">Address :</div>
            <div className="col-8">{data.contactInfo.address}</div>
          </div>
        </CustomDrawer>
        <CustomDrawer title="Emergency Contact Info">
          <div className="row">
            <div className="col-4">Name :</div>
            <div className="col-8">{data.emergencyContact.name}</div>

            <div className="col-4">Relationship:</div>
            <div className="col-8">{data.emergencyContact.relationship}</div>

            <div className="col-4">Phone :</div>
            <div className="col-8">{data.emergencyContact.phone}</div>
          </div>
        </CustomDrawer>
      </div>
    </div>
  );
};

export default AboutInfo;
