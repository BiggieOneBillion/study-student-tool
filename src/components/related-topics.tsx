"use client";

import { useState, useEffect } from "react";
import { useGlobal } from "@/hooks/use-global";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import run from "@/lib/gemini";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RelatedTopics() {
  const [isLoading, setIsLoading] = useState(false);
  const [relatedTopics, setRelatedTopics] = useState<string[]>([]);
  const [isLoadingNewTopic, setIsLoadingNewTopic] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const context = useGlobal();
  
  const generateRelatedTopics = async () => {
    if (!context?.userSelection.topic) return;
    
    setIsLoading(true);
    try {
      const prompt = `Based on the user's interest in ${context.userSelection.topic}, suggest 5 related topics they might want to learn next. Return only a JSON array of strings with no additional text or formatting. For example: ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"]`;
      
      const response = await run(prompt);
      let topics: string[] = [];
      
      try {
        // Clean the response and parse JSON
        const cleanedResponse = response.replace(/```json|```/g, '').trim();
        topics = JSON.parse(cleanedResponse);
      } catch (error) {
        console.error("Error parsing related topics:", error);
        topics = [];
      }
      
      setRelatedTopics(topics.slice(0, 5));
    } catch (error) {
      console.error("Error generating related topics:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTopicSelect = (topic: string) => {
    if (context) {
      setSelectedTopic(topic);
      setIsLoadingNewTopic(true);
      
      context.setUserSelection({
        topic,
        level: context.userSelection.level,
      });
      context.callresponse(topic, context.userSelection.level, context.userPreferences);
    }
  };

  useEffect(() => {
    if (context?.responseGenarated && context.responseGenarated.length > 0) {
      generateRelatedTopics();
      // When new response is generated, close the loading modal
      if (isLoadingNewTopic) {
        setIsLoadingNewTopic(false);
      }
    }
  }, [context?.responseGenarated, generateRelatedTopics, isLoadingNewTopic ]);
  
  if (!context?.responseGenarated || context.responseGenarated.length === 0) {
    return null;
  }
  
  return (
    <>
      <Dialog open={isLoadingNewTopic} onOpenChange={setIsLoadingNewTopic}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generating Study Plan</DialogTitle>
            <DialogDescription>
              Creating your personalized study plan for {selectedTopic}...
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            This may take a few moments
          </div>
        </DialogContent>
      </Dialog>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Related Topics You Might Like</CardTitle>
          <CardDescription>Based on your current study plan</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {relatedTopics.map((topic, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  onClick={() => handleTopicSelect(topic)}
                >
                  {topic}
                </Button>
              ))}
              {relatedTopics.length === 0 && (
                <p className="text-sm text-gray-500">No related topics found</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}