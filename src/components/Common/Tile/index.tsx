import React from "react";
import classNames from "classnames";

import { Link } from "@reach/router";

import styles from "./Tile.module.scss";
import { IconList, Icon } from "../Icon";

type TileTypes = "one" | "two" | "three";

interface TileProps {
  to: string;
  type?: TileTypes;
  className?: string;
  text: string;
  icon?: IconList;
}

const Tile: React.FC<TileProps> = ({
  className,
  type = "one",
  to,
  text,
  icon,
}: TileProps) => {
  const cls = classNames(
    styles.tile,
    styles[type],
    { [styles.withIcon]: !!icon },
    className,
  );

  return (
    <Link to={to} className={cls}>
      <span className={styles.content}>
        <span className={styles.text}>{text}</span>
        {icon && (
          <span className={styles.icon}>
            <Icon name={icon} size={24} />
          </span>
        )}
      </span>
    </Link>
  );
};

export { Tile };
