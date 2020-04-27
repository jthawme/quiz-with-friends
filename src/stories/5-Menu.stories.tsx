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
    text: "Home",
    icon: "smile",
    to: "/",
  },
  {
    text: "Some Link",
    icon: "shield",
    to: "/some",
    items: [
      {
        text: "Some sub link",
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
  return <MenuItem text="Menu Item" icon="smile" to="/" />;
};

export const Section: React.FC = () => {
  const isOpen = boolean("Open", false);
  return (
    <MenuSlider open={isOpen}>
      <Menu items={MENU_ITEMS} />
    </MenuSlider>
  );
};
