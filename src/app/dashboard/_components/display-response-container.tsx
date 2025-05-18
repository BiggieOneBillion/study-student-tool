"use client";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useGlobal } from "../../../hooks/use-global";
import { Loader2, RefreshCcw, SaveIcon, BookOpen } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import SaveToReplaceAlert from "./save-to-replace-alert";
import { useAuthStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

type materialType = {
  topic: string | undefined;
  level: string | undefined;
  info: object | undefined;
};

const DisplayResponseContainer = () => {
  const router = useRouter();
  const context = useGlobal();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Save study plan");
  const [isOpen, setIsOpen] = useState(false);
  const [material, setMaterial] = useState<materialType>({
    topic: "",
    level: "",
    info: {},
  });

  const details = useAuthStore((state) => state.details);

  const handleSaveStudyPlan = async () => {
    setIsSaving(true);
    setBtnText("Saving...");
    const data = {
      topic: context?.userSelection.topic,
      level: context?.userSelection.level,
      info: context?.responseGenarated,
    };
    setMaterial(data);
    try {
      const result = await axios.post(`/api/study-plan/${details.id}`, data);
      if (result.status === 200) {
        setIsSaving(false);
        setSaveBtnDisabled(true);
        setBtnText("Study plan saved");
        toast.success("Study Material Saved");
      }
    } catch (error) {
      setIsSaving(false);
      // console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "Study plan already exist") {
          setIsOpen(true);
          setBtnText("Already Exist");
          toast.error("Study Syllabus Already Exist")
        } else {
          toast.success("Error Saving Study Material");
          setBtnText("Try Again");
        }
      }
    }
  };

  const handleSaveAndLearn = async () => {
    setIsSaving(true);
    setBtnText("Saving...");
    const data = {
      topic: context?.userSelection.topic,
      level: context?.userSelection.level,
      info: context?.responseGenarated,
    };
    setMaterial(data);
    try {
      const result = await axios.post(`/api/study-plan/${details.id}`, data);
      if (result.status === 200) {
        setIsSaving(false);
        setSaveBtnDisabled(true);
        setBtnText("Study plan saved");
        toast.success("Study Material Saved");
        
        // Navigate to the materials page
        router.push("/dashboard/materials");
      }
    } catch (error) {
      setIsSaving(false);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "Study plan already exist") {
          // If the plan already exists, we can still navigate to materials
          toast.success("Study plan already exists. Redirecting to learning page...");
          router.push("/dashboard/materials");
        } else {
          toast.error("Error Saving Study Material");
          setBtnText("Try Again");
        }
      }
    }
  };

  useEffect(() => {
    if (context?.responseGenarated) {
      if (context.responseGenarated.length > 0) {
        setIsLoading(false);
        setSaveBtnDisabled(false);
        setBtnText("Save study plan");
      }
    }
  }, [context?.responseGenarated]);

  return (
    <section className="px-4y flex w-full flex-col items-start gap-5 bg-white pt-5">
      {isLoading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center border-b border-gray-200 bg-black/40 dark:border-gray-800">
          <p className="flex items-center gap-2 text-white">
            <Loader2 className="animate-spin" size={16} /> Generating study
            plan...
          </p>
        </div>
      )}
      {isOpen && (
        <SaveToReplaceAlert
          data={material}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <section>
        <h2 className="text font-medium capitalize">Generated Study Plan</h2>
        <p className="text-sm">
          Don&apos;t like this one, Not to worry we can generate another one
        </p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center">
          <button
            onClick={() => {
              setIsLoading(true);
              context?.generateRandomCallResponse();
            }}
            className="flex w-fit items-center gap-2 rounded-md border px-2 py-2 text-left text-xs sm:text-sm"
          >
            <RefreshCcw
              size={16}
              className={`${isLoading && "animate-spin"}`}
            />{" "}
            Generate another study plan
          </button>
          <button
            disabled={saveBtnDisabled}
            onClick={handleSaveStudyPlan}
            className="flex w-fit items-center gap-2 rounded-md border px-2 py-2 text-xs disabled:opacity-50 sm:text-sm"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {btnText}
              </>
            ) : (
              <>
                <SaveIcon size={16} />
                {btnText}
              </>
            )}
          </button>
          <button
            disabled={saveBtnDisabled}
            onClick={handleSaveAndLearn}
            className="flex w-fit items-center gap-2 rounded-md border bg-blue-50 px-2 py-2 text-xs text-blue-700 hover:bg-blue-100 disabled:opacity-50 sm:text-sm"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <BookOpen size={16} />
                Save and Learn
              </>
            )}
          </button>
        </div>
      </section>
      <div className="mx-auto w-full max-w-4xl flex-1 overflow-y-scroll px-2">
        {context?.responseGenarated.map((result) => (
          <div className="mb-6 rounded-md bordery bg-slate-50 p-6" key={v4()}>
            <h2 className="mb-4 text-lg font-semibold text-black">
              {result.Courses}
            </h2>
            <div className="pl-4">
              <h3 className="mb-2 font-medium text-black">Things to learn</h3>
              {/* <p className="mb-3 text-xs text-slate-500">
                Click on each of the lessons to take them.
              </p> */}
              <ol className="list-decimal space-y-0 pl-5">
                {result.Learn &&
                  result.Learn.map((lesson) => (
                    <li key={v4()}>
                      <button className="w-full text-slate-500 rounded-md bordery px-3 py-2 text-left text-sm hover:bg-gray-50">
                        {lesson}
                      </button>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DisplayResponseContainer;
