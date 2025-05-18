import React, { useEffect } from "react";
// import useQuiz from "../../hooks/useQuiz";
import useQuiz from "../../../../../../hooks/use-quiz";
import { LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Conditions from "@/components/global/single-conditions";
import TeneryConditions from "@/components/global/tenery-conditions";
import { useGlobal } from "@/hooks/use-global";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/user-store";

type Props = {
  setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>;
};

function Quiz({ setShowQuiz }: Props) {
  const {
    questionOutput,
    questionModal,
    alertText,
    quizEndText,
    displayResponse,
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    handleNextQuestion,
    handleOptionChange,
  } = useQuiz();

  const context = useGlobal();

  const router = useRouter();

  const details = useAuthStore((state) => state.details);

  const queryClient = useQueryClient()

  const params = useParams();

  const id = params.id;

  const { data } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const response = await axios.get(`/api/study-plan/${details.id}`);
      return response.data;
    },
  });

  const handleBtnClick = () => {
    // context?.setSelectedLabel(topic);
    context?.callMoreResearch();
    context?.setIsLoadingExplaination(true);
    context?.setCurrentInfoIndex(context?.currentInfoIndex + 1);
    if (data && data.length > 0) {
      const studyplan = data.filter(
        (datum: object, index: number) => index === Number(id),
      );
      context?.setCurrentStudyPlan(studyplan[Number(id)]);
    }
    // context?.setCurrentStudyPlan(studyplan);
    // size.width! <= 760 && router.push("explanation"); //! this is only to run when on mobile screen only
  };

  const handleCloseQuizModal = () => setShowQuiz(false);

  useEffect(() => {
    if (!questionModal) {
      router.back(); // or return to the home page.
    }
  }, [questionModal, router]);

  return (
    <div>
      {questionModal && (
        <div className="fixed right-0 top-0 flex h-[100vh] w-[100vw] items-center justify-center bg-white">
          <div className="sm:h-[60vh]y bordery h-[50vh] w-[97vw] rounded-2xl py-10 sm:max-w-[700px]">
            <div className="flex items-center gap-5 px-4">
              <button
                onClick={handleCloseQuizModal}
                className="hidden bg-black px-2 py-1 text-sm font-medium text-white lg:inline"
              >
                Cancel
              </button>
              <p className="mx-auto py-1 text-center">
                Test Your progress From This Course{" "}
              </p>
            </div>
            <div className="h-[45vh]y p-4">
              <TeneryConditions
                condition={Boolean(
                  questionOutput && questionOutput.length !== 0,
                )}
                ifTrue={
                  <div className="flex flex-col">
                    <div className="flex w-full flex-col gap-10 rounded-[12px] border p-[30px]">
                      <div className="space-y-6">
                        {/* congratulation text */}
                        <Conditions condition={Boolean(alertText)}>
                          <p className="text-base text-[#18A09A]">
                            {alertText}😎🥳
                          </p>
                        </Conditions>
                        <Conditions condition={!alertText}>
                          <>
                            {/* quiz question */}
                            <p className="mb-1 flex items-start gap-2 text-[16px] font-[500] text-[#1B1B1B]">
                              <span className="text-black">
                                {currentQuestionIndex + 1}.
                              </span>
                              {currentQuestion?.question}
                            </p>
                            {/* quiz options */}
                            <ul>
                              {currentQuestion?.options.map((option, index) => (
                                <div
                                  key={index}
                                  className="mb-2 flex items-center gap-2"
                                >
                                  <input
                                    id={`option-${index}`}
                                    name="answer"
                                    type="radio"
                                    checked={selectedOption === option}
                                    value={option}
                                    onChange={() => handleOptionChange(option)}
                                  />
                                  <label
                                    className="text-[14px] font-[500] text-[#515151]"
                                    htmlFor={`option-${index}`}
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </ul>
                          </>
                        </Conditions>
                      </div>
                      <div className="flex flex-col gap-1">
                        {!Boolean(alertText) && (
                          <p className="text-sm text-gray-600">
                            {displayResponse}
                          </p>
                        )}
                        <TeneryConditions
                          condition={Boolean(alertText)}
                          ifTrue={
                            <button
                              disabled={!quizEndText}
                              onClick={() => {
                                // window.location.reload();
                                context?.setQuestionModal(false);
                                queryClient.invalidateQueries({
                                  queryKey: ["material"],
                                }).then(()=> handleBtnClick());
                              }}
                              className="w-[100px]y flex h-[40px] items-center justify-center rounded-sm bg-black px-5 py-2 text-[13px] font-[600] text-[#FFFFFF] disabled:bg-black/40"
                            >
                              Go Back To Study
                            </button>
                          }
                          ifFalse={
                            <button
                              onClick={handleNextQuestion}
                              disabled={!selectedOption}
                              className="w-[100px]y flex h-[40px] items-center justify-center rounded-sm bg-[#18A09A] px-5 py-2 text-[13px] font-[600] text-[#FFFFFF]"
                            >
                              Next
                            </button>
                          }
                        />
                        <p className="text-sm text-black/80">{quizEndText}</p>
                      </div>
                    </div>
                  </div>
                }
                ifFalse={
                  <div className="flex h-[30vh] flex-col items-center justify-center text-[10px] text-red-600">
                    <LoaderCircle
                      size={16}
                      color="black"
                      className="animate-spin"
                    />{" "}
                    Loading quiz questions....
                  </div>
                }
              />
            </div>
          </div>
          {/* go back button */}
          <button
            onClick={() => router.back()}
            className="absolute left-10 top-20 z-[1000] w-fit bg-black px-2 py-1 text-sm font-medium text-white"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
