import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useChatbot } from "../store/ChatbotContext";
import AIVision from "./AIVision";

const Chatbot: React.FC = () => {
  const { messages, isLoading, sendMessage, isOpen, setIsOpen } = useChatbot();
  const [input, setInput] = useState("");
  const [iswindowExpanded, setWindowExpanded] = useState(false);
  const [visionOpen, setViionOpen] = useState(false);

  const toggleWindowSize = () => setWindowExpanded(!iswindowExpanded);
  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (!input.trim()) return; // Prevent sending empty messages
    sendMessage(input);
    setInput(""); // Clear input after sending
  };

  const showAIVision = () => {
    setViionOpen(!visionOpen);
  };

  const lastMessageRef = useRef<HTMLDivElement | null>(null); // Reference to last message

  // **Auto-scroll directly to the last message**
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);

  return (
    <div>
      {/* Chat Toggle Button */}
      <div className="chat-toggle" onClick={toggleChat}>
        <img src="/icons/chat-gpt-blue.png" alt="Chat Icon" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`chat-window ${iswindowExpanded ? "expand-window" : ""} `}>
          <div className="chat-header">
            <span>Medscan AI Chatbot</span>
            <div className="actions">
              <button onClick={toggleWindowSize} className="close-btn glass-blue-btn">
                {iswindowExpanded ? (
                  <i className="fi fi-br-compress-alt"></i>
                ) : (
                  <i className="fi fi-br-arrow-up-right-and-arrow-down-left-from-center"></i>
                )}
              </button>
              <button onClick={toggleChat} className="close-btn glass-red-btn mx-2">
                <p>Close</p>
              </button>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to last message
                className={`chat-message ${msg.role}`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {isLoading && <div className="chat-message bot typing-animation">Typing...</div>}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Fixed: Use onKeyDown
            />
            <button onClick={handleSendMessage} className="icon glassmorph glass-blue-btn mx-2 send-btn">
              <i className="fi fi-sr-paper-plane-top"></i>
            </button>
            <button onClick={showAIVision} className="icon glassmorph glass-blue-btn mx-2 send-btn">
            <i className="fi fi-br-add-image"></i>            </button>
          </div>

          {visionOpen && <AIVision />}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
