import React from "react";

import classNames from "classnames";

import styles from "./Row.module.scss";

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;

  children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({
  children,
  className,
  ...props
}: RowProps) => {
  const cls = classNames(styles.row, className);

  return (
    <section className={cls} {...props}>
      {children}
    </section>
  );
};

export { Row };
