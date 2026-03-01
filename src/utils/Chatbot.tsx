import React, { useEffect, useRef, useState, Suspense } from "react";
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
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const showAIVision = () => {
    setViionOpen(!visionOpen);
  };

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the last message
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);

  // Close chat on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <div>
      {/* Chat Toggle Button — was <div>, now <button> for keyboard accessibility */}
      <button
        className="chat-toggle"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={isOpen}
      >
        <img src="/icons/chat-gpt-blue.png" alt="" aria-hidden="true" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`chat-window ${iswindowExpanded ? "expand-window" : ""} `}
          role="complementary"
          aria-label="MedScan AI Chat Assistant"
        >
          <div className="chat-header">
            <span id="chatbot-title">MedScan AI Chatbot</span>
            <div className="actions">
              <button
                onClick={toggleWindowSize}
                className="close-btn glass-blue-btn"
                aria-label={iswindowExpanded ? "Collapse chat window" : "Expand chat window"}
              >
                {iswindowExpanded ? (
                  <i className="fi fi-br-compress-alt" aria-hidden="true"></i>
                ) : (
                  <i className="fi fi-br-arrow-up-right-and-arrow-down-left-from-center" aria-hidden="true"></i>
                )}
              </button>
              <button
                onClick={toggleChat}
                className="close-btn glass-red-btn mx-2"
                aria-label="Close chat window"
              >
                <p>Close</p>
              </button>
            </div>
          </div>

          {/* aria-live="polite" — screen readers announce new messages */}
          <div className="chat-body" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`chat-message ${msg.role}`}
                role="article"
                aria-label={msg.role === "user" ? "Your message" : "AI response"}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot typing-animation" role="status" aria-label="AI is typing">
                Typing...
              </div>
            )}
          </div>

          <div className="chat-footer">
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="icon glassmorph glass-blue-btn mx-2 send-btn"
              aria-label="Send message"
            >
              <i className="fi fi-sr-paper-plane-top" aria-hidden="true"></i>
            </button>
            <button
              onClick={showAIVision}
              className="icon glassmorph glass-blue-btn mx-2 send-btn"
              aria-label={visionOpen ? "Close image analysis" : "Open image analysis"}
              aria-expanded={visionOpen}
            >
              <i className="fi fi-br-add-image" aria-hidden="true"></i>
            </button>
          </div>

          {visionOpen && (
            <Suspense fallback={<div className="chat-message bot typing-animation">Loading AI Vision...</div>}>
              <AIVision />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
