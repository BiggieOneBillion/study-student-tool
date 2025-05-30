/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey as string);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt: string, apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey as string);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    // console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    throw new Error("Key Authentication Failed!, provide another one");
  }
}

export default run;
