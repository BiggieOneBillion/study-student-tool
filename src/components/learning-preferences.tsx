"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/store/user-store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  visualLearning: z.boolean().default(false),
  depthPreference: z.enum(["depth", "breadth"]).default("breadth"),
  pacePreference: z.enum(["slow", "moderate", "fast"]).default("moderate"),
});

export default function LearningPreferences() {
  const [isLoading, setIsLoading] = useState(false);
  const details = useAuthStore((state) => state.details);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visualLearning: false,
      depthPreference: "breadth",
      pacePreference: "moderate",
    },
  });

  // Fetch existing preferences when component mounts
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!details.id) return;
      
      try {
        const response = await axios.get(`/api/user-preferences/${details.id}`);
        if (response.data?.learningPreferences) {
          const prefs = response.data.learningPreferences;
          form.reset({
            visualLearning: prefs.visualLearning || false,
            depthPreference: prefs.depthPreference || "breadth",
            pacePreference: prefs.pacePreference || "moderate",
          });
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, [details.id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!details.id) {
      toast.error("You must be logged in to save preferences");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`/api/user-preferences/${details.id}`, {
        learningPreferences: values,
      });
      toast.success("Learning preferences saved!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white/70 p-6 shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4">Learning Preferences</h2>
      <p className="text-gray-500 mb-6">
        Customize your learning experience by setting your preferences below.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="visualLearning"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Visual Learning</FormLabel>
                  <FormDescription>
                    Prefer visual examples and diagrams when learning
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="depthPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Depth</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select depth preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="depth">Deep Understanding</SelectItem>
                    <SelectItem value="breadth">Broad Overview</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose whether you prefer to learn topics in-depth or get a broader overview
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="pacePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Pace</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pace preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="slow">Thorough (Slower Pace)</SelectItem>
                    <SelectItem value="moderate">Balanced</SelectItem>
                    <SelectItem value="fast">Accelerated</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your preferred learning speed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </form>
      </Form>
    </div>
  );
}