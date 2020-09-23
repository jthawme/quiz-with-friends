import React, { useReducer, useCallback, useState } from "react";

import { RouteComponentProps, navigate } from "@reach/router";

import { DotBackground } from "../../components/DotBackground";
import { QuestionCreate } from "../../components/QuestionCreate";
import { MenuItem } from "../../components/Menu";
import { Page } from "../../components/Common/Page";
import { Row } from "../../components/Common/Row";
import { Title } from "../../components/Common/Title";
import { Input } from "../../components/Common/Input";
import { Alert } from "../../components/Common/Alert";
import { Button } from "../../components/Common/Button";

import {
  reducer,
  initialState,
  QuizActionTypes,
  QUIZ_TITLE_MAX_LENGTH,
} from "../../core/types/quiz";
import { getEmptyAnswer, getEmptyQuestion } from "../../core/utils";
import styles from "./Create.module.scss";
import { validateQuiz } from "../../core/validation/quiz";

const Create: React.FC<RouteComponentProps> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>();

  const onTitleUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: QuizActionTypes.UPDATE_TITLE,
        payload: {
          title: e.target.value,
        },
      });
    },
    [],
  );

  const onQuestionUpdate = useCallback((id: string, questionText: string) => {
    dispatch({
      type: QuizActionTypes.UPDATE_QUESTION_TITLE,
      payload: {
        id,
        text: questionText,
      },
    });
  }, []);

  const onAnswerAdd = useCallback(
    (id: string) => {
      const answers = state.questions.find((q) => q.id === id)?.answers.slice();
      if (answers) {
        answers.push(getEmptyAnswer());

        dispatch({
          type: QuizActionTypes.UPDATE_ANSWER_LIST,
          payload: {
            id,
            answers,
          },
        });
      }
    },
    [state],
  );

  const onAnswerUpdate = useCallback(
    (id: string, answer: string, answerId: string) => {
      dispatch({
        type: QuizActionTypes.UPDATE_ANSWER,
        payload: {
          id,
          answerId,
          text: answer,
        },
      });
    },
    [],
  );

  const onAnswerRemove = useCallback((id: string, answerId: string) => {
    dispatch({
      type: QuizActionTypes.REMOVE_ANSWER,
      payload: {
        id,
        answerId,
      },
    });
  }, []);

  const onAnswerCorrect = useCallback((id: string, answerId: string) => {
    dispatch({
      type: QuizActionTypes.CORRECT_ANSWER,
      payload: {
        id,
        answerId,
      },
    });
  }, []);

  const onAddQuestion = useCallback(() => {
    const questions = state.questions.slice();
    questions.push(getEmptyQuestion());

    dispatch({
      type: QuizActionTypes.UPDATE_QUESTION_LIST,
      payload: {
        questions,
      },
    });
  }, [state]);

  const onAdvance = useCallback(() => {
    setIsSubmitting(true);

    validateQuiz
      .validate(state)
      .then(() => {
        navigate(`/game/${state.code}`);
      })
      .catch((err) => {
        setFormError(err.path);
        setIsSubmitting(false);
      });
  }, [state]);

  return (
    <>
      <DotBackground amount={50} />
      <Page>
        <Row>
          <Title type="main">Create a quiz</Title>
        </Row>
        <Row className={styles.topRow}>
          <div className={styles.titleBlock}>
            <Title type="inline" tagName="span">
              Title
            </Title>
            <Input
              inputSize="normal"
              maxLength={QUIZ_TITLE_MAX_LENGTH}
              value={state.title}
              onChange={onTitleUpdate}
              error={formError === "title"}
            />
          </div>
          <div className={styles.codeBlock}>
            <Title type="inline" tagName="span">
              Room Code
            </Title>
            <Title type="main" tagName="span">
              {state.code}
            </Title>
          </div>
        </Row>
        <Row>
          <Title type="sub" tagName="span">
            Questions
          </Title>
          {state.questions.map((val, index) => {
            return (
              <QuestionCreate
                key={val.id}
                num={index + 1}
                {...val}
                onQuestionUpdate={onQuestionUpdate}
                onAnswerUpdate={onAnswerUpdate}
                onAnswerAdd={onAnswerAdd}
                onAnswerCorrect={onAnswerCorrect}
                onAnswerRemove={onAnswerRemove}
                errorPath={formError}
                errorPrefix={`questions[${index}].`}
              />
            );
          })}
          <div className={styles.addQuestionBlock}>
            <MenuItem icon="plus-circle" onClick={onAddQuestion}>
              Add question
            </MenuItem>
          </div>
        </Row>
        <Row>
          <Alert initialDelay={0} canClose={false}>
            <Title type="sub">Ready?</Title>
            <p>
              If you are ready to create your quiz, hit the button below, just
              know that you can’t change the questions after you hit this
              button!
            </p>
            {!!formError && (
              <p className={styles.error}>
                Make sure everything is filled out correctly
              </p>
            )}
            <Button
              onClick={onAdvance}
              icon="check"
              buttonType="positive"
              disabled={isSubmitting}
            >
              I'm Ready
            </Button>
          </Alert>
        </Row>
      </Page>
    </>
  );
};

export { Create };
