import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactDOM from "react-dom";

import classNames from "classnames";

import styles from "./MenuSlider.module.scss";

interface MenuSliderProps {
  open?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  portal?: boolean;
}

const MenuSlider: React.FC<MenuSliderProps> = ({
  open = false,
  children,
  onClose,
  className,
  portal = false,
}: MenuSliderProps) => {
  const cls = classNames(
    styles.container,
    {
      [styles.open]: open,
    },
    className,
  );

  const inner = useMemo(
    () => (
      <>
        <aside className={cls}>{children}</aside>
        <div
          className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
          onClick={onClose ? onClose : undefined}
        />
      </>
    ),
    [children, cls, onClose, open],
  );

  const domNode = useRef<HTMLDivElement | null>(null);
  const [isSet, setIsSet] = useState<boolean>(false);

  useEffect(() => {
    if (portal) {
      const el = document.createElement("div");
      el.id = "menu-portal";
      document.body.appendChild(el);

      domNode.current = el;

      setIsSet(true);

      return (): void => {
        el.parentElement?.removeChild(el);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (portal) {
    if (domNode.current !== null && isSet) {
      return ReactDOM.createPortal(inner, domNode.current);
    }

    return null;
  }

  return inner;
};

export { MenuSlider };
