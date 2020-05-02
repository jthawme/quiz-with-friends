import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { MenuItem, Menu, MenuItemListItem } from "../components/Menu";

import "normalize.css";
import "../styles/global.scss";
import { MenuSlider } from "../components/Menu/MenuSlider";

export default {
  title: "Menu",
  decorators: [withKnobs],
};

const MENU_ITEMS: MenuItemListItem[] = [
  {
    children: "Home",
    icon: "smile",
    to: "/",
  },
  {
    children: "Some Link",
    icon: "shield",
    to: "/some",
    items: [
      {
        children: "Some sub link",
        icon: "settings",
        onClick: action("Click item"),
        type: "negative",
      },
    ],
  },
];

export const Standard: React.FC = () => {
  return <Menu items={MENU_ITEMS} />;
};

export const MenuItemLink: React.FC = () => {
  return (
    <MenuItem icon="smile" to="/">
      Menu Item
    </MenuItem>
  );
};

export const Section: React.FC = () => {
  const isOpen = boolean("Open", false);
  return (
    <main style={{ display: "flex" }}>
      <MenuSlider open={isOpen}>
        <Menu items={MENU_ITEMS} />
      </MenuSlider>
      <div style={{ flexGrow: 1 }}>Hello good sire</div>
    </main>
  );
};
