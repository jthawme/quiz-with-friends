import React from "react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";

import "../styles/global.scss";
import { iconSelect } from "./_utils";

export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs],
};

export const Text: React.FC = () => {
  const label = text("Label", "Hello Button");
  const hasIcon = boolean("Has icon", true);
  const type = select(
    "Button Type",
    {
      normal: "normal",
      positive: "positive",
      negative: "negative",
    },
    "normal",
  );
  const icon = iconSelect("Icon");
  const reverse = boolean("Reverse", false);

  return (
    <Button
      onClick={action("clicked")}
      icon={hasIcon ? icon : undefined}
      buttonType={type}
      reverse={reverse}
    >
      {label}
    </Button>
  );
};

export const Icon: React.FC = () => {
  const icon = iconSelect("Icon");
  const type = select(
    "Button Type",
    {
      normal: "normal",
      positive: "positive",
      negative: "negative",
    },
    "normal",
  );

  return <IconButton icon={icon} buttonType={type} />;
};
