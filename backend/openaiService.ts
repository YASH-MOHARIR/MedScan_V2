import axios from "axios";

const OPENAI_API_KEY = "ENTER YOUR OPEN AI API KEY"; 
const openaiEndpoint = "OPEN AI FUNCTION API ENDPOINT";

export type chatMessageType =  { role: string, content: string };

export const getChatbotResponse = async (conversationHistory: chatMessageType[]) => {
  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        messages: conversationHistory, // ✅ Send conversation history
        max_tokens: 400, // Limit response length
      },
      {
        headers: {
          "api-key": OPENAI_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error );
    return "Sorry, I couldn't process that request.";
  }
};

