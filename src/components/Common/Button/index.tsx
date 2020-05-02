import React, { useMemo } from "react";
import classNames from "classnames";
import { Link } from "@reach/router";

import { IconList, Icon } from "../Icon";

import styles from "./Button.module.scss";

export type ButtonType = "normal" | "positive" | "negative" | "inherit";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactText;
  icon?: IconList;
  buttonType?: ButtonType;
  reverse?: boolean;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  className,
  buttonType = "normal",
  type = "button",
  reverse = false,
  to,
  ...props
}: ButtonProps) => {
  const cls = classNames(
    styles.wrapper,
    styles.interaction,
    styles[buttonType],
    { [styles.reverse]: reverse },
    className,
  );

  const inner = useMemo(
    () => (
      <>
        {icon && (
          <span className={styles.icon}>
            <Icon name={icon} />
          </span>
        )}
        <span className={styles.text}>{children}</span>
      </>
    ),
    [children, icon],
  );

  if (to) {
    return (
      <Link className={cls} to={to}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...props}>
      {inner}
    </button>
  );
};

export { Button };
