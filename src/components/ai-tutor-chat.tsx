"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useGlobal } from "@/hooks/use-global";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface AiTutorChatProps {
  standalone?: boolean;
  topic?: string;
}

export default function AiTutorChat({ standalone = false, topic }: AiTutorChatProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const context = useGlobal();
  const conversation = useMemo(() => context?.aiTutorConversation.messages || [], []);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [conversation]);
  
  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      await context?.sendTutorMessage(message, topic);
      setMessage("");
      // Focus back on input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className={cn(
      "flex flex-col rounded-xl border border-gray-100 bg-white/70 shadow-lg backdrop-blur-sm overflow-hidden",
      standalone ? "h-full" : "h-[400px]"
    )}>
      <div className="p-4 border-b border-gray-100 bg-white/90">
        <h2 className="text-lg font-semibold">AI Tutor Chat</h2>
        <p className="text-sm text-gray-500">
          {standalone 
            ? "Ask any questions about programming and technology" 
            : `Ask questions about ${topic || context?.userSelection.topic || "this topic"}`}
        </p>
      </div>
      
      <ScrollArea 
        className="flex-1 p-4" 
        ref={scrollAreaRef}
      >
        {conversation.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Start a conversation with your AI tutor</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "flex gap-3 max-w-[80%]",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}>
                  <Avatar className="h-8 w-8">
                    {msg.role === "user" ? (
                      <AvatarFallback>U</AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src="/ai-avatar.png" />
                        <AvatarFallback>AI</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className={cn(
                    "rounded-lg p-3",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}>
                    <ReactMarkdown className="prose prose-sm max-w-none">
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-100 bg-white/90">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!message.trim() || isLoading}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}