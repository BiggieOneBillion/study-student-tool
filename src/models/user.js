import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  studyMaterials: {
    type: Array,
    required: false,
    default: [],
  },
  researchDocs: {
    owner: [{ type: Schema.Types.ObjectId, ref: "Docs" }],
    shared: [{ type: Schema.Types.ObjectId, ref: "Docs" }],
  },
  learningPreferences: {
    visualLearning: { type: Boolean, default: false },
    depthPreference: { type: String, enum: ["depth", "breadth"], default: "breadth" },
    pacePreference: { type: String, enum: ["slow", "moderate", "fast"], default: "moderate" },
    lastUpdated: { type: Date, default: Date.now }
  },
  aiConversations: [{
    topic: String,
    messages: [{
      role: { type: String, enum: ["user", "assistant"] },
      content: String,
      timestamp: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
  }]
});

const User = models.User || model("User", userSchema);

export default User;
