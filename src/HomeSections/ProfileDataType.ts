interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: number;
}

type SocialHistoryOptions = "Never" | "Occasionally" | "Regularly";

interface SocialHistory {
  smoking: SocialHistoryOptions;
  alcohol: SocialHistoryOptions;
  drugUse: SocialHistoryOptions;
}

interface DetailedMedicalHistory {
  pastSurgeries: string[];
  immunizations: string[];
  familyHistory: string[];
  socialHistory: SocialHistory;
}

// interface Medication {
//   id: string;
//   name: string;
//   dosage: string;
//   frequency: string;
//   startDate: string;
//   endDate: string | null;
//   notes: string;
// }



export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

interface Vitals {
  heartRate: number;
  temperature: number;
  bloodPressure: string;
}

export interface Prescription {
 
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface AppointmentType {
  id: string;
  date: string;
  time: string;
  doctor: string;
  speciality: string;
  reasonForVisit: string;
  vitals: Vitals;
  prescriptions: Prescription[];
  notes: string; 
}

export interface Specimen {
  id: string;
  specimenType: string;
  date: string;
  time: string;
  collectedBy: string;
  collectionMethod: string;

  testResults: TestResult;
}

export interface TestResult {
  id: string;
  specimenId: string;
  testType: string;
  results: Record<string, number>; // Flexible structure for different tests
  notes: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface basicData {
  pid: string;
  name: string;
  age: number;
  gender: string;
}

export interface PatientRecordType extends basicData {
  // from basic data
  // id: string;
  // name: string;
  // age: number;
  // gender: string;

  height: number;
  weight: number;
  dateOfBirth: string;
  bloodType: string;

  medicalConditions: string[];
  allergies: string[];
  previousMedication: string[];

  detailedMedicalHistory: DetailedMedicalHistory;

  contactInfo: ContactInfo;
  emergencyContact: EmergencyContact;

  todos: Todo[];

  appointments: AppointmentType[];

  specimens: Specimen[];

  createdAt: string;
  updatedAt: string;
}
