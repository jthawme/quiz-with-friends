import React, { useState } from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { ExpandDiv } from "../components/Common/Expand";

import "normalize.css";
import "../styles/global.scss";
import styles from "./assets/expand.module.scss";

export default {
  title: "Expand",
  component: ExpandDiv,
  decorators: [withKnobs],
};

export const Standard: React.FC = () => {
  const [first, setFirst] = useState<boolean>(true);
  const [last, setLast] = useState<boolean>(false);
  const expanded = boolean("Expanded", false);

  return (
    <ExpandDiv
      className={styles.wrapper}
      initialClassName={styles.initial}
      expandedClassName={styles.expanded}
      expand={expanded}
      onBefore={(): void => {
        setFirst(false);
        setLast(false);
      }}
      onAfter={(state): void => {
        setFirst(!state);
        setLast(state);
      }}
      duration={300}
    >
      <div className={styles.trans} style={{ opacity: first || last ? 1 : 0 }}>
        {first && <span>Hello small</span>}
        {last && <span>Hello large</span>}
      </div>
    </ExpandDiv>
  );
};
