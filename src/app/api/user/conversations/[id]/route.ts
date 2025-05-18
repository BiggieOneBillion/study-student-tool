import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";

// Save conversation
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const userId = params.id;
    const { topic, messages } = await req.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add new conversation
    user.aiConversations.push({
      topic,
      messages,
      createdAt: new Date(),
    });

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving conversation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Get conversations
export async function GET(    req: NextRequest,
    { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const userId = params.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      conversations: user.aiConversations || [],
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
