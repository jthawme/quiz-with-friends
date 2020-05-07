import React from "react";

import styles from "./QuestionCreate.module.scss";
import { AvatarButton } from "../Common/AvatarButton";
import { Input } from "../Common/Input";
import { IconButton } from "../Common/IconButton";
import { Title } from "../Common/Title";

const QuestionCreate = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.num}>
        <AvatarButton text="1" buttonType="negative" notButton disabled />
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <Title className={styles.title} text="Question" type="inline" />
          <div className={styles.inner}>
            <Input inputSize="normal" maxLength={200} />
          </div>
        </div>
        <div className={`${styles.row} ${styles.withActions}`}>
          <Title className={styles.title} text="Answers" type="inline" />

          <div className={styles.inner}>
            <Input inputSize="normal" maxLength={100} />
          </div>
          <div className={styles.actions}>
            <ul className={styles.actionItems}>
              <li>
                <IconButton icon="trash" buttonType="negative" />
              </li>
              <li>
                <IconButton icon="check" buttonType="positive" />
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles.row} ${styles.withActions}`}>
          <div className={styles.inner}>
            <Input inputSize="normal" maxLength={100} />
          </div>
          <div className={styles.actions}>
            <ul className={styles.actionItems}>
              <li>
                <IconButton icon="trash" buttonType="negative" />
              </li>
              <li>
                <IconButton icon="check" buttonType="normal" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { QuestionCreate };
