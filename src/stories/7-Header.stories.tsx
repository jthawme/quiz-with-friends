import React, { useState } from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { MenuIcon } from "../components/Menu/MenuIcon";
import { Header } from "../components/Header";

import "normalize.css";
import "../styles/global.scss";

export default {
  title: "Header",
  decorators: [withKnobs],
};

export const MenuIconButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return <MenuIcon open={open} onClick={(): void => setOpen(!open)} />;
};

export const HeaderBlock: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return <Header menuOpen={open} onToggleMenu={(): void => setOpen(!open)} />;
};
