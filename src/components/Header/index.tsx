import React from "react";

import { Link } from "@reach/router";
import { MenuIcon } from "../Menu/MenuIcon";

import { ReactComponent as Logo } from "../../images/logo.svg";
import styles from "./Header.module.scss";

interface HeaderProps {
  rightSlot?: React.ReactNode;
  menuOpen: boolean;
  onToggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  menuOpen,
  rightSlot,
  onToggleMenu,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <MenuIcon open={menuOpen} onClick={onToggleMenu} />
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
      </div>
      <div className={styles.right}>{rightSlot || null}</div>
    </header>
  );
};

export { Header };
