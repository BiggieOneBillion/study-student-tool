"use client";
import { useGlobal } from "@/hooks/use-global";
import DisplayResponseContainer from "./display-response-container";
import Header from "./header";
import StudyForm from "./study-form";

export default function DashboardView() {
  const context = useGlobal();
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto md:px-4 py-6">
        <section className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-4">
            {/* Study Form Section */}
            <div className="rounded-xl border border-gray-100 bg-white/70 px-6 md:py-6 shadow-lg backdrop-blur-sm">
              <StudyForm />
            </div>
          </div>

          {/* Response Container Section */}
          {context?.responseGenarated && context?.responseGenarated.length > 0 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-100 bg-white/70 p-6 shadow-lg backdrop-blur-sm">
                <DisplayResponseContainer />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
