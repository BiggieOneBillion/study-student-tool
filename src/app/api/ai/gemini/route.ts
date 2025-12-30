import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const geminiRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  model: z.string().default("gemini-1.5-flash"),
});

// Server-side environment variable
const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const result = geminiRequestSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { prompt, model } = result.data;

    const genAI = new GoogleGenerativeAI(API_KEY as string);
    const genModel = genAI.getGenerativeModel({ model });

    const aiResult = await genModel.generateContent(prompt);
    const response = await aiResult.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to generate content" },
      { status: 500 }
    );
  }
}