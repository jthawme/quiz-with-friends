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
    return [
      {
        children: "Create a Quiz",
        icon: "plus-circle",
        to: "/create",
      },
    ];
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
            name={name}
            image={image}
            onChangeImage={onChangeImage}
            onChangeName={onChangeName}
          />
        }
      />
      <main className={styles.main}>{children}</main>
      <footer>footer</footer>
      <MenuSlider
        className={styles.menu}
        open={menuOpen}
        onClose={(): void => setMenuOpen(false)}
      >
        <Menu items={menuItems} />
      </MenuSlider>
    </>
  );
};

export { Layout };
