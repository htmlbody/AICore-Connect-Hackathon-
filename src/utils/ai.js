import axios from 'axios';

/**
 * AI Utility for Hackathon
 * This handles communication with GenAI models.
 * Tomorrow, we will replace the prompt logic with the actual problem statement requirements.
 */

const AI_CONFIG = {
  endpoint: 'https://api.openai.com/v1/chat/completions', // Or Gemini endpoint
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
};

export const analyzeTaskWithAI = async (taskData) => {
  if (!AI_CONFIG.apiKey) {
    console.warn("AI API Key missing. Returning mock verification.");
    return {
      status: 'verified',
      confidence: 0.95,
      reasoning: "AI analysis skipped - using mock logic for local development."
    };
  }

  try {
    const response = await axios.post(
      AI_CONFIG.endpoint,
      {
        model: "gpt-4-turbo-preview", // or "gemini-pro"
        messages: [
          {
            role: "system",
            content: "You are an AI specialized in verifying Campus Ambassador tasks. Analyze the provided data and determine if the task was completed successfully."
          },
          {
            role: "user",
            content: `Analyze this task submission: ${JSON.stringify(taskData)}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};
