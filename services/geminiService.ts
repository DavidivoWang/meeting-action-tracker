
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function extractActionItemsFromText(notes: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract action items from these meeting notes. For each action item, identify the task title, the person responsible (owner), and a likely due date (use YYYY-MM-DD format, defaulting to 7 days from today if none specified). Notes: ${notes}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            owner: { type: Type.STRING },
            dueDate: { type: Type.STRING },
          },
          required: ["title", "owner", "dueDate"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
}
