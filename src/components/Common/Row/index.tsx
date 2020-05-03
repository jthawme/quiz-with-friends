import React from "react";

import classNames from "classnames";

import styles from "./Row.module.scss";

interface RowProps {
  className?: string;

  children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ children, className }: RowProps) => {
  const cls = classNames(styles.row, className);

  return <section className={cls}>{children}</section>;
};

export { Row };
