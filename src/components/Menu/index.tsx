import React from "react";

import { MenuItem, MenuItemObject } from "./MenuItem";

import styles from "./Menu.module.scss";

export interface MenuItemListItem extends MenuItemObject {
  items?: MenuItemObject[];
}

interface MenuProps {
  items: MenuItemListItem[];
  tagName?: keyof JSX.IntrinsicElements;
}

const Menu: React.FC<MenuProps> = ({
  items,
  tagName: El = "nav",
}: MenuProps) => {
  return (
    <El className={styles.menu}>
      {items.map((item) => (
        <React.Fragment key={`${item.text}-${item.to}`}>
          <MenuItem {...item} />
          {item.items &&
            item.items.map((subItem) => (
              <MenuItem
                key={`${subItem.text}-${subItem.to}`}
                isSubmenu
                {...subItem}
              />
            ))}
        </React.Fragment>
      ))}
    </El>
  );
};

export { Menu, MenuItem };
