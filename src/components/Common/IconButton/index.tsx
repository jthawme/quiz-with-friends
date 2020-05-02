import React from "react";

import classNames from "classnames";

import { IconList, Icon } from "../Icon";
import { ButtonType } from "../Button";

import styles from "./IconButton.module.scss";
import buttonStyles from "../Button/Button.module.scss";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconList;
  buttonType?: ButtonType;
  withBorder?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  buttonType = "normal",
  className,
  withBorder = true,
  ...props
}: IconButtonProps) => {
  const cls = classNames(
    styles.wrapper,
    buttonStyles.interaction,
    buttonStyles[buttonType],
    {
      [styles.border]: withBorder,
    },
    className,
  );

  return (
    <button type="button" className={cls} {...props}>
      <Icon name={icon} />
    </button>
  );
};

export { IconButton };
