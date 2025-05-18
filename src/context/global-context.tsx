"use client";
import run from "@/lib/gemini";
import { learningTemplate, randomLearningTemplate } from "@/lib/prompts";
// import generateContent from "@/lib/test-key-2";
// import { useKeyStore } from "@/store/api-store";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { toast } from "sonner";
import {} from // personalizedLearningTemplate,
// aiTutorConversationTemplate,
// relatedTopicsRecommendationTemplate,
"@/lib/prompts";
import { useAuthStore } from "@/store/user-store";
import axios from "axios";

type response = {
  id: number;
  Courses: string;
  Learn: string[];
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  messages: Message[];
  topic?: string;
};

export interface IuserPreferences {
  visualLearning: boolean;
  depthPreference: "depth" | "breadth";
  pacePreference: "slow" | "moderate" | "fast";
}

// Update the globalType to include new features
type globalType = {
  responseGenarated: response[];
  callMoreResearch: () => Promise<void>; // to further explain concepts
  callresponse: (
    topic: string,
    level: string,
    userPreferences: IuserPreferences,
  ) => Promise<void>; // to generate learning path
  generateRandomCallResponse: () => Promise<void>; // to generate random learning path
  selectedLabel: string; // selected sub topic for further research
  setSelectedLabel: Dispatch<SetStateAction<string>>; // set selected sub topic for further research
  setUserSelection: Dispatch<
    SetStateAction<{
      topic: string;
      level: string;
    }>
  >;
  userSelection: {
    topic: string;
    level: string;
  };
  newResearchResponse: string; // holds the sub-topic research response in details.
  isExplainingTopic: boolean;
  isLoadingExplanation: boolean;
  setIsLoadingExplaination: Dispatch<SetStateAction<boolean>>;
  handleGenerateQuestion: () => void;
  questionOutput: {
    question: string;
    options: string[];
    answer: string;
  }[];
  questionModal: boolean;
  setQuestionModal: Dispatch<SetStateAction<boolean>>;
  currentInfoIndex: number;
  setCurrentInfoIndex: Dispatch<SetStateAction<number>>;
  currentStudyPlan: object;
  setCurrentStudyPlan: Dispatch<SetStateAction<object>>;
  isApiKeyWorking: boolean;
  setIsApiKeyWorking: Dispatch<SetStateAction<boolean>>;
  aiTutorConversation: {
    messages: {
      role: string;
      content: string;
    }[];
  };
  sendTutorMessage: (message: string, topic?: string) => Promise<void>;
  clearTutorConversation: () => void;
  getRelatedTopics: (currentTopic: string) => Promise<string[]>;
  userPreferences: {
    visualLearning: boolean;
    depthPreference: "depth" | "breadth";
    pacePreference: "slow" | "moderate" | "fast";
  };
  loadUserPreferences: () => Promise<void>;
};

export const GlobalContext = createContext<globalType | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userSelection, setUserSelection] = useState({
    topic: "",
    level: "",
  });

  const [isApiKeyWorking, setIsApiKeyWorking] = useState<boolean>(true);

  const [responseGenarated, setResponseGenarated] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  // const [newresharch, setnewreshach] = useState("");
  const [newResearchResponse, setNewResearchResponse] = useState(""); // holds the sub-topic research response in details.
  const [isExplainingTopic, setIsExplainingTopic] = useState(false);
  const [isLoadingExplanation, setIsLoadingExplaination] = useState(true);
  const [questionOutput, setQuestion] = useState([]);
  const [questionModal, setQuestionModal] = useState(false);
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  const [currentStudyPlan, setCurrentStudyPlan] = useState({});

  const details = useAuthStore((state) => state.details);

  //   const [islabelempty, setIsLableEmpty] = useState(false);
  //   const [questionOutput, setQuestion] = useState([]);
  //   const [questionModal, setQuestionModal] = useState(false);

  //   const handleGenerateQuestion = async () => {
  //     const response = await run(promptOutPut);

  //     let newResponse = response.replaceAll(/```/g, "");
  //     const newResponse2 = newResponse.replaceAll("json", "");

  //     const FormatedResponse = JSON.parse(newResponse2);

  //     setQuestion(FormatedResponse);
  //     console.log(typeof FormatedResponse);
  //   };

  const [aiTutorConversation, setAiTutorConversation] = useState<Conversation>({
    messages: [],
  });

  // const fetchUserPreferences = async () => {
  //   const details = useAuthStore.getState().details;
  //   if (!details.id) return;

  //   try {
  //     const response = await axios.get(`/api/user-preferences/${details.id}`);
  //     if (response.data?.learningPreferences) {
  //       setUserPreferences(response.data.learningPreferences);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching preferences:", error);
  //   }
  // };

  const loadUserPreferences = useCallback(async () => {
    if (!details.id) return;

    try {
      const response = await axios.get(`/api/user-preferences/${details.id}`);
      if (response.data?.learningPreferences) {
        setUserPreferences(response.data.learningPreferences);
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  }, []);

  const getRelatedTopics = async (currentTopic: string) => {
    try {
      // This would call an API endpoint that uses Gemini to suggest related topics
      const response = await axios.post("/api/ai/related-topics", {
        currentTopic,
        userPreferences,
      });
      return response.data.topics || [];
    } catch (error) {
      console.error("Error getting related topics:", error);
      return [];
    }
  };

  const generateRandomCallResponse = async () => {
    const learning = randomLearningTemplate(
      userSelection.topic,
      userSelection.level,
    );
    // const value = useKeyStore.getState().key
    // const apiTest = await generateContent(value || process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

    // if (!apiTest.status) {
    //   setIsApiKeyWorking(false)
    //   return
    // }

    const responseOutput = await run(learning);

    if (responseOutput) {
      const newResponse = responseOutput.replaceAll(/`/g, "");
      const newResponse2 = newResponse.replaceAll("json", "");

      const FormatedResponse = JSON.parse(newResponse2);
      setResponseGenarated(FormatedResponse);
    } else {
      toast.error("Something Went Wrong, Network Error");
    }

    // setGeneratedResult(FormatedResponse); // update zustand store.
    // setSelectedLabel("");
  };

  // const callresponse = async (topic: string, level: string) => {
  //   const learning = learningTemplate(topic, level);

  //   try {
  //     const responseOutput = await run(learning);

  //     if (!responseOutput) {
  //       toast.error("Network Issue, No response");
  //     } else {
  //       const newResponse = responseOutput.replaceAll(/`/g, "");
  //       const newResponse2 = newResponse.replaceAll("json", "");

  //       const FormatedResponse = JSON.parse(newResponse2);
  //       setResponseGenarated(FormatedResponse);
  //     }
  //   } catch (error) {
  //     console.error("Error generating content:", error);
  //     toast.error("Failed to generate content");
  //     setIsApiKeyWorking(false);
  //   }
  // };

  //   const sanitizeResponse = (response) => {
  //     return response
  //       .replace(/[`"'~**]/g, "") // Remove unwanted characters
  //       .split("\n") // Split response into lines
  //       .map((line, index) => {
  //         if (line.startsWith("##")) {
  //           return {
  //             type: "heading",
  //             text: line.replace(/##/g, "").trim(),
  //             key: index,
  //           };
  //         } else if (line.endsWith(":")) {
  //           return {
  //             type: "subheading",
  //             text: line.replace(/-/g, ""),
  //             key: index,
  //           };
  //         } else if (line.startsWith("**")) {
  //           // Check for lines with **
  //           return {
  //             type: "boldText",
  //             text: line.replace(/\*\*/g, "").trim(),
  //             key: index,
  //           };
  //         }
  //         return { type: "text", text: line.trim(), key: index };
  //       });
  //   };

  const callMoreResearch = useCallback(async () => {
    setIsExplainingTopic(true);
    if (selectedLabel) {
      // const newResearch = `Explain in detail how ${selectedLabel} works. Provide a comprehensive explanation along with clear examples. Ensure that the result is well-structured, with appropriate spacing for readability. Please return the result in a properly formatted Markdown (MDX) structure, including appropriate headings, code blocks, and lists where necessary, and make sure to leave sufficient line breaks between sections for easy reading.`;

      const newResearch = `Provide a detailed explanation of how ${selectedLabel} functions. Your response should include:
Comprehensive Overview: Start with a thorough introduction to the concept, covering its purpose and significance.
Clear Examples: Include relevant examples that illustrate how ${selectedLabel} operates in practical scenarios.
Structured Format: Organize your explanation using appropriate headings and subheadings for easy navigation.
Markdown (MDX) Formatting: Use Markdown formatting to enhance readability, including:
Code blocks for any technical examples or code snippets
Bullet points or numbered lists where applicable
Spacing for Readability: Ensure there are ample line breaks between sections to facilitate easy reading.
Please deliver the final result in a well-structured Markdown format`;

      try {
        const callMoreResearchOutput = await run(newResearch);
        // const newResponse = sanitizeResponse(callMoreResearchOutput);
        if (!callMoreResearchOutput) {
          toast.error("Explanation not avaliable, Try again");
        } else {
          setNewResearchResponse(callMoreResearchOutput);
          setIsLoadingExplaination(false);
        }
      } catch (error) {
        console.error("Error in callMoreResearch:", error);
      }
    } else {
      // console.warn("Selected label is empty, skipping research call.");
    }
  }, []);

  const promptOutPut = `Generate  10 level questions for this topic ${selectedLabel}. Provide multiple-choice answer options for each question and clearly mark the correct answer. Return the response as an array of JSON objects with the following format for each question:

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

  const handleGenerateQuestion = async () => {
    const response = await run(promptOutPut);

    if (response) {
      const newResponse = response.replaceAll(/```/g, "");
      const newResponse2 = newResponse.replaceAll("json", "");

      const FormatedResponse = JSON.parse(newResponse2);
      //  const FormatedResponseoutput = FormatedResponse.replace(/```/g, "").replace(/json/g, "").trim();

      setQuestion(FormatedResponse);
    } else {
      toast.error("Quiz data error, try again later");
    }

    // console.log(typeof FormatedResponse);
  };

  useEffect(() => {
    if (selectedLabel) callMoreResearch();
  }, [selectedLabel, callMoreResearch]);

  // User authentication and preferences
  const user = useAuthStore((state) => state.details);

  // New state for personalization features
  const [userPreferences, setUserPreferences] = useState({
    visualLearning: false,
    depthPreference: "breadth" as "depth" | "breadth",
    pacePreference: "moderate" as "slow" | "moderate" | "fast",
  });

  // const [tutorConversation, setTutorConversation] = useState<{
  //   messages: any[];
  //   isLoading: boolean;
  // }>({
  //   messages: [],
  //   isLoading: false,
  // });

  // const [recommendedTopics, setRecommendedTopics] = useState([]);
  // const [isLoadingRecommendations, setIsLoadingRecommendations] =
  //   useState(false);

  // Fetch user preferences when user changes
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`/api/user/preferences/${user.id}`);
        if (response.data.preferences) {
          setUserPreferences(response.data.preferences);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, [user]);

  // Update callresponse to use personalized learning template
  // const callresponse = async (topic: string, level: string) => {
  //   const learning = personalizedLearningTemplate(
  //     topic,
  //     level,
  //     userPreferences,
  //   );

  //   try {
  //     const responseOutput = await run(learning);

  //     if (!responseOutput) {
  //       toast.error("Network Issue, No response");
  //     } else {
  //       const newResponse = responseOutput.replaceAll(/`/g, "");
  //       const newResponse2 = newResponse.replaceAll("json", "");

  //       const FormatedResponse = JSON.parse(newResponse2);
  //       setResponseGenarated(FormatedResponse);

  //       // Track user performance
  //       if (user?.id) {
  //         try {
  //           await axios.post(`/api/user/metrics/${user.id}`, {
  //             topicStarted: topic,
  //             level: level,
  //           });
  //         } catch (error) {
  //           console.error("Error tracking performance:", error);
  //         }
  //       }

  //       // Infer preferences if not explicitly set
  //       if (!userPreferences.inferred && user?.id) {
  //         // Simple inference based on topic and level
  //         const inferredPreferences = {
  //           ...userPreferences,
  //           inferred: true,
  //         };

  //         // Infer visual learning preference for certain topics
  //         if (["Frontend", "UI/UX", "Data Visualization"].includes(topic)) {
  //           inferredPreferences.visualLearning = true;
  //         }

  //         // Infer depth preference based on level
  //         if (level === "advanced") {
  //           inferredPreferences.depthPreference = "depth";
  //         }

  //         // Save inferred preferences
  //         try {
  //           await axios.post(
  //             `/api/user/preferences/${user.id}`,
  //             inferredPreferences,
  //           );
  //           setUserPreferences(inferredPreferences);
  //         } catch (error) {
  //           console.error("Error saving inferred preferences:", error);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error generating content:", error);
  //     toast.error("Failed to generate content");
  //     setIsApiKeyWorking(false);
  //   }
  // };

  const sendTutorMessage = async (message: string, topicOverride?: string) => {
    const userMessage: Message = { role: "user", content: message };

    // Update conversation with user message
    setAiTutorConversation((prev) => ({
      ...prev,
      topic: topicOverride || prev.topic || userSelection.topic,
      messages: [...prev.messages, userMessage],
    }));

    try {
      // Create prompt based on context and preferences
      const currentTopic =
        topicOverride || aiTutorConversation.topic || userSelection.topic;
      let prompt = `You are an AI tutor helping with ${currentTopic}. `;

      // Add learning preferences to prompt
      prompt += `The user prefers ${userPreferences.depthPreference === "depth" ? "in-depth explanations" : "broader overviews"} `;
      prompt += `and a ${userPreferences.pacePreference} learning pace. `;
      if (userPreferences.visualLearning) {
        prompt +=
          "The user is a visual learner, so use diagrams, code examples, and visual descriptions when possible. ";
      }

      // Add conversation history and current message
      prompt += "\n\nConversation history:\n";
      aiTutorConversation.messages.forEach((msg) => {
        prompt += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`;
      });
      prompt += `\nUser: ${message}\n\nAssistant: `;

      // Get response from Gemini
      const response = await run(prompt);

      // Add assistant response to conversation
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };
      setAiTutorConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
      }));

      // Save conversation if user is logged in
      if (details.id) {
        await axios.post(`/api/user/conversations/${details.id}`, {
          topic: currentTopic,
          messages: [
            ...aiTutorConversation.messages,
            userMessage,
            assistantMessage,
          ],
        });
      }
    } catch (error) {
      console.error("Error in AI tutor conversation:", error);
      // Add error message to conversation
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
      };
      setAiTutorConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  const clearTutorConversation = () => {
    setAiTutorConversation({ messages: [] });
  };

  // Update the callresponse function to include personalization
  const callresponse = async (
    topic: string,
    level: string,
    userPreferences: IuserPreferences,
  ) => {
    const learning = learningTemplate(topic, level, userPreferences);

    try {
      const responseOutput = await run(learning);

      if (!responseOutput) {
        toast.error("Network Issue, No response");
      } else {
        const newResponse = responseOutput.replaceAll(/`/g, "");
        const newResponse2 = newResponse.replaceAll("json", "");

        const FormatedResponse = JSON.parse(newResponse2);
        setResponseGenarated(FormatedResponse);

        // Track this in user performance metrics if logged in
        const details = useAuthStore.getState().details;
        if (details.id) {
          await axios.post(`/api/performance/${details.id}`, {
            action: "generated_plan",
            topic,
            level,
          });
        }
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content");
      setIsApiKeyWorking(false);
    }
  };

  // Load recommended topics based on user history
  // const loadRecommendedTopics = async () => {
  //   if (!user?.id || !userSelection.topic) return;

  //   setIsLoadingRecommendations(true);

  //   try {
  //     // Get user's learning history
  //     const response = await axios.get(`/api/user/history/${user.id}`);
  //     const topicsHistory = response.data.topicsHistory || [];

  //     // Generate recommendations
  //     const prompt = relatedTopicsRecommendationTemplate(
  //       userSelection.topic,
  //       topicsHistory,
  //     );
  //     const responseOutput = await run(prompt);

  //     if (!responseOutput) {
  //       toast.error("Failed to generate recommendations");
  //       setIsLoadingRecommendations(false);
  //       return;
  //     }

  //     // Parse and set recommendations
  //     const cleanResponse = responseOutput
  //       .replaceAll(/`/g, "")
  //       .replaceAll("json", "");
  //     const recommendations = JSON.parse(cleanResponse);
  //     setRecommendedTopics(recommendations);
  //   } catch (error) {
  //     console.error("Error loading recommendations:", error);
  //     toast.error("Failed to load topic recommendations");
  //   } finally {
  //     setIsLoadingRecommendations(false);
  //   }
  // };

  // Load preferences when user changes
  useEffect(() => {
    loadUserPreferences();
  }, [details.id, loadUserPreferences]);

  // ... existing code and return statement ...

  return (
    <GlobalContext.Provider
      value={{
        userSelection,
        responseGenarated,
        callMoreResearch, // to further explain concepts
        callresponse, // to generate learning path
        selectedLabel, // selected sub topic for further research
        setSelectedLabel, // set selected sub topic for further research
        setUserSelection, // set user selection of topic and level
        generateRandomCallResponse,
        newResearchResponse, // holds the sub-topic research response in details.
        isExplainingTopic,
        isLoadingExplanation,
        setIsLoadingExplaination,
        handleGenerateQuestion,
        questionModal,
        questionOutput,
        setQuestionModal,
        currentInfoIndex,
        setCurrentInfoIndex,
        currentStudyPlan,
        setCurrentStudyPlan,
        isApiKeyWorking,
        setIsApiKeyWorking,
        sendTutorMessage,
        clearTutorConversation,
        aiTutorConversation,
        getRelatedTopics,
        loadUserPreferences,
        userPreferences,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
