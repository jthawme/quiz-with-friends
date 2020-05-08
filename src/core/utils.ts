import randomString from "randomstring";
import { Answer, Question } from "./types/question";

export const getEntityId = (): string => randomString.generate();

export const getRoomCode = (): string =>
  randomString.generate({
    length: 6,
    capitalization: "uppercase",
  });

export const getEmptyAnswer = (): Answer => {
  return {
    id: getEntityId(),
    text: "",
  };
};

export const getEmptyQuestion = (): Question => {
  const answer = getEmptyAnswer();
  return {
    text: "",
    id: getEntityId(),
    answers: [answer],
    correct: answer.id,
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {};
