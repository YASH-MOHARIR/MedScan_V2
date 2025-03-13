import AboutInfo from "./About-Home/AboutInfo";
import { Appointments } from "./Appointents/Appointments";
import Specimens from "./Specimens/Specimens";
import { TodoList } from "./About-Home/TodoList";
import Header from "../Header";
import Chatbot from "../utils/Chatbot";
import { useCurrentPatientData } from "../store/PatientDataContext";

const Home = () => {

  const { patientData } = useCurrentPatientData();

  const { name, pid, gender, age } = patientData;
  return (
    <main data-spy="scroll" data-target="#navigation" data-offset="0">
      <Header name={name} pid={pid} gender={gender} age={age} />
      <Chatbot />

      <div className="home">
        <section className="mb-5 row" id="about">
          <AboutInfo data={patientData} />
          <TodoList todos={patientData.todos} />
        </section>
        <section className="mb-5" id="appointments">
          <Appointments appointmentData={patientData.appointments} />
        </section>
        <section className="" id="specimens">
          <Specimens specimenData={patientData.specimens} />
        </section>
      </div>
    </main>
  );
};

export default Home;
