/**
 * Questions Component
 *
 * A multi-step form that collects user meal preferences through a series of questions.
 *
 * Features:
 * - Multi-step navigation with Next/Back buttons
 * - Support for both single-choice (radio) and multi-choice (checkbox) questions
 * - Form validation using React Hook Form
 *
 * Form Submission:
 * - Final form data is organized as an object with question IDs as keys
 * - Single-select questions have string values
 * - Multi-select questions have string array values
 *
 * Note for Checkbox Questions:
 * - Data could  expanded to multi-select in the future if needed
 * - Data should be in the form of an array of strings
 * - The Question object should have a multiSelect property to indicate checkbox functionality
 * 
 * Example Question Object:
 *    {
    id: number,
    question: string,
    options: [
      string,
    ],
    multiSelect: true, >> For checkbox functionality
  },
 * 
 * 
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Option } from "../../types/questions";
import { useQuestions } from "@/hooks/useQuestions";
import { AnimatePresence, motion } from "framer-motion";
import questionsVariants, {
  AnimationDirection,
} from "@/components/ui/framer-animations/questions";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Loading from "../loading";
import QuestionsErrorMessage from "@/components/questionsUI/QuestionsErrorMessage";
import QuestionsNotFound from "@/components/questionsUI/QuestionsNotFound";
import FormButton from "@/components/ui/buttons/FormButton";

type formData = {
  [key: string]: string | string[];
};
const Questions = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<AnimationDirection>(0);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<formData>({ mode: "onChange" });
  const {
    data: questionsResponse,
    isLoading,
    isError,
    error: questionsError,
    isFetching,
  } = useQuestions();

  const router = useRouter();

  const questions = useMemo(() => {
    return questionsResponse?.data || [];
  }, [questionsResponse]);

  useEffect(() => {
    if (questions && questions.length > step) {
      trigger(`${questions[step].id}`);
    }
  }, [step, trigger, questions]);

  if (isLoading || isFetching || isSubmitting || isSubmitSuccessful) {
    return <Loading />;
  }

  if (isError) {
    return <QuestionsErrorMessage error={questionsError as Error} />;
  }
  // Check if we have questions before trying to render
  if (!questions || questions.length === 0) {
    return <QuestionsNotFound />;
  }

  const { documentId, question, options, multiSelect } = questions[step];

  const nextStep = () => {
    setDirection(1);
    setStep((step) => step + 1);
  };
  const prevStep = () => {
    setDirection(-1);
    setStep((step) => step - 1);
  };
  const submitForm = async (data: formData) => {
    // console.log(data);
    try {
      setCookie("userAnswers", JSON.stringify(data), {
        maxAge: 60 * 15, // 15 mins
        path: "/",
      });

      // console.log(getCookie("userAnswers"));
      router.push("/recipeResult");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Conditionals helper function
  const isOptionSelected = (
    option: { id: number; option: string },
    questionId: string,
    multiSelect?: boolean
  ) => {
    if (multiSelect) {
      return (
        Array.isArray(watch(`${questionId}`)) &&
        watch(`${questionId}`)?.includes(option.option)
      );
    } else {
      return watch(`${questionId}`) === option.option;
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen ">
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-center justify-center min-h-screen py-2 px-4 text-center"
      >
        <div className="relative w-full max-w-2xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={questionsVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.1 },
              }}
              className="bg-white bg-opacity-75 backdrop-blur-sm rounded-xl p-8 shadow-md max-w-max"
            >
              <h1 className="text-5xl font-bold text-orange-800 mb-4">
                {question}
              </h1>
              {multiSelect && (
                <p className="text-orange-800 font-semibold">
                  Може да изберете повече от един отговор
                </p>
              )}
              <div className="space-y-3 mt-6 w-full max-w-xl mx-auto px-4">
                {options.map((answer: Option) => (
                  <div
                    key={answer.id}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                      isOptionSelected(answer, documentId, multiSelect)
                        ? "bg-gradient-to-r from-orange-500 to-amber-400 shadow-md shadow-orange-200"
                        : "bg-white hover:bg-orange-50"
                    }`}
                  >
                    <input
                      type={multiSelect ? "checkbox" : "radio"}
                      id={`question-${documentId}-option-${answer.id}`}
                      value={answer.option}
                      checked={isOptionSelected(
                        answer,
                        documentId,
                        multiSelect
                      )}
                      {...register(`${documentId}`, { required: true })}
                      className="absolute opacity-0"
                    />
                    <label
                      htmlFor={`question-${documentId}-option-${answer.id}`}
                      className={`flex items-center justify-between p-4 cursor-pointer w-full ${
                        isOptionSelected(answer, documentId, multiSelect)
                          ? "text-white"
                          : "text-orange-800"
                      }`}
                    >
                      <span className="text-lg font-medium">
                        {answer.option}
                      </span>

                      {/* The checkbox */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isOptionSelected(answer, documentId, multiSelect)
                            ? "bg-white text-orange-500"
                            : "bg-orange-100 text-orange-400"
                        }`}
                      >
                        {isOptionSelected(answer, documentId, multiSelect) ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        ) : multiSelect ? (
                          <span className="block w-4 h-4 rounded border-2 border-orange-400"></span>
                        ) : (
                          <span className="block w-4 h-4 rounded-full border-2 border-orange-400"></span>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex content-center gap-1 justify-around">
                {step > 0 && (
                  <FormButton
                    disabled={!isValid}
                    type="button"
                    onClick={prevStep}
                  >
                    Назад
                  </FormButton>
                )}
                {step < questions.length - 1 ? (
                  <FormButton
                    disabled={!isValid}
                    type="button"
                    onClick={nextStep}
                  >
                    Следващ
                  </FormButton>
                ) : (
                  <FormButton disabled={!isValid} type="submit">
                    Изпрати
                  </FormButton>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PREVIEW FOR DEBUGGING PURPOSES */}
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </div>
  );
};
export default Questions;
