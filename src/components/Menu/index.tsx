import React from "react";

import { MenuItem, MenuItemObject } from "./MenuItem";

import styles from "./Menu.module.scss";

export interface MenuItemListItem extends MenuItemObject {
  items?: MenuItemObject[];
}

interface MenuProps {
  items: MenuItemListItem[];
  tagName?: keyof JSX.IntrinsicElements;
  className?: string;
}

const Menu: React.FC<MenuProps> = ({
  items,
  tagName: El = "nav",
  className,
}: MenuProps) => {
  return (
    <El className={`${styles.menu} ${className || ""}`}>
      {items.map((item, index) => (
        <React.Fragment key={`${index}-${item.to}`}>
          <MenuItem {...item} />
          {item.items &&
            item.items.map((subItem) => (
              <MenuItem key={`${index}-${subItem.to}`} isSubmenu {...subItem} />
            ))}
        </React.Fragment>
      ))}
    </El>
  );
};

export { Menu, MenuItem };
