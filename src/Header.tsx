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
    <div className="header">
      <div className="logo">
        <img src="/images/logo.png" className="logo-icon " alt="" />
        <p className="logo-text">
          Med
          <span>Scan</span>
        </p>
      </div>

      <div className="about-patient">
        <i className="fi fi-rr-user icon user mb-3"></i>
        <h5 className="patient-name">{name}</h5>
        <hr />
        <p className="patient-id">P.ID : {pid}</p>
        <p className="gender"> {gender}</p>
        <p className="age"> {age}</p>
      </div>

      <nav className="navigation" id="navigation">
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

      <button onClick={onLogout} className="  glassmorph glass-red-btn">
        LOGOUT
      </button>
    </div>
  );
};

export default Header;
