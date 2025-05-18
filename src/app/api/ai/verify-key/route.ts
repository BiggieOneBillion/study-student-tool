import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();
    
    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 });
    }
    
    // Test the API key with a minimal request
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Make a minimal request to verify the key works
    await model.generateContent("test");
    
    // If we get here, the key is valid
    return NextResponse.json({ status: true, message: "API key is valid" });
  } catch (error) {
    console.error("API key verification error:",  (error as Error));
    return NextResponse.json(
      { status: false, message: "API key is invalid" },
      { status: 400 }
    );
  }
}