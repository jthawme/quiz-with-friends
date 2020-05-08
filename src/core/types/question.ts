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
