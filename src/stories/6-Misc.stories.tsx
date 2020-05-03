import React from "react";
import { withKnobs, number, text, select } from "@storybook/addon-knobs";

import "normalize.css";
import "../styles/global.scss";
import { DotBackground } from "../components/DotBackground";
import { Title } from "../components/Common/Title";
import { Button } from "../components/Common/Button";
import { Alert } from "../components/Common/Alert";
import { action } from "@storybook/addon-actions";
import { Tile } from "../components/Common/Tile";
import { iconSelect } from "./_utils";
import { TileGroup } from "../components/Common/Tile/TileGroup";

export default {
  title: "Misc",
  decorators: [withKnobs],
};

export const Dots: React.FC = () => {
  const amount = number("Number of dots", 20);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>This is some other content</div>
      <DotBackground amount={amount} />
    </div>
  );
};

export const TitleBlock: React.FC = () => {
  const titleText = text("Text", "Title");
  return (
    <Title
      text={titleText}
      helpText={"This is some help text"}
      rightSlot={<Button icon="plus-circle">New post</Button>}
    />
  );
};

export const AlertBlock: React.FC = () => {
  return (
    <Alert onClose={action("Closed")}>
      <Title type="sub" text="Title" tagName="p" />
      <p>
        Hello, this is some text that may be some sort of update like a new
        serivce worker! That&apos;d be good
      </p>
    </Alert>
  );
};

export const TileBlock: React.FC = () => {
  const icon = iconSelect("Icon");
  const textString = text("Label", "General Tile");
  const type = select("Type", ["one", "two", "three"], "one");

  return (
    <TileGroup>
      <Tile to="/" text={textString} icon={icon} type={type} />
      <Tile to="/" text="Next tile" icon="plus-circle" type="two" />
      <Tile to="/" text="Another tile" icon="plus-circle" type="three" />
      <Tile to="/" text="Another tile" icon="plus-circle" type="one" />
      <Tile to="/" text="Another tile" icon="plus-circle" type="two" />
    </TileGroup>
  );
};
