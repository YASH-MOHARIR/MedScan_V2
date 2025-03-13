import { PatientRecordType } from "./HomeSections/ProfileDataType";

export const sampleRecord: PatientRecordType = {
  pid: "P654321",
  name: "John Doe",
  age: 45,
  gender: "Male",
  height: 178,
  weight: 85,
  dateOfBirth: "1979-07-10",
  bloodType: "B+",
  medicalConditions: ["Hypertension", "Type 2 Diabetes", "Hyperlipidemia"],
  allergies: ["Penicillin", "Dust Mites", "Aspirin"],
  previousMedication: ["Metformin", "Lisinopril", "Atorvastatin"],

  detailedMedicalHistory: {
    pastSurgeries: ["Appendectomy (2015)", "Gallbladder Removal (2020)", "Knee Surgery (2023)"],
    immunizations: ["Influenza (2023)", "COVID-19 (2022)", "Pneumococcal (2021)"],
    familyHistory: ["Diabetes", "Coronary Artery Disease", "Hypertension"],
    socialHistory: {
      smoking: "Never",
      alcohol: "Occasionally",
      drugUse: "Never",
    },
  },

  contactInfo: {
    phone: "555-6789",
    email: "amitmehta@example.com",
    address: "45 Park Avenue, Mumbai, India",
  },

  emergencyContact: {
    name: "Priya Mehta",
    relationship: "Wife",
    phone: 555-4321,
  },

  todos: [
    {
      id: "todo_001",
      text: "Schedule follow-up for cholesterol check",
      completed: false,
      priority: "High"
    },
    {
      id: "todo_002",
      text: "Book an eye exam for diabetic retinopathy screening",
      completed: false,
      priority: "Medium"
    },
  ],

  appointments: [
    {
      id: "appt_003",
      date: "2025-03-15",
      time: "11:00",
      doctor: "Dr. Patel",
      speciality: "Dermatology",
      reasonForVisit: "Skin rash",
      vitals: { heartRate: 80, temperature: 98.6, bloodPressure: "120/80" },
      prescriptions: [
        { 
          medicine: "Hydrocortisone",
          dosage: "1%",
          frequency: "Twice daily",
          duration: "14 days",
          instructions: "Apply to affected area",
        },
      ],
      notes: "Avoid exposure to irritants and allergens.",
    },
    {
      id: "appt_001",
      date: "2025-02-25",
      time: "14:00",
      doctor: "Dr. Kapoor",
      speciality: "Cardiology",
      reasonForVisit: "Routine blood pressure check",
      vitals: {
        heartRate: 78,
        temperature: 98.5,
        bloodPressure: "140/90",
      },
      prescriptions: [
        { 
          medicine: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days",
          instructions: "Take in the morning with food",
        },
      ],
      notes: "Recommended dietary changes and regular exercise.",
    },
    {
      id: "appt_002",
      date: "2025-03-10",
      time: "09:30",
      doctor: "Dr. Sharma",
      speciality: "Endocrinology",
      reasonForVisit: "Diabetes management",
      vitals: {
        heartRate: 75,
        temperature: 98.1,
        bloodPressure: "130/85",
      },
      prescriptions: [
        {
     
          medicine: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          duration: "90 days",
          instructions: "Take with meals",
        },
      ],
      notes: "A1C slightly elevated at 7.1%. Advised increased physical activity.",
    },
  ],

  specimens: [
    {
      id: "spec_001",
      specimenType: "Blood",
      date: "2025-02-24",
      time: "08:30",
      collectedBy: "Nurse Anita",
      collectionMethod: "Venipuncture",
      testResults: {
        id: "result_001",
        specimenId: "spec_001",
        testType: "CBC",
        results: {
          WBC: 6.5,
          RBC: 4.9,
          Hemoglobin: 14.3,
        },
        notes: "Within normal range",
        date: "2025-02-24",
        createdAt: "2025-02-24T10:00:00Z",
        updatedAt: "2025-02-24T10:00:00Z",
      },
    },
    {
      id: "spec_002",
      specimenType: "Urine",
      date: "2025-02-27",
      time: "09:00",
      collectedBy: "Nurse Raj",
      collectionMethod: "Midstream",

      testResults: {
        id: "result_003",
        specimenId: "spec_002",
        testType: "Urinalysis",
        results: {
          Protein: 0.2,
          Glucose: 0.5,
          Ketones: 0,
        },
        notes: "Mild glucose presence, monitor for worsening diabetic control.",
        date: "2025-02-27",
        createdAt: "2025-02-27T10:00:00Z",
        updatedAt: "2025-02-27T10:00:00Z",
      },
    },
  ],

  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-03-05T09:00:00Z",
};
