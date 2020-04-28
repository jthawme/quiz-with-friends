import React from "react";

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
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
    </header>
  );
};

export { Header };
