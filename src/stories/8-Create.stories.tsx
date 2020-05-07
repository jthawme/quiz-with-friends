import React, { useState } from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { QuestionCreate } from "../components/QuestionCreate";

import "normalize.css";
import "../styles/global.scss";

export default {
  title: "Create",
  decorators: [withKnobs],
};

export const QuestionSlice: React.FC = () => {
  return <QuestionCreate />;
};
