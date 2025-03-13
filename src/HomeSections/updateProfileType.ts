import { AppointmentType, Specimen as SpecimenType } from "./ProfileDataType";

  export type updateDataType = {
    patientId?: string; // Patient ID
    updateType: "appointment" | "specimen" | "basicInfo";
    updateData: AppointmentType | SpecimenType;
  };