/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// import { useAuthStore } from "@/store/user-store";

// // Get the store instance
// const authStore = useAuthStore;

// // Access the current state
// const currentState = authStore.getState();
// console.log("Details:", currentState.details);
// console.log("Is Authenticated:", currentState.isAuthenticated);

// // Update the state
// authStore.setState({ isAuthenticated: true });
// authStore.setState({ details: { email: "test@example.com" } });

// import { useKeyStore } from "@/store/api-store";
// import { GoogleGenerativeAI } from "@google/generative-ai";

async function run(prompt: string) {
  try {
    const response = await fetch('/api/ai/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate content');
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export default run;
