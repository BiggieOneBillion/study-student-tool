"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobal } from "@/hooks/use-global";

const formSchema = z.object({
  topic: z.string(),
  level: z.string(),
});

export const loadingPhrases = [
  "Gathering resources...",
  "Surfing the internet...",
  "Preparing your journey...",
  "Fetching the best results...",
  "Compiling data...",
];

export default function StudyForm() {
  const languages = [
    {
      label: "Javascript",
      value: "Javascript",
    },
    {
      label: "Python",
      value: "Python",
    },
    {
      label: "Go",
      value: "Go",
    },
    {
      label: "Frontend",
      value: "Frontend",
    },
    {
      label: "Backend",
      value: "Backend",
    },
    {
      label: "DevOps",
      value: "DevOps",
    },
    {
      label: "Cloud Computing",
      value: "Cloud Computing",
    },
    {
      label: "AI",
      value: "AI",
    },
    {
      label: "CI/CD",
      value: "CI/CD",
    },
    {
      label: "Cybersecurity",
      value: "Cybersecurity",
    },
    {
      label: "Data Science",
      value: "Data Science",
    },
    {
      label: "Data Analysis",
      value: "Data Analysis",
    },
  ] as const;

  const context = useGlobal();

  const [buttonText, setButtonText] = useState("Submit");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [counter, setCounter] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //   console.log(values);
      context?.setUserSelection(values);
      setIsLoading(true);
      setCounter(0); // Reset counter when starting the loading
      setLoadingText(loadingPhrases[0]); // Set initial loading text
      context?.callresponse(values.topic, values.level);
      toast.success("Generating Syllabus!");
    } catch (error) {
      // console.error("Form submission error", error);
      toast.error("Please try again.");
    }
  }

  useEffect(() => {
    if (context?.responseGenarated) {
      if (context?.responseGenarated.length > 0) {
        setIsLoading(false);
        setButtonText("Done");
        // Navigate when data is generated
      }
    }
  }, [context?.responseGenarated]);

  useEffect(() => {
    // Change loading text every 2 seconds
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText(loadingPhrases[counter % loadingPhrases.length]);
        setCounter((prevCounter) => prevCounter + 1); // Update counter for next phrase
      }, 8000); // Update every 2 seconds

      return () => clearInterval(interval); // Clean up interval on unmount or when loading stops
    }
  }, [isLoading, counter, loadingPhrases]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
        <div className="flex w-full flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <div className="">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="my-[5px]">Topic of study</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full lg:w-[200px]">
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose what you want to learn
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level of intensity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    *beginner, intermediate, advanced
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              {loadingText}
            </span>
          ) : (
            buttonText
          )}
        </Button>
      </form>
    </Form>
  );
}
