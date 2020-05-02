import React from "react";

import classNames from "classnames";

import { ButtonType } from "../Button";

import styles from "./AvatarButton.module.scss";
import buttonStyles from "../Button/Button.module.scss";

interface AvatarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image?: string;
  text?: string;
  buttonType?: ButtonType;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({
  image,
  text = "NA",
  buttonType = "normal",
  className,
  ...props
}: AvatarButtonProps) => {
  const cls = classNames(
    styles.wrapper,
    buttonStyles.interaction,
    buttonStyles[buttonType],
    className,
  );

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
