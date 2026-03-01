import { useNavigate } from "react-router";
import { basicData } from "./HomeSections/ProfileDataType";
import { useCurrentPatientData } from "./store/PatientDataContext";

const Header = ({ name, pid, gender, age }: basicData) => {
  const navigateTo = useNavigate();
  const { logout } = useCurrentPatientData();

  const onLogout = () => {
    logout();
    navigateTo("/");
  };

  return (
    <header className="header" role="banner">
      <div className="logo">
        <img src="/images/logo.png" className="logo-icon " alt="MedScan logo" />
        <h1 className="logo-text">
          Med
          <span>Scan</span>
        </h1>
      </div>

      <div className="about-patient" aria-label="Patient information" role="region">
        <i className="fi fi-rr-user icon user mb-3" aria-hidden="true"></i>
        <h2 className="patient-name">{name}</h2>
        <hr />
        <p className="patient-id">P.ID : {pid}</p>
        <p className="gender"> {gender}</p>
        <p className="age"> {age}</p>
      </div>

      <nav className="navigation" id="navigation" aria-label="Main navigation">
        <ul className="nav-links ">
          <li className="nav-link">
            <a href="#about">About</a>
          </li>
          <li className="nav-link">
            <a href="#appointments">Appointments</a>
          </li>
          <li className="nav-link">
            <a href="#specimens">Specimens</a>
          </li>
        </ul>
      </nav>
      <hr />

      <button onClick={onLogout} className="  glassmorph glass-red-btn" aria-label="Log out of current patient">
        LOGOUT
      </button>
    </header>
  );
};

export default Header;
