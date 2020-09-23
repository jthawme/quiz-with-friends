import randomString from "randomstring";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import { Answer, Question } from "./types/question";

export const getEntityId = (): string => randomString.generate();

export const getRoomCode = (): string =>
  randomString.generate({
    length: 5,
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

export const wait = (time: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const getInitials = (str: string, initialsLength = 2): string => {
  const split = str.split(" ");

  if (split.length > initialsLength) {
    split.length = initialsLength;
  }
  return split.map((w) => w.charAt(0).toUpperCase()).join("");
};

export const generateName = (): string => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    length: 2,
    separator: " ",
    style: "capital",
  });
};

type TITLE_CLASSES = "sub" | "main" | "inline";

export const attachTitleClass = (cls: string, title: TITLE_CLASSES): string => {
  return `text-${title}-heading ${cls}`;
};
