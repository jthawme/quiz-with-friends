import React, { useState } from "react";
import { MenuSlider } from "../Menu/MenuSlider";
import { Header } from "../Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onToggleMenu={(): void => setMenuOpen(!menuOpen)}
      />
      <main>{children}</main>
      <footer>footer</footer>
      <MenuSlider open={menuOpen}>Hello</MenuSlider>
    </>
  );
};

export { Layout };
