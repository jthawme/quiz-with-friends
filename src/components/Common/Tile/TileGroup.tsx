import React from "react";

import styles from "./TileGroup.module.scss";

interface TileGroupProps {
  children: React.ReactNode;
}

const TileGroup: React.FC<TileGroupProps> = ({ children }: TileGroupProps) => {
  return <div className={styles.pool}>{children}</div>;
};

export { TileGroup };
