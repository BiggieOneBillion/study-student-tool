import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Server-side environment variable (not exposed to client)
const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  // Verify user is authenticated
  // This could use your existing auth token verification
  
  try {
    const { prompt, model = "gemini-1.5-flash" } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    
    const genAI = new GoogleGenerativeAI(API_KEY as string);
    const genModel = genAI.getGenerativeModel({ model });
    
    const result = await genModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Gemini API error:",  (error as Error));
    return NextResponse.json(
      { error: (error as Error).message || "Failed to generate content" },
      { status: 500 }
    );
  }
}