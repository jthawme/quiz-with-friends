import React from "react";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import "normalize.css";
import "../styles/global.scss";
import { DotBackground } from "../components/DotBackground";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import { action } from "@storybook/addon-actions";

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
