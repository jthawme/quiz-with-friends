import React, { useMemo } from "react";

import styles from "./Leaderboard.module.scss";
import { Title } from "../Title";
import { attachTitleClass } from "../../../core/utils";

interface LeaderboardProps {
  children: React.ReactNode;
  clip?: boolean;
  title?: string;
  spacer?: string;
}

const LeaderboardTitle: React.FC<Pick<LeaderboardProps, "title">> = ({
  title,
}: Pick<LeaderboardProps, "title">) => {
  if (!title) {
    return null;
  }

  return (
    <div className={styles.title}>
      <Title tagName="span" type="inline">
        {title}
      </Title>
    </div>
  );
};

const Leaderboard: React.FC<LeaderboardProps> = ({
  children,
  clip,
  title,
  spacer = "...",
}: LeaderboardProps) => {
  const elements = useMemo(() => {
    const childArray = React.Children.toArray(children);

    if (!clip) {
      return childArray;
    }

    if (childArray.length === 0) {
      return [];
    }

    if (childArray.length === 1) {
      return [childArray[0]];
    }
    return [childArray[0], childArray[childArray.length - 1]];
  }, [clip, children]);

  if (!clip) {
    return (
      <div className={styles.container}>
        <LeaderboardTitle title={title} />
        {elements}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LeaderboardTitle title={title} />
      {elements.length > 0 && elements[0]}
      {elements.length > 1 && (
        <>
          <div className={attachTitleClass(styles.spacer, "sub")}>{spacer}</div>
          {elements[1]}
        </>
      )}
    </div>
  );
};

export { Leaderboard };
