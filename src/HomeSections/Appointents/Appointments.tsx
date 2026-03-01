import React, { Suspense } from "react";
import "./appointments.scss";
import { useChatbot } from "../../store/ChatbotContext";
import { AppointmentType } from "../ProfileDataType";
import { AppointmentCard } from "./AppointmentCard";
import AddAppointment from "./AddAppointment";

// Lazy load the heavy Chart.js component
const PatientLineChart = React.lazy(() => import('./PatientDataGraph'));

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
        <h2>Appointments</h2>
        <button onClick={analyzeAppointments} className="analyze-btn mx-3" aria-label="Analyze appointment history with AI">
          <img className="analyze-icon" src="/icons/chat-gpt-analyze.png" alt="" aria-hidden="true" /> Analyze
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
          <h3>Vitals Chart</h3>
          <button onClick={analyzeAppointments} className="analyze-btn mx-3" aria-label="Analyze vitals data with AI">
            <img className="analyze-icon" src="/icons/chat-gpt-analyze.png" alt="" aria-hidden="true" /> Analyze Vitals
          </button>
        </div>
        <Suspense fallback={<div className="glassmorph text-center p-5">Loading Chart Data...</div>}>
          <PatientLineChart appointmentsData={appointmentData} />
        </Suspense>
      </div>
    </>
  );
};
