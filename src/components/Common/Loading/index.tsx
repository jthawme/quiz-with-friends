import React from "react";

import styles from "./Loading.module.scss";
import { Icon } from "../Icon";

interface LoadingProps {
  inline?: boolean;
  full?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ inline, full }: LoadingProps) => {
  return (
    <div
      className={`${styles.wrapper} ${inline && styles.inline} ${
        full && styles.full
      }`}
    >
      <div className={styles.icon}>
        <Icon name="loader" size={24} />
      </div>
    </div>
  );
};

export { Loading };
