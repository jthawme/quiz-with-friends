import React, { useMemo } from "react";
import { Link } from "@reach/router";
import classNames from "classnames";

import { Icon, IconList } from "../Icon";

import styles from "./MenuItem.module.scss";

type MenuItemType = "normal" | "positive" | "negative";

export interface MenuItemObject {
  to?: string;
  onClick?: () => void;
  text: string;
  icon?: IconList;
  active?: boolean;
  type?: MenuItemType;
}

export interface MenuItemProps extends MenuItemObject {
  isSubmenu?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  to,
  onClick,
  text,
  icon,
  isSubmenu,
  type = "normal",
}: MenuItemProps) => {
  const innerContent = useMemo(() => {
    return (
      <>
        {icon && (
          <span className={styles.icon}>
            <Icon name={icon} />
          </span>
        )}
        <span className={`${styles.text} text-body-bold`}>{text}</span>
      </>
    );
  }, [text, icon]);

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
    <button className={cls} onClick={onClick}>
      {innerContent}
    </button>
  );
};

export { MenuItem };
