import React, { HTMLAttributes } from "react";

import classNames from "classnames";

import styles from "./MenuIcon.module.scss";

interface MenuIconProps extends HTMLAttributes<HTMLButtonElement> {
  open: boolean;
  onClick: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({
  open,
  ...props
}: MenuIconProps) => {
  const cls = classNames(styles.button, {
    [styles.active]: open,
  });

  return (
    <button className={cls} {...props}>
      <span className={styles.inner}>
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </span>
    </button>
  );
};

export { MenuIcon };
