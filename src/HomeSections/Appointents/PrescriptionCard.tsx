import { Prescription } from "../ProfileDataType";



export const PrescriptionCard = ({ prescriptionData }: { prescriptionData: Prescription }) => {
  return (
    <div className="prescription glassmorph">
      <i className="icon fi fi-rr-prescription-bottle-alt "></i>
      <div className="prescription-details">
        <h6> {prescriptionData.medicine} - {prescriptionData.dosage}</h6>
        <hr />
        <p>{prescriptionData.frequency}</p>
        <p>{prescriptionData.instructions}</p>
      </div>
    </div>
  );
};
