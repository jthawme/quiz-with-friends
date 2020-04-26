import React from "react";
import classNames from "classnames";

import { IconList, Icon } from "../Icon";

import styles from "./Button.module.scss";

export type ButtonType = "normal" | "positive" | "negative";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactText;
  icon?: IconList;
  buttonType?: ButtonType;
  reverse?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  className,
  buttonType = "normal",
  type = "button",
  reverse = false,
  ...props
}: ButtonProps) => {
  const cls = classNames(
    styles.wrapper,
    styles.interaction,
    styles[buttonType],
    { [styles.reverse]: reverse },
    className,
  );

  return (
    <button type={type} className={cls} {...props}>
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
      )}
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export { Button };
