import { PatientRecordType } from "../HomeSections/ProfileDataType";
import { createContext, useContext, useState } from "react";
import { sampleRecord } from "../sampleReccordDoc";

interface patientDataContextType {
    patientData: PatientRecordType;
    setPatientData: (patientData: PatientRecordType) => void;
    logout: () => void;
}

export const PatientDataContext = createContext<patientDataContextType|undefined>(undefined);

export const PatientDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [patientData, setPatientData] = useState<PatientRecordType>(sampleRecord);
    const logout = () => {
      setPatientData(sampleRecord);
    }
  
    return (
      <PatientDataContext.Provider value={{ patientData, setPatientData,logout }}>
        {children}
      </PatientDataContext.Provider>
    );
  };


export const useCurrentPatientData = () => {
    const context = useContext(PatientDataContext);
    if (!context) {
      throw new Error("useCurrentPatientData must be used within a PatientDataProvider");
    }
    return context;
  };
  