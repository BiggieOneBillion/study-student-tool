"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import TopInfo from "./top-info";
import MyLearningTopics from "./my-learning-topics";
import TopicPortalView from "./topic-portal-view";
import { useAuthStore } from "@/store/user-store";
import { useGlobal } from "@/hooks/use-global";
import { QueryError } from "@/components/global/query-error";
import AiTutorChat from "@/components/ai-tutor-chat";
import { Button } from "@/components/ui/button";
import { LoaderCircle, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import markdown processing libraries
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { toast } from "sonner";
import "./learning-modal.css";
import "./modal-content.css"; // New CSS file for modal content

type myLearningViewType = {
  id: string;
};

const MyLearningView = ({ id }: myLearningViewType) => {
  const details = useAuthStore((state) => state.details);
  const context = useGlobal();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formattedText, setFormattedText] = useState("");

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const response = await axios.get(`/api/study-plan/${details.id}`);
      return response.data;
    },
    refetchInterval: 100000,
  });

  // Process markdown when research response changes
  useEffect(() => {
    if (context?.newResearchResponse) {
      const processMarkdown = async () => {
        try {
          const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(context?.newResearchResponse);

          setFormattedText(String(file));
        } catch (error) {
          toast.error("Failed to format markdown, please refresh the page.");
        }
      };

      processMarkdown();
    }
  }, [context?.newResearchResponse]);

  if (isLoading) {
    return <div className="text-black">Loading...</div>;
  }

  if (isError) {
    return <QueryError refetch={refetch} />;
  }

  const result =
    data && data.length > 0
      ? data.filter((datum: object, index: number) => index === Number(id))
      : [];

  return (
    <main className="overflow-hiddeny h-full space-y-10">
      <Header />
      <section className="grid gap-5 xl:grid-cols-3">
        <div className="space-y-3">
          <TopInfo topic={result[0].topic} level={result[0].level} />
          <MyLearningTopics data={result} />
        </div>
        <section className="col-span-2 hidden max-h-[80vh] w-full flex-col gap-4 rounded-sm border bg-gray-50 p-5 xl:flex">
          <header className="sticky left-0 top-0 flex items-center justify-between gap-1">
            <section>
              <span className="text font-medium">Learning Area</span> -
              <span className="inline-block rounded-sm border bg-slate-100 px-1 py-1 text-sm">
                Click on any of the sub-topics to see the full explanantion to
                the lesson
              </span>
            </section>
            <section className="flex items-center gap-2">
              {/* {context?.newResearchResponse && (
              <ChatToStudyDocument doc={context?.newResearchResponse} />
            )} */}

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    AI Tutor Chat
                  </Button>
                </DialogTrigger>
                <DialogContent className="h-[90vh] w-full max-w-[90%] p-0">
                  <DialogHeader className="px-6 pb-2 pt-6">
                    <DialogTitle>AI Learning Assistant</DialogTitle>
                  </DialogHeader>

                  <div className="-mt-10 flex h-full">
                    {/* Left column: AI Tutor Chat */}
                    <div className="h-full w-1/2 border-r p-4">
                      {/* <h3 className="text-lg font-medium mb-2">Chat with AI Tutor</h3> */}
                      <div className="h-[calc(80vh-120px)]">
                        <AiTutorChat
                          standalone={true}
                          topic={result[0]?.topic}
                        />
                      </div>
                    </div>

                    {/* Right column: Research Response with unified markdown parser */}
                    <div className="h-full w-1/2 p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Study Material
                      </h3>
                      <div className="h-[calc(80vh-120px)] overflow-y-auto rounded-md bg-gray-50 p-4">
                        {context?.newResearchResponse ? (
                          formattedText ? (
                            <div className="modal-content-response">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: formattedText,
                                }}
                              />
                            </div>
                          ) : (
                            <div className="flex h-full items-center justify-center gap-1">
                              <LoaderCircle
                                size={16}
                                color="black"
                                className="animate-spin"
                              />{" "}
                              Loading explanation....
                            </div>
                          )
                        ) : (
                          <p className="italic text-gray-500">
                            Select a topic to see detailed information here.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

             
            </section>
          </header>

          {/* The actual content */}
          <TopicPortalView />
        </section>
      </section>
    </main>
  );
};

export default MyLearningView;

// {/* Floating chat button for mobile/tablet */}
// <div className="fixed bottom-4 right-4 lg:hidden z-50">
//   <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//     <DialogTrigger asChild>
//       <Button
//         size="icon"
//         className="h-12 w-12 rounded-full shadow-lg"
//       >
//         <MessageCircle size={20} />
//       </Button>
//     </DialogTrigger>
//     <DialogContent className="max-w-[95vw] w-full p-0 h-[80vh]">
//       <DialogHeader className="px-6 pt-6 pb-2">
//         <DialogTitle>AI Learning Assistant</DialogTitle>
//       </DialogHeader>

//       <div className="flex flex-col md:flex-row h-full">
//         {/* Top/Left column: AI Tutor Chat */}
//         <div className="md:w-1/2 w-full border-b md:border-b-0 md:border-r p-4 h-1/2 md:h-full">
//           <h3 className="text-lg font-medium mb-2">Chat with AI Tutor</h3>
//           <div className="h-[calc(40vh-80px)] md:h-[calc(80vh-120px)]">
//             <AiTutorChat
//               standalone={false}
//               topic={result[0]?.topic}
//             />
//           </div>
//         </div>

//         {/* Bottom/Right column: Research Response with unified markdown parser */}
//         <div className="md:w-1/2 w-full p-4 h-1/2 md:h-full">
//           <h3 className="text-lg font-medium mb-2">Study Material</h3>
//           <div className="bg-gray-50 p-4 rounded-md h-[calc(40vh-80px)] md:h-[calc(80vh-120px)] overflow-y-auto">
//             {context?.newResearchResponse ? (
//               formattedText ? (
//                 <div className="modal-content-response">
//                   <div dangerouslySetInnerHTML={{ __html: formattedText }} />
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center gap-1 h-full">
//                   <LoaderCircle size={16} color="black" className="animate-spin" />{" "}
//                   Loading explanation....
//                 </div>
//               )
//             ) : (
//               <p className="text-gray-500 italic">
//                 Select a topic to see detailed information here.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </DialogContent>
//   </Dialog>
// </div>
