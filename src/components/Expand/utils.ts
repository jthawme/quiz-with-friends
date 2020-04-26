import classNames from "classnames";

export const singleRaf = (): Promise<boolean> => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(true);
    });
  });
};

export const doubleRaf = (): Promise<boolean> => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve(true);
      });
    });
  });
};

export const getClassName = (
  initial: string,
  expanded: string,
  isExpanded: boolean,
): string => {
  return classNames(
    {
      [initial]: !isExpanded,
    },
    {
      [expanded]: isExpanded,
    },
  );
};

export const clientRectToStyle = (
  clientRect: ClientRect,
  absolute?: boolean,
): { [key: string]: string } => {
  const size = {
    width: `${clientRect.width}px`,
    height: `${clientRect.height}px`,
  };

  if (absolute) {
    return size;
  }

  return {
    ...size,
    top: `${clientRect.top}px`,
    left: `${clientRect.left}px`,
  };
};
