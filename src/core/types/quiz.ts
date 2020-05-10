import { Question, Answer } from "./question";
import { getRoomCode, getEmptyQuestion } from "../utils";

export interface Quiz {
  title: string;
  code: string;
  questions: Question[];
}

export enum QuizActionTypes {
  UPDATE_TITLE,
  UPDATE_QUESTION_LIST,
  UPDATE_QUESTION_TITLE,
  UPDATE_ANSWER_LIST,
  UPDATE_ANSWER,
  REMOVE_ANSWER,
  CORRECT_ANSWER,
}

type UpdateTitle = {
  type: QuizActionTypes.UPDATE_TITLE;
  payload: {
    title: string;
  };
};

type UpdateQuestionList = {
  type: QuizActionTypes.UPDATE_QUESTION_LIST;
  payload: {
    questions: Question[];
  };
};

type UpdateQuestionTitle = {
  type: QuizActionTypes.UPDATE_QUESTION_TITLE;
  payload: {
    id: string;
    text: string;
  };
};

type UpdateAnswerList = {
  type: QuizActionTypes.UPDATE_ANSWER_LIST;
  payload: {
    id: string;
    answers: Answer[];
  };
};

type UpdateAnswer = {
  type: QuizActionTypes.UPDATE_ANSWER;
  payload: {
    id: string;
    answerId: string;
    text: string;
  };
};

type RemoveAnswer = {
  type: QuizActionTypes.REMOVE_ANSWER;
  payload: {
    id: string;
    answerId: string;
  };
};

type CorrectAnswer = {
  type: QuizActionTypes.CORRECT_ANSWER;
  payload: {
    id: string;
    answerId: string;
  };
};

type CreateQuizAction =
  | UpdateQuestionList
  | UpdateTitle
  | UpdateQuestionTitle
  | UpdateAnswerList
  | UpdateAnswer
  | RemoveAnswer
  | CorrectAnswer;

// export const initialState: Quiz = {
//   title: "",
//   code: getRoomCode(),
//   questions: [getEmptyQuestion()],
// };

export const initialState: Quiz = {
  title: "Quiz Title",
  code: getRoomCode(),
  questions: [getEmptyQuestion()],
};

export const reducer = (state: Quiz, action: CreateQuizAction): Quiz => {
  switch (action.type) {
    case QuizActionTypes.UPDATE_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };
    case QuizActionTypes.UPDATE_QUESTION_LIST: {
      return {
        ...state,
        questions: action.payload.questions.slice(),
      };
    }
    case QuizActionTypes.UPDATE_QUESTION_TITLE: {
      const questions = state.questions.slice();
      const idx = questions.findIndex((v) => v.id === action.payload.id);
      questions[idx].text = action.payload.text;

      return {
        ...state,
        questions,
      };
    }
    case QuizActionTypes.UPDATE_ANSWER_LIST: {
      const questions = state.questions.slice();
      const idx = questions.findIndex((v) => v.id === action.payload.id);
      questions[idx].answers = action.payload.answers.slice();

      return {
        ...state,
        questions,
      };
    }
    case QuizActionTypes.UPDATE_ANSWER: {
      const questions = state.questions.slice();
      const idx = questions.findIndex((v) => v.id === action.payload.id);

      const answerIdx = questions[idx].answers.findIndex(
        (v) => v.id === action.payload.answerId,
      );

      questions[idx].answers[answerIdx] = {
        ...questions[idx].answers[answerIdx],
        text: action.payload.text,
      };

      return {
        ...state,
        questions,
      };
    }
    case QuizActionTypes.REMOVE_ANSWER: {
      const questions = state.questions.slice();
      const idx = questions.findIndex((v) => v.id === action.payload.id);

      const answerIdx = questions[idx].answers.findIndex(
        (v) => v.id === action.payload.answerId,
      );

      if (answerIdx >= 0) {
        questions[idx].answers.splice(answerIdx, 1);

        if (questions[idx].correct === action.payload.answerId) {
          questions[idx].correct = questions[idx].answers[0].id;
        }
      }

      return {
        ...state,
        questions,
      };
    }
    case QuizActionTypes.CORRECT_ANSWER: {
      const questions = state.questions.slice();
      const idx = questions.findIndex((v) => v.id === action.payload.id);
      questions[idx] = {
        ...questions[idx],
        correct: action.payload.answerId,
      };

      return {
        ...state,
        questions,
      };
    }
    default:
      return state;
  }
};
