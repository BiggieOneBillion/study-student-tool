import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";

// Get user preferences
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const userId = params.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      preferences: user.learningPreferences || {
        visualLearning: false,
        depthPreference: "breadth",
        pacePreference: "moderate",
      },
    });
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Update user preferences
export async function POST(  
    req: NextRequest,
    { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const userId = params.id;
    const { visualLearning, depthPreference, pacePreference } =
      await req.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.learningPreferences = {
      visualLearning,
      depthPreference,
      pacePreference,
    };

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
