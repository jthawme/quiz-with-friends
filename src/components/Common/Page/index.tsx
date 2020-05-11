import React from "react";

import classNames from "classnames";
import styles from "./Page.module.scss";

interface PageProps {
  children: React.ReactNode;
  noSides?: boolean;
  className?: string;
}

const Page: React.FC<PageProps> = ({
  children,
  noSides = false,
  className,
}: PageProps) => {
  const cls = classNames(
    styles.page,
    {
      [styles.noSides]: noSides,
    },
    className,
  );

  return <section className={cls}>{children}</section>;
};

export { Page };
