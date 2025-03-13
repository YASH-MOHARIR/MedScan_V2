import CustomDrawer from "../../utils/CustomDrawer";
import { AppointmentType } from "../ProfileDataType";
import { PrescriptionCard } from "./PrescriptionCard";

export const AppointmentCard = ({ appointmentData }: { appointmentData: AppointmentType }) => {
  return (
    <div className="appointment-card glassmorph-nohover   mt-5">
      <div className="wrapper">
        <div className="date-time">
          <i className="icon fi fi-sr-calendar-clock"></i>
          <p>
            {appointmentData.date} • {appointmentData.time}
          </p>
        </div>

        <h4 className="my-3">
          {appointmentData.doctor} - {appointmentData.speciality}
        </h4>
        <p>Reason For Visit : {appointmentData.reasonForVisit}</p>

        <CustomDrawer title="Details">
          <div className="w-100">
            <div className="vitals mt-3">
              <div className="vital glassmorph">
                <i className="fi fi-sr-heart heart-icon icon"></i>
                <p>HR : {appointmentData.vitals.heartRate} bpm</p>
              </div>
              <div className="vital glassmorph">
                <i className="fi fi-rr-thermometer-half thermometer-icon icon"></i>{" "}
                <p>Temperature: {appointmentData.vitals.temperature} F</p>
              </div>
              <div className="vital glassmorph">
                <i className="icon fi fi-br-heart-rate"></i>
                <p>BP: {appointmentData.vitals.bloodPressure} mmHg</p>
              </div>
            </div>

            <h4 className="mt-3">Prescriptions</h4>
            <div className="prescriptions">
              {appointmentData.prescriptions.map((prescription, index) => (
                <PrescriptionCard key={index} prescriptionData={prescription} />
              ))}
            </div>

            <div className="notes mt-3">
              <h4>Notes</h4>
              <p>{appointmentData.notes}</p>
            </div>
          </div>
        </CustomDrawer>
      </div>
    </div>
  );
};
