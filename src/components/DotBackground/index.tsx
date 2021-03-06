import React, { useMemo } from "react";

import styles from "./DotBackground.module.scss";

interface DotBackgroundProps {
  amount: number;
}

const DotBackground: React.FC<DotBackgroundProps> = ({
  amount,
}: DotBackgroundProps) => {
  const positions = useMemo(() => {
    return new Array(amount).fill(0).map((v) => {
      return {
        x: Math.random(),
        y: Math.random(),
      };
    });
  }, [amount]);

  return (
    <div className={styles.container}>
      {positions.map((p, index) => (
        <div
          key={index}
          className={styles.dot}
          style={{
            left: `${p.x * 1000}px`,
            top: `${p.y * 4000}px`,
          }}
        />
      ))}
    </div>
  );
};

export { DotBackground };
