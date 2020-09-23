import React from "react";

import styles from "./Leaderboard.module.scss";
import { Title } from "../Title";
import { attachTitleClass } from "../../../core/utils";

interface LeaderboardItemProps {
  children: React.ReactNode;
  score: number;
  number: number;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  number,
  score,
  children,
}: LeaderboardItemProps) => {
  return (
    <div className={styles.item}>
      <div className={attachTitleClass(styles.number, "sub")}>{number}.</div>
      <div className={attachTitleClass(styles.text, "sub")}>{children}</div>
      <div className={attachTitleClass(styles.score, "sub")}>{score}</div>
    </div>
  );
};

export { LeaderboardItem };
