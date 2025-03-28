import axios from "axios";

const OPENAI_API_KEY = process.env.OPEN_AI_API_KEY; // Store API key in .env
const openaiEndpoint = "https://medscan-open-ai.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-10-21";

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

