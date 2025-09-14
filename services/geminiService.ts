
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

// FIX: Removed `as string` cast to strictly follow API key guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        riskScore: {
            type: Type.INTEGER,
            description: "A numerical score from 0 to 100, where 100 is the highest risk of being a scam.",
        },
        summary: {
            type: Type.STRING,
            description: "A single, concise sentence summarizing the overall risk assessment."
        },
        explanation: {
            type: Type.STRING,
            description: "A detailed but easy-to-understand explanation of why the opportunity is or isn't risky, referencing specific details provided by the user.",
        },
        redFlags: {
            type: Type.ARRAY,
            description: "A list of specific red flags or warning signs identified from the user's description.",
            items: {
                type: Type.STRING,
            },
        },
    },
    required: ["riskScore", "summary", "explanation", "redFlags"],
};


export const analyzeScheme = async (details: string): Promise<AnalysisResult> => {
    try {
        const prompt = `
            Act as a highly experienced financial fraud analyst. Your goal is to help a concerned user determine if a financial or business opportunity is a potential scam (like a pyramid scheme, Ponzi scheme, or other fraud).

            Analyze the following description provided by the user. Based *only* on the information they've given, evaluate the risk level and identify common red flags.

            User's description:
            "${details}"

            Provide your analysis in a JSON format. The risk score should be your primary output, reflecting your confidence that this is a scam. The explanation should be clear, direct, and avoid jargon. Be very specific about which parts of the user's description are concerning.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.2,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText) as AnalysisResult;
        
        // FIX: Improved validation of the parsed result to ensure all expected fields are present and of the correct type.
        if (
            typeof parsedResult.riskScore !== 'number' || 
            typeof parsedResult.summary !== 'string' ||
            typeof parsedResult.explanation !== 'string' ||
            !Array.isArray(parsedResult.redFlags)
        ) {
            throw new Error("AI response was not in the expected format.");
        }

        return parsedResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI. The service may be temporarily unavailable.");
    }
};
