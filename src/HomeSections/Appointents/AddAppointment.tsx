import React, { useState } from "react";
import CustomModal from "../../utils/CustomModal";
import { updatePatientRecord } from "../../../backend/api";
import { useParams } from "react-router";
import { useCurrentPatientData } from "../../store/PatientDataContext";
import { AppointmentType } from "../ProfileDataType";
import { updateDataType } from "../updateProfileType";

const AddAppointment: React.FC = () => {
  const { uid } = useParams();
  const { setPatientData, patientData } = useCurrentPatientData();

  const [isOpen, setIsOpen] = useState(false);
  const [newAppointment, setAppointment] = useState<AppointmentType>({
    id: "",
    date: "",
    time: "",
    doctor: "",
    speciality: "",
    reasonForVisit: "",
    vitals: { heartRate: 0, temperature: 0, bloodPressure: "" },
    prescriptions: [{ medicine: "", dosage: "", frequency: "", duration: "", instructions: "" }],
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in newAppointment.vitals) {
      setAppointment((prev) => ({
        ...prev,
        vitals: { ...prev.vitals, [name]: value },
      }));
    } else {
      setAppointment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePrescriptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => {
      const updatedPrescriptions = [...prev.prescriptions];
      updatedPrescriptions[index] = { ...updatedPrescriptions[index], [name]: value };
      return { ...prev, prescriptions: updatedPrescriptions };
    });
  };

  const addPrescription = () => {
    setAppointment((prev) => ({
      ...prev,
      prescriptions: [
        ...prev.prescriptions,
        { medicine: "", dosage: "", frequency: "", duration: "", instructions: "" },
      ],
    }));
  };

  const removePrescription = (index: number) => {
    setAppointment((prev) => ({
      ...prev,
      prescriptions: prev.prescriptions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("submitting:", newAppointment);
      const data: updateDataType = {
        patientId: uid, // Patient ID
        updateType: "appointment",
        updateData: newAppointment,
      };

      const id = await updatePatientRecord(data);

      console.log("updated:", id);
    } catch (e) {
      console.log("error:", e);
    }

    setPatientData({
      ...patientData,
      appointments: [...patientData.appointments, newAppointment], // Append new appointment
    });

    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="glass-green-btn d-flex" style={{lineHeight:'0', alignItems: "center"}}>
        <i className="fi fi-br-add mx-2" ></i>
        Add Appointment
      </button>

      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Appointment">
        <div className="modal-body appointment-form">
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={newAppointment.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Time:</label>
            <input type="time" name="time" value={newAppointment.time} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Doctor:</label>
            <input
              type="text"
              name="doctor"
              placeholder="Dr. Smith"
              value={newAppointment.doctor}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Speciality:</label>
            <input
              type="text"
              name="speciality"
              placeholder="Cardiology"
              value={newAppointment.speciality}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Reason for Visit:</label>
            <textarea
              name="reasonForVisit"
              placeholder="Routine check-up"
              value={newAppointment.reasonForVisit}
              onChange={handleChange}
            />
          </div>

          <h3>Vitals</h3>
          <div className="vitals-group">
            <div className="form-group">
              <label>Heart Rate:</label>
              <input type="number" name="heartRate" value={newAppointment.vitals.heartRate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Temperature:</label>
              <input
                type="number"
                name="temperature"
                value={newAppointment.vitals.temperature}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Blood Pressure:</label>
              <input
                type="text"
                name="bloodPressure"
                value={newAppointment.vitals.bloodPressure}
                onChange={handleChange}
              />
            </div>
          </div>

          <h3>Prescriptions</h3>
          {newAppointment.prescriptions.map((prescription, index) => (
            <div key={index} className="prescription-item ">
              <div className="inline-inputs-wrapper-input gap-2">
                <input
                  type="text"
                  name="medicine"
                  placeholder="Medicine"
                  value={prescription.medicine}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
                <input
                  type="text"
                  name="dosage"
                  placeholder="Dosage"
                  value={prescription.dosage}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
                <input
                  type="text"
                  name="frequency"
                  placeholder="Frequency"
                  value={prescription.frequency}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  value={prescription.duration}
                  onChange={(e) => handlePrescriptionChange(index, e)}
                />
              </div>
              <input
              className="my-2"
                type="text"
                name="instructions"
                placeholder="Instructions"
                value={prescription.instructions}
                onChange={(e) => handlePrescriptionChange(index, e)}
              />
              <button className="remove-prescription glass-red-btn w-100" onClick={() => removePrescription(index)}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={addPrescription} className="glass-green-btn">
            + Add Prescription
          </button>

          <div className="form-group">
            <label>Notes:</label>
            <textarea name="notes" value={newAppointment.notes} onChange={handleChange} />
          </div>

          <button onClick={handleSubmit} className="glass-green-btn mt-3">
            Submit
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default AddAppointment;
