import { IuserPreferences } from "@/context/global-context";

export function learningTemplate(topic: string, level: string, preferences?: IuserPreferences) {
  let prompt = `Generate detailed learning paths for a career ${topic} specified by the user with a difficulty level of ${level}.`;
  
  // Add learning preferences if available
  if (preferences) {
    prompt += ` The user prefers ${preferences.depthPreference === "depth" ? "in-depth explanations" : "broader overviews"} `;
    prompt += `and a ${preferences.pacePreference} learning pace. `;
    if (preferences.visualLearning) {
      prompt += "The user is a visual learner, so include visual learning resources when possible.";
    }
  }
  
  prompt += ` Provide specific steps and explanations to cover each area required to succeed, structured as valid JSON without any additional text or formatting. The structure should look like this:

[{
"id":1,
  "Courses": "title",
  "Learn": ["learn 1 in very few words not higher than 15 words", "learn 2 in very few words not higher than 15 words"],
}]

Only return valid JSON without backticks, additional text, or formatting.`;
  
  return prompt;
}

// Add new prompt for related topics
export function relatedTopicsPrompt(currentTopic: string, preferences?:IuserPreferences) {
  let prompt = `Based on the user's current interest in ${currentTopic}, suggest 5 related topics they might want to explore next.`;
  
  if (preferences) {
    if (preferences.depthPreference === 'depth') {
      prompt += " Focus on topics that would deepen their understanding of the current subject.";
    } else {
      prompt += " Focus on adjacent topics that would broaden their knowledge across related areas.";
    }
  }
  
  prompt += ` Return the response as a JSON array of strings without any additional text or formatting. For example: ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"]`;
  
  return prompt;
}

// Add new prompt for AI tutor
// export function tutorPrompt(message: string, topic: string, conversation: any[]) {
//   return `You are an AI tutor specializing in ${topic}. The user is asking: "${message}". 

// Provide a helpful, educational response that explains concepts clearly and accurately. If appropriate, include examples to illustrate your points.

// Only respond to questions related to ${topic} or general educational topics. If asked about unrelated topics, politely redirect the conversation back to learning.

// Keep your response concise but thorough.`;
// }

export function promptOutPut(topic: string, level: string) {
  return `Generate  10 level questions for this topic ${topic} with a hardness level of ${level}. Provide multiple-choice answer options for each question and clearly mark the correct answer. Return the response as an array of JSON objects with the following format for each question:

[
  {
    "question": "Your question here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct answer here"
  },
  {
    "question": "Your question here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct answer here"
  },
  ...
]

Only return valid JSON, without any additional text or formatting.`;
}

export function randomLearningTemplate(topic: string, level: string) {
  const learningTemplatesArr = [
    `Create structured learning paths for ${topic}. Break into daily skill-building exercises. Design progress validation system. Include enjoyment-to-effort ratio. Generate skill demonstration opportunities.
     My target level: ${level}.The structure should look like this:

[{
"id":1,
  "Courses": "title",
  "Learn": ["learn 1 in very few words not higher than 15 words", "learn 2 in very few words not higher than 15 words"],
}]

Only return valid JSON without backticks, additional text, or formatting`,
    `Design a 21-day rapid learning system for ${topic}. Structure into morning theory, afternoon practice, and evening review. Create dopamine-triggering rewards for each milestone. Include focus-state triggers and retention measurements.
My available time: all day and target level is ${level}.The structure should look like this:

[{
"id":1,
  "Courses": "title",
  "Learn": ["learn 1 in very few words not higher than 15 words", "learn 2 in very few words not higher than 15 words"],
}]

Only return valid JSON without backticks, additional text, or formatting`,
  ];
  const randomNumber = Math.floor(Math.random() * learningTemplatesArr.length);

  // console.log("RandomNumber",randomNumber);

  return learningTemplatesArr[randomNumber];
}

export function personalizedLearningTemplate(topic: string, level: string, preferences: IuserPreferences) {
  return `Generate a personalized learning path for ${topic} at ${level} level, optimized for a learner with these preferences:
  - Visual Learning: ${preferences.visualLearning ? 'High' : 'Low'} preference for visual content
  - Learning Style: Prefers ${preferences.depthPreference === 'depth' ? 'deep understanding of fewer topics' : 'broader coverage of more topics'}
  - Learning Pace: Prefers a ${preferences.pacePreference} pace

Provide specific steps and explanations structured as valid JSON without any additional text or formatting. The structure should look like this:

[{
"id":1,
  "Courses": "title",
  "Learn": ["learn 1 in very few words not higher than 15 words", "learn 2 in very few words not higher than 15 words"],
  "ResourceType": ["${preferences.visualLearning ? 'visual' : 'text'}", "${preferences.visualLearning ? 'interactive' : 'reading'}"],
  "TimeEstimate": "estimated time based on ${preferences.pacePreference} pace"
}]

Only return valid JSON without backticks, additional text, or formatting.`;
}

// export function aiTutorConversationTemplate(topic: string, question: string, conversationHistory: any[] = []) {
//   const historyText = conversationHistory.length > 0 
//     ? `Previous conversation: ${JSON.stringify(conversationHistory)}` 
//     : '';
  
//   return `You are an AI tutor specializing in ${topic}. Answer the following question in a clear, educational manner. ${historyText}

// Question: ${question}

// Provide a comprehensive yet concise answer that includes examples where appropriate. Format your response using Markdown for better readability.`;
// }

export function relatedTopicsRecommendationTemplate(currentTopic: string, userHistory: string[]) {
  return `Based on the user's current topic of study (${currentTopic}) and their previous topics (${userHistory.join(', ')}), recommend 3-5 related topics they might be interested in learning next.

Return the response as a JSON array of objects with the following format:

[
  {
    "topic": "Recommended topic name",
    "relevance": "Brief explanation of why this is relevant to their current learning path",
    "difficulty": "beginner|intermediate|advanced"
  }
]

Only return valid JSON without any additional text or formatting.`;
}
