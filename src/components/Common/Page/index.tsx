import React from "react";

import styles from "./Page.module.scss";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }: PageProps) => {
  return <section className={styles.page}>{children}</section>;
};

export { Page };
