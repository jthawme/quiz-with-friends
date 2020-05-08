import React, { useState, useCallback, useRef } from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { QuestionCreate } from "../components/QuestionCreate";
import { Answer } from "../core/types/question";

import "normalize.css";
import "../styles/global.scss";
import { getEntityId } from "../core/utils";

export default {
  title: "Create",
  decorators: [withKnobs],
};

export const QuestionSlice: React.FC = () => {
  const initialAnswerRef = useRef<string>(getEntityId());
  const idRef = useRef<string>(getEntityId());
  const [questionText, setQuestionText] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([
    {
      id: initialAnswerRef.current,
      text: "",
    },
  ]);
  const [correct, setCorrect] = useState<string>(initialAnswerRef.current);

  const updateQuestion = useCallback((id: string, questionText: string) => {
    setQuestionText(questionText);
  }, []);

  const updateAnswer = useCallback(
    (id: string, newAnswer: string, answerId: string) => {
      const currentAnswers = answers.slice();
      const index = currentAnswers.findIndex((a) => a.id === answerId);
      currentAnswers[index].text = newAnswer;
      setAnswers(currentAnswers);
    },
    [answers],
  );

  const addAnswer = useCallback(() => {
    setAnswers([
      ...answers,
      {
        id: getEntityId(),
        text: "",
      },
    ]);
  }, [answers]);

  const removeAnswer = useCallback(
    (id: string, answerId: string) => {
      const currentAnswers = answers.slice();
      const index = currentAnswers.findIndex((a) => a.id === answerId);
      currentAnswers.splice(index, 1);
      setAnswers(currentAnswers);

      if (answerId === correct) {
        setCorrect(currentAnswers[0].id);
      }
    },
    [answers, correct],
  );

  const correctAnswer = useCallback((id: string, answerId: string) => {
    setCorrect(answerId);
  }, []);

  return (
    <QuestionCreate
      id={idRef.current}
      answers={answers}
      text={questionText}
      correct={correct}
      num={1}
      onQuestionUpdate={updateQuestion}
      onAnswerUpdate={updateAnswer}
      onAnswerAdd={addAnswer}
      onAnswerRemove={removeAnswer}
      onAnswerCorrect={correctAnswer}
    />
  );
};
