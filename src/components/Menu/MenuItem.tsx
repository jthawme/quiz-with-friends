import React, { useMemo } from "react";
import { Link } from "@reach/router";
import classNames from "classnames";

import { Icon, IconList } from "../Icon";

import styles from "./MenuItem.module.scss";

type MenuItemType = "normal" | "positive" | "negative";

export interface MenuItemObject {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: IconList;
  active?: boolean;
  type?: MenuItemType;
  tagName?: keyof JSX.IntrinsicElements;
  disabled?: boolean;
}

export interface MenuItemProps extends MenuItemObject {
  isSubmenu?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  to,
  onClick,
  children,
  icon,
  isSubmenu,
  type = "normal",
  tagName: El = "button",
  disabled,
}: MenuItemProps) => {
  const innerContent = useMemo(() => {
    return (
      <>
        {icon && (
          <span className={styles.icon}>
            <Icon name={icon} />
          </span>
        )}
        <span className={`${styles.text} text-body-bold`}>{children}</span>
      </>
    );
  }, [children, icon]);

  const cls = classNames(
    styles.wrapper,
    {
      [styles.sub]: isSubmenu,
    },
    [styles[type]],
  );

  if (to) {
    return (
      <Link className={cls} to={to}>
        {innerContent}
      </Link>
    );
  }

  return (
    <El className={cls} onClick={onClick} disabled={disabled}>
      {innerContent}
    </El>
  );
};

export { MenuItem };
