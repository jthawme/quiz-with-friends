import React, { useCallback } from "react";

import { AvatarButton } from "../Common/AvatarButton";
import { Input } from "../Common/Input";
import { IconButton } from "../Common/IconButton";
import { Title } from "../Common/Title";

import {
  Question,
  QUESTION_TITLE_MAX_LENGTH,
  QUESTION_ANSWER_MAX_LENGTH,
} from "../../core/types/question";

import styles from "./QuestionCreate.module.scss";
import { Button } from "../Common/Button";

interface QuestionCreateProps extends Question {
  num: number;
  onQuestionUpdate: (id: string, question: string) => void;
  onAnswerUpdate: (id: string, answer: string, answerId: string) => void;
  onAnswerAdd: (id: string) => void;
  onAnswerRemove: (id: string, answerId: string) => void;
  onAnswerCorrect: (id: string, answerId: string) => void;
  maxAnswers?: number;
  errorPath?: string;
  errorPrefix?: string;
}

const QuestionCreate: React.FC<QuestionCreateProps> = ({
  id,
  text,
  num,
  answers,
  correct,
  onQuestionUpdate,
  onAnswerAdd,
  onAnswerUpdate,
  onAnswerRemove,
  onAnswerCorrect,
  maxAnswers = 5,
  errorPath,
  errorPrefix = "",
}: QuestionCreateProps) => {
  const internalQuestionUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onQuestionUpdate(id, e.target.value);
    },
    [onQuestionUpdate, id],
  );

  const internalAnswerUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const entityId = e.target.dataset.entity;

      if (entityId !== undefined) {
        onAnswerUpdate(id, e.target.value, entityId);
      }
    },
    [id, onAnswerUpdate],
  );

  const internalAnswerRemove = useCallback(
    (e) => {
      const entityId = e.target.dataset.entity;

      if (entityId !== undefined) {
        onAnswerRemove(id, entityId);
      }
    },
    [id, onAnswerRemove],
  );

  const internalAnswerCorrect = useCallback(
    (e) => {
      const entityId = e.target.dataset.entity;

      if (entityId !== undefined) {
        onAnswerCorrect(id, entityId);
      }
    },
    [id, onAnswerCorrect],
  );

  const internalAnswerAdd = useCallback(() => {
    onAnswerAdd(id);
  }, [id, onAnswerAdd]);

  const hasError = useCallback(
    (str: string): boolean => {
      return !!(errorPath && errorPath === `${errorPrefix}${str}`);
    },
    [errorPath, errorPrefix],
  );

  return (
    <div id={id} className={styles.wrapper}>
      <div className={styles.num}>
        <AvatarButton
          text={num.toString()}
          buttonType="negative"
          notButton
          disabled
        />

        <div className={styles.line} />
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <Title className={styles.title} text="Question" type="inline" />
          <div className={styles.inner}>
            <Input
              inputSize="normal"
              maxLength={QUESTION_TITLE_MAX_LENGTH}
              value={text}
              onChange={internalQuestionUpdate}
              error={hasError("text")}
            />
          </div>
        </div>

        {answers.map((val, index) => (
          <div key={index} className={`${styles.row} ${styles.withActions}`}>
            {index === 0 && (
              <Title className={styles.title} text="Answers" type="inline" />
            )}

            <div className={styles.inner}>
              <Input
                inputSize="normal"
                maxLength={QUESTION_ANSWER_MAX_LENGTH}
                value={val.text}
                data-entity={val.id}
                onChange={internalAnswerUpdate}
                error={hasError(`answers[${index}].text`)}
              />
            </div>
            <div className={styles.actions}>
              <ul className={styles.actionItems}>
                <li>
                  <IconButton
                    icon="trash"
                    buttonType="negative"
                    disabled={answers.length === 1}
                    onClick={internalAnswerRemove}
                    data-entity={val.id}
                  />
                </li>
                <li>
                  <IconButton
                    icon="check"
                    buttonType={correct === val.id ? "positive" : "normal"}
                    onClick={internalAnswerCorrect}
                    data-entity={val.id}
                  />
                </li>
              </ul>
            </div>
          </div>
        ))}

        <div className={styles.row}>
          {answers.length === 0 && (
            <Title className={styles.title} text="Answers" type="inline" />
          )}
          <div className={styles.add}>
            <Button
              buttonType="normal"
              icon="plus"
              onClick={internalAnswerAdd}
              disabled={answers.length >= maxAnswers}
            >
              Add Answer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { QuestionCreate };
