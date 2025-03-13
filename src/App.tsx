import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@flaticon/flaticon-uicons/css/all/all.css";

import { BrowserRouter, Route, Routes } from "react-router";

import { ScanBarcode } from "./ScanBarcode";
import Home from "./HomeSections/Home";
import NewPatientForm from "./NewProfile/NewPatientForm";
import { ChatbotContextProvider } from "./store/ChatbotContextProvide";
import { PatientDataProvider } from "./store/PatientDataContext";

function App() {
  return (
    <PatientDataProvider>
      <ChatbotContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home/:uid" element={<Home />} />
            <Route path="/new-profile" Component={NewPatientForm} />
            <Route path="/" Component={ScanBarcode} />
          </Routes>
        </BrowserRouter>
      </ChatbotContextProvider>
    </PatientDataProvider>
  );
}

export default App;
