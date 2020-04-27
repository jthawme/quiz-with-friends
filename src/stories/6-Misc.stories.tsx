import React from "react";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import "normalize.css";
import "../styles/global.scss";
import { DotBackground } from "../components/DotBackground";
import { Title } from "../components/Title";
import { Button } from "../components/Button";

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
