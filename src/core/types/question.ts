export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  correct: string;
  answers: Answer[];
}

export const QUESTION_TITLE_MAX_LENGTH = 200;
export const QUESTION_ANSWER_MAX_LENGTH = 100;
export const QUESTION_ANSWER_AMOUNT = 5;
