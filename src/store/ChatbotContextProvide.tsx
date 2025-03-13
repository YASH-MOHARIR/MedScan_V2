import { ReactNode, useState } from "react";
import { chatMessageType, getChatbotResponse } from "../../backend/openaiService";
import { ChatbotContext } from "./ChatbotContext";

export const ChatbotContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const welcomeMessage: chatMessageType = {
    content: "### Heya! I am Medscan AI\n\nI am an **intelligent medical assistant** integrated into the **Medscan system**. I am here to assist **doctors** by:\n\n- **Retrieving, analyzing, and summarizing** patient medical data efficiently.\n- Providing **insights based on stored medical records**.\n- Supporting **healthcare professionals** in their **decision-making processes**.\n\n#### How can I assist you today?",
    role: "assistant",
};

  //   const welcome_mssg =

  const [messages, setMessages] = useState<chatMessageType[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Function to send a normal user message
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setIsOpen(true);
    const userMessage: chatMessageType = { content: message, role: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      // Context-aware conversation history
      const conversationHistory: chatMessageType[] = [
        {
          role: "system",
          content:
            "You are Medscan AI, an advanced medical assistant integrated into the Medscan system. Your role is to assist doctors by retrieving, analyzing, and summarizing patient medical data. You have access to patient records, including vitals, medications, past treatments, blood reports, specimen results, doctor visit notes, and test results. answer each question in maximum of 300 words or 2000 characters and use markdown response.",
        },
        ...messages.slice(-5), // Only send last 5 messages for efficiency
        { role: "user", content: message },
      ];

      const botReply = await getChatbotResponse(conversationHistory);
      const botMessage: chatMessageType = { content: botReply, role: "assistant" };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { content: "Error fetching response. Please try again later.", role: "assistant" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to send a hidden prompt (e.g., "Analyze Data")
  const sendCustomPrompt = async (hiddenPrompt: string, displayMessage: string) => {
    const userMessage: chatMessageType = { content: displayMessage, role: "user" };
    setIsOpen(true);
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setMessages((prev) => [...prev, { content: "Analyzing data...", role: "assistant" }]);

    try {
      const conversationHistory: chatMessageType[] = [
        { role: "system", content: "You are Medscan AI, an intelligent medical assistant." },
        ...messages.slice(-5),
        { role: "user", content: hiddenPrompt },
      ];

      const botReply = await getChatbotResponse(conversationHistory);
      setMessages((prev) => [...prev.slice(0, -1), { content: botReply, role: "assistant" }]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { content: "Error analyzing data. Please try again.", role: "assistant" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatbotContext.Provider value={{ messages,setMessages, isLoading, setIsLoading, sendMessage, sendCustomPrompt, isOpen, setIsOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
};
