import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import classNames from "classnames";

import styles from "./MenuSlider.module.scss";

interface MenuSliderProps {
  open?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const MenuSlider: React.FC<MenuSliderProps> = ({
  open = false,
  children,
  onClose,
  className,
}: MenuSliderProps) => {
  const domNode = useRef<HTMLDivElement | null>(null);
  const [isSet, setIsSet] = useState<boolean>(false);

  const cls = classNames(
    styles.container,
    {
      [styles.open]: open,
    },
    className,
  );

  useEffect(() => {
    const el = document.createElement("div");
    el.id = "menu-portal";
    document.body.appendChild(el);

    domNode.current = el;

    setIsSet(true);

    return (): void => {
      el.parentElement?.removeChild(el);
    };
  }, []);

  if (domNode.current !== null && isSet) {
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
