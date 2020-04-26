import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { Tooltip } from "../components/Tooltip";

import "normalize.css";
import "../styles/global.scss";

export default {
  title: "Tooltip",
  component: Tooltip,
  decorators: [withKnobs],
};

export const Standard: React.FC = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 20px",
        }}
      >
        <Tooltip>Hello</Tooltip>
      </div>
      <div style={{ display: "flex", padding: "0 20px" }}>
        <Tooltip>Hello</Tooltip>
      </div>
    </>
  );
};
