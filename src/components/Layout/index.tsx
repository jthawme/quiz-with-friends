import React, { useState, useCallback, useMemo } from "react";
import { MenuSlider } from "../Menu/MenuSlider";
import { Header } from "../Header";
import { UserArea } from "../UserArea";
import { Menu } from "../Menu";
import { MenuItemObject } from "../Menu/MenuItem";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const menuItems = useMemo<MenuItemObject[]>(() => {
    const baseItems: MenuItemObject[] = [
      {
        children: "Create a Quiz",
        icon: "plus-circle",
        to: "/create",
      },
      {
        children: "About",
        icon: "info",
        to: "/about",
      },
      {
        children: "Share",
        icon: "share",
        onClick: (): void => {
          console.log("share go now");
        },
      },
    ];

    return baseItems;
  }, []);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [image, setImage] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string>("User Name");

  const onChangeImage = useCallback((image: string) => {
    setImage(image);
  }, []);

  const onChangeName = useCallback((name: string) => {
    setName(name);
  }, []);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onToggleMenu={(): void => setMenuOpen(!menuOpen)}
        rightSlot={
          <UserArea
            id={"id-goes-here"}
            name={name}
            image={image}
            onChangeImage={onChangeImage}
            onChangeName={onChangeName}
          />
        }
      />
      <main className={styles.main}>{children}</main>
      <MenuSlider
        className={styles.menu}
        open={menuOpen}
        onClose={(): void => setMenuOpen(false)}
      >
        <div className={styles.items}>
          <Menu items={menuItems} />
        </div>
        <div className={styles.credit}>
          Made by ya boi{" "}
          <a
            href="https://twitter.com/jthawme"
            target="_blank"
            rel="noopener noreferrer"
          >
            @jthawme
          </a>
        </div>
      </MenuSlider>
    </>
  );
};

export { Layout };
