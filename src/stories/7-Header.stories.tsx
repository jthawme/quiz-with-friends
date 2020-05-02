import React, { useState } from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { MenuIcon } from "../components/Menu/MenuIcon";
import { Header } from "../components/Header";

import "normalize.css";
import "../styles/global.scss";
import { UserArea } from "../components/UserArea";

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
  const [name, setName] = useState<string>("User Name");
  const [image, setImage] = useState<string | undefined>(undefined);

  return (
    <Header
      menuOpen={open}
      onToggleMenu={(): void => setOpen(!open)}
      rightSlot={
        <UserArea
          name={name}
          image={image}
          onChangeName={(newName): void => setName(newName)}
          onChangeImage={(newImage): void => setImage(newImage)}
        />
      }
    />
  );
};

export const UserAreaBlock: React.FC = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", width: "250px" }}
    >
      <UserArea
        name="User 2020"
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChangeName={(): void => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChangeImage={(): void => {}}
      />
    </div>
  );
};
