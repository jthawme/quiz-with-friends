import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Input } from "../components/Input";

import "normalize.css";
import "../styles/global.scss";

export default {
  title: "Forms",
  decorators: [withKnobs],
};

export const InputStandard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Input placeholder="Input here..." onSubmit={action("submitted")} />
    </div>
  );
};

export const InputLarge: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Input
        inputSize="large"
        placeholder="Input here..."
        onSubmit={action("submitted")}
      />
    </div>
  );
};

export const InputLength: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Input
        maxLength={250}
        placeholder="Input here..."
        onSubmit={action("submitted")}
      />
    </div>
  );
};
