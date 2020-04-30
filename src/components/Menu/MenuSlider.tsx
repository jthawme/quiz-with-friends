import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import classNames from "classnames";

import styles from "./MenuSlider.module.scss";

interface MenuSliderProps {
  open?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const MenuSlider: React.FC<MenuSliderProps> = ({
  open = false,
  children,
  onClose,
}: MenuSliderProps) => {
  const domNode = useRef<HTMLDivElement | null>(null);

  const cls = classNames(styles.container, {
    [styles.open]: open,
  });

  useEffect(() => {
    const el = document.createElement("div");
    el.id = "menu-portal";
    document.body.appendChild(el);

    domNode.current = el;

    return (): void => {
      el.parentElement?.removeChild(el);
    };
  }, []);

  if (domNode.current !== null) {
    return ReactDOM.createPortal(
      <>
        <aside className={cls}>{children}</aside>
        <div
          className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
          onClick={onClose ? onClose : undefined}
        />
      </>,
      domNode.current,
    );
  }

  return null;
};

export { MenuSlider };
