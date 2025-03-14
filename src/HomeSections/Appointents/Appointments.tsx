import { useChatbot } from "../../store/ChatbotContext";
import PatientLineChart from "./PatientDataGraph";
import { AppointmentType } from "../ProfileDataType";
import { AppointmentCard } from "./AppointmentCard";
import AddAppointment from "./AddAppointment";

export const Appointments = ({ appointmentData }: { appointmentData: AppointmentType[] }) => {
  const { sendCustomPrompt } = useChatbot();

  const analyzeAppointments = async () => {
    const response = sendCustomPrompt(
      "Analyze the patient appointments Info and vital data of this patient in 100 words, give suggestions on trends and give predictions in short" +
        JSON.stringify(appointmentData),
      "Analyzing Past Appointments and Vitals... "
    );
    console.log(response);
  };

  return (
    <>
      <div className="d-flex  ">
        <h1>Appointments</h1>
        <button onClick={analyzeAppointments} className="analyze-btn mx-3">
          <img className="analyze-icon" src="/icons/chat-gpt-analyze.png" alt="" /> Analyze
        </button>
        <AddAppointment />
      </div>

      <div className="appointments-wrapper mt-3">
        {appointmentData.map((appointment, index) => (
          <AppointmentCard key={index} appointmentData={appointment} />
        ))}
      </div>
      
      <div className="my-5">
        <div className="d-flex align-items-center my-3 ">
          <h4>Vitals Chart</h4>
          <button onClick={analyzeAppointments} className="analyze-btn mx-3">
            <img className="analyze-icon" src="/icons/chat-gpt-analyze.png" alt="" /> Analyze Vitals
          </button>
        </div>
        <PatientLineChart appointmentsData={appointmentData} />
      </div>
    </>
  );
};
