import axios from "axios";
import { PatientRecordType } from "../src/HomeSections/ProfileDataType";

const API_URL="FUNCTION_API_ENDPOINT";
const code ="YOUR FUNCTION CODE"

export const createPatientRecord = async (patientData: PatientRecordType) => {
  const response = await axios.post(`${API_URL}/createPatient?code=${code}`, patientData);
  return response.data;
};

export const getPatientRecord = async (pid: string) => {
  const response = await axios.get(`${API_URL}/getPatientByID?id=${pid}&code=${code}`);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updatePatientRecord = async (updateDataType: any) => {
  const response = await axios.post(`${API_URL}/editPatientInfo`, updateDataType);
  return response.data;
};
