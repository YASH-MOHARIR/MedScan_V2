import React, { useState } from "react";
import axios from "axios";
import { useChatbot } from "../store/ChatbotContext";

const AIVision: React.FC = () => {

  const [fileName, setfileName] = useState<string|null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { setIsLoading, setMessages, messages } = useChatbot();

  // Called whenever the user selects a file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setfileName(e.target.files[0].name);
    }
  };

  // Send file to Custom Vision
  const handleSubmit = async () => {
    if (!selectedFile) {
      setMessages([...messages, { role: "assistant", content: "Please select a file first" }]);
      return;
    }
    setIsLoading(true);

    try {
      // 1. Prepare form data
      const formData = new FormData();
      formData.append("image", selectedFile);

      // 2. POST to your Custom Vision endpoint
      const response = await axios.post(
        "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/7afa2c7a-8708-4c66-a27b-662d95040bfc/classify/iterations/Iteration2/image",
        formData,
        {
          headers: {
            "Prediction-Key": "247ebcffbfe34c86b026abce25c5dd0d",
          },
        }
      );

      setIsLoading(false);
      const prediction = response.data.predictions[0];

      setMessages([
        ...messages,
        {
          content: `According to my analysis,\n Prediction: **${prediction.tagName}** \n with a probability of **${(prediction.probability*100).toFixed(3)} %**`,
          role: "assistant",
        },
      ]);
    } catch (err) {
      setIsLoading(false);
      setMessages([...messages, { role: "assistant", content: "Error sending file" }]);

      console.error("Error sending file:", err);
    }
  };

  return (
    <div className="ai-vision row container p-3 g-2">
      <label className="col mr-2" htmlFor="image-upload">
        {selectedFile ?  <div>{fileName}</div> : <div>Upload Brain MRI for Tumor Prediction</div>}
        <i className="fi fi-rr-file-upload mx-3"></i>
      </label>

      <input className="col-0" type="file" accept="image/*" id="image-upload" onChange={handleFileChange} />
      <button className="glass-purple-btn col-4" onClick={handleSubmit} disabled={selectedFile == null}>
        Analyze Image
      </button>
    </div>
  );
};

export default AIVision;
