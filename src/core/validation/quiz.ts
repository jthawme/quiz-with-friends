import { object, string, array } from "yup";
import {
  QUESTION_TITLE_MAX_LENGTH,
  QUESTION_ANSWER_AMOUNT,
  QUESTION_ANSWER_MAX_LENGTH,
} from "../types/question";
import { QUIZ_TITLE_MAX_LENGTH, QUIZ_MAX_QUESTIONS } from "../types/quiz";

export const validateAnswer = object({
  id: string().required(),
  text: string().max(QUESTION_ANSWER_MAX_LENGTH).required(),
});

export const validateQuestion = object({
  id: string().required(),
  text: string().max(QUESTION_TITLE_MAX_LENGTH).required(),
  correct: string().required(),
  answers: array().min(1).max(QUESTION_ANSWER_AMOUNT).of(validateAnswer),
});

export const validateQuiz = object({
  title: string().max(QUIZ_TITLE_MAX_LENGTH).required(),
  code: string(),
  questions: array().of(validateQuestion).min(1).max(QUIZ_MAX_QUESTIONS),
});
