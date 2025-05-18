"use client";
import { useGlobal } from "@/hooks/use-global";
import DisplayResponseContainer from "./display-response-container";
import Header from "./header";
import StudyForm from "./study-form";
// import LearningPreferences from "@/components/learning-preferences";
// import AiTutorChat from "@/components/ai-tutor-chat";
import RelatedTopics from "@/components/related-topics";

export default function DashboardView() {
  const context = useGlobal();
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto py-6 md:px-4">
        <section className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-4">
            {/* Study Form Section */}
            <div className="rounded-xl border border-gray-100 bg-white/70 px-6 shadow-lg backdrop-blur-sm md:py-6">
              <StudyForm />
            </div>

            {/* Learning Preferences Section */}
            {/* <LearningPreferences /> */}
            {/* Related Topics Section */}
            <RelatedTopics />
          </div>

          {/* Response Container Section */}
          {context?.responseGenarated &&
            context?.responseGenarated.length > 0 && (
              <div className="space-y-4 ">
                <div className="rounded-xl border border-gray-100 bg-white/70 p-6 shadow-lg backdrop-blur-sm  lg:h-[80vh] overflow-y-scroll">
                  <DisplayResponseContainer />
                </div>

                {/* AI Tutor Chat Section */}
                {/* {context?.responseGenarated && (
                  <div className="overflow-hidden rounded-xl border border-gray-100 bg-white/70 shadow-lg backdrop-blur-sm">
                    <AiTutorChat topic={context.userSelection.topic} />
                  </div>
                )} */}
              </div>
            )}
        </section>
      </div>
    </main>
  );
}
