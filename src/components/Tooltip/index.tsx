import React, { useState, useMemo, useCallback, useRef } from "react";

import useMeasure from "react-use-measure";

import { ExpandDiv } from "../Expand";
import { IconButton } from "../IconButton";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }: TooltipProps) => {
  const [ref, bounds] = useMeasure();
  const elRef = useRef<HTMLDivElement | null>(null);

  const isRight = useMemo(() => {
    return window.innerWidth < bounds.x + 250;
  }, [bounds.x]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transitioning, setTransitioning] = useState<boolean>(false);

  const documentClickAway = useCallback((e) => {
    if (elRef.current !== null) {
      if (e.target !== elRef.current && !elRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
  }, []);

  const onBeforeExpand = useCallback(() => {
    setTransitioning(true);

    document.removeEventListener("click", documentClickAway);
  }, []);

  const onAfterExpand = useCallback((state: boolean) => {
    setTransitioning(false);

    if (state) {
      document.addEventListener("click", documentClickAway);
    }
  }, []);

  const onSetRef = useCallback(
    (el) => {
      ref(el);
      elRef.current = el;
    },
    [ref],
  );

  return (
    <span
      ref={onSetRef}
      className={`${styles.wrapper} ${isRight ? styles.right : ""}`}
    >
      <ExpandDiv
        initialClassName={styles.initial}
        expandedClassName={styles.expanded}
        expand={isOpen}
        onBefore={onBeforeExpand}
        onAfter={onAfterExpand}
        className={styles.expandElement}
        absolute
      >
        <IconButton
          className={styles.button}
          icon={isOpen ? "x" : "help"}
          onClick={(): void => setIsOpen(!isOpen)}
          buttonType="inherit"
        />
        <div
          className={`${styles.content} ${
            isOpen && !transitioning && styles.show
          }`}
        >
          {children}
        </div>
      </ExpandDiv>
    </span>
  );
};

export { Tooltip };
