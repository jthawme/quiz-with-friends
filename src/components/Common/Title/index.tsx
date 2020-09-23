import React from "react";

import classNames from "classnames";

import styles from "./Title.module.scss";
import { Tooltip } from "../Tooltip";

type TitleTypes = "main" | "sub" | "inline";

interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
  helpText?: string;
  rightSlot?: React.ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
  type?: TitleTypes;
}

const Title: React.FC<TitleProps> = ({
  children,
  helpText,
  rightSlot,
  tagName: El = "span",
  type = "main",
  className,
  ...props
}: TitleProps) => {
  const cls = classNames(styles.wrapper, styles[type], className);

  return (
    <div className={cls} {...props}>
      <div className={styles.content}>
        <El className={styles.title}>{children}</El>
        {helpText ? (
          <span className={styles.help}>
            <Tooltip>{helpText}</Tooltip>
          </span>
        ) : null}
      </div>
      {rightSlot && <div className={styles.right}>{rightSlot}</div>}
    </div>
  );
};

export { Title };
