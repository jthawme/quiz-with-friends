import React from "react";

import classNames from "classnames";

import { ButtonType } from "../Button";

import styles from "./AvatarButton.module.scss";
import buttonStyles from "../Button/Button.module.scss";

interface AvatarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLSpanElement> {
  image?: string;
  text?: string;
  buttonType?: ButtonType;
  notButton?: boolean;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({
  image,
  text = "NA",
  buttonType = "normal",
  className,
  notButton = false,
  ...props
}: AvatarButtonProps) => {
  const cls = classNames(
    styles.wrapper,
    buttonStyles.interaction,
    buttonStyles[buttonType],
    className,
  );

  if (notButton) {
    return (
      <span
        className={cls}
        style={{ backgroundImage: `url(${image})` }}
        {...props}
      >
        {!image && <span className={styles.content}>{text}</span>}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      style={{ backgroundImage: `url(${image})` }}
      {...props}
    >
      {!image && <span className={styles.content}>{text}</span>}
    </button>
  );
};

export { AvatarButton };
