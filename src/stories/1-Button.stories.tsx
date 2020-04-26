import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";

export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs],
};

export const Text: React.FC = () => {
  const label = text("Label", "Hello Button");

  return <Button onClick={action("clicked")}>{label}</Button>;
};

export const Emoji: React.FC = () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
