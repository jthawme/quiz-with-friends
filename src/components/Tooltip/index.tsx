import React, { useState, useMemo } from "react";

import useMeasure from "react-use-measure";

import { ExpandDiv } from "../Expand";
import { IconButton } from "../IconButton";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }: TooltipProps) => {
  const [ref, bounds] = useMeasure();
  const isRight = useMemo(() => {
    return window.innerWidth < bounds.x + 250;
  }, [bounds.x]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transitioning, setTransitioning] = useState<boolean>(false);

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${isRight ? styles.right : ""}`}
    >
      <ExpandDiv
        initialClassName={styles.initial}
        expandedClassName={styles.expanded}
        expand={isOpen}
        onBefore={(): void => setTransitioning(true)}
        onAfter={(): void => setTransitioning(false)}
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
    </div>
  );
};

export { Tooltip };
