import { useChatbot } from "../../store/ChatbotContext";
import { Specimen } from "../ProfileDataType";
import AddSpecimen from "./AddSpecimen";
import { SpecimenCard } from "./SpecimenCard";

const Specimens = ({ specimenData }: { specimenData: Specimen[] }) => {
  
  const { sendCustomPrompt } = useChatbot();


  const analyzeSpecimenResults = async () => {
    const response = sendCustomPrompt("Analyze the following specimens and thier results. summarise in brief . give suggestions and predictions on what can be wrong  "  + JSON.stringify(specimenData), "Analyzing Specimen Data and Tests");
    console.log(response);
  };

  return (
    <div>
      <div className="d-flex">
        <h1>Specimens</h1>
        <button onClick={analyzeSpecimenResults} className="analyze-btn mx-3">
          <img className="analyze-icon" src="/icons/chat-gpt-analyze.png" alt="" /> Analyze
        </button>
        <AddSpecimen/>
      </div>


      <div className="specimens glassmorph-nohover row gap-3 mt-5">
        {specimenData.map((specimen) => (
          <SpecimenCard key={specimen.id} specimenDetails={specimen} />
        ))}
      </div>
    </div>
  );
};

export default Specimens;
