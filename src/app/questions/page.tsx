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
import { getQuestions } from "../api/strapi/questions";
import { useQuery } from "@tanstack/react-query";
import { Option, QuestionResponse } from "../api/strapi/types/questions";
// const questions = [
//   {
//     id: 1,
//     question: "What type of meal are you looking for?",
//     options: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
//     multiSelect: false,
//   },
//   {
//     id: 2,
//     question: "How much time do you have to cook?",
//     options: ["Fast (<15 min)", "Medium (15-30 min)", "Long (30+ min)"],
//     multiSelect: false,
//   },
//   {
//     id: 3,
//     question: "Do you have any dietary preferences?",
//     options: [
//       "Vegetarian",
//       "Vegan",
//       "Gluten-Free",
//       "Low-Carb/Keto",
//       "No Preferences",
//     ],
//     multiSelect: false,
//   },
//   {
//     id: 4,
//     question: "Do you want a healthy option?",
//     options: ["Yes", "No Preference"],
//     multiSelect: false,
//   },
//   {
//     id: 5,
//     question: "Do you want something easy to make?",
//     options: ["Yes, easy recipes only", "No preference"],
//     multiSelect: false,
//   },
// ];

type formData = {
  [key: string]: string | string[];
};
const Questions = () => {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { isValid },
  } = useForm<formData>({ mode: "onChange" });

  const {
    data: questionsResponse,
    error,
    isLoading,
  } = useQuery<QuestionResponse>({
    queryKey: ["questions"],
    queryFn: async () => await getQuestions(),
  });

  const questions = useMemo(() => {
    return questionsResponse?.data || [];
  }, [questionsResponse]);

  useEffect(() => {
    if (questions && questions.length > step) {
      trigger(`${questions[step].id}`);
    }
  }, [step, trigger, questions]);

  // Check if we have questions before trying to render
  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">
            No questions available
          </h2>
          <p>Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  const { documentId, question, options, multiSelect } = questions[step];

  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const prevStep = () => {
    setStep((step) => step - 1);
  };
  const submitForm = (data: formData) => {
    console.log(data);
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">
            Loading questions...
          </h2>
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Failed to load questions
          </h2>
          <p className="mb-4">
            There was an error fetching questions: {(error as Error).message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen ">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-center justify-center min-h-screen py-2 px-4 text-center"
      >
        <div className="bg-white bg-opacity-75 backdrop-blur-sm rounded-xl p-8 shadow-md max-w-max">
          <h1 className="text-5xl font-bold text-orange-800 mb-4">
            {question}
          </h1>
          {multiSelect && (
            <p className="text-orange-800 font-semibold">Choose many</p>
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
                  checked={isOptionSelected(answer, documentId, multiSelect)}
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
                  <span className="text-lg font-medium">{answer.option}</span>

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
              <button
                type="button"
                onClick={prevStep}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Back
              </button>
            )}
            {step < questions.length - 1 ? (
              <button
                disabled={!isValid}
                type="button"
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                disabled={!isValid}
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            )}
          </div>
        </div>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </div>
  );
};
export default Questions;
