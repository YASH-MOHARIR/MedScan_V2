import  { createContext, useContext     } from "react";
import { chatMessageType  } from "../../backend/openaiService";

// Define Chatbot Context Type
interface ChatbotContextType {
  messages: chatMessageType[];
  setMessages: (messages: chatMessageType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sendMessage: (message: string) => void;
  sendCustomPrompt: (hiddenPrompt: string, displayMessage: string) => void;
}

// Create Context
export const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);




// Chatbot Provider

// Custom Hook to Use Chatbot Context
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
