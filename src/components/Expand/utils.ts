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
  extra?: string,
): string => {
  return classNames(
    {
      [initial]: !isExpanded,
    },
    {
      [expanded]: isExpanded,
    },
    extra,
  );
};

export const clientRectToStyle = (
  clientRect: ClientRect,
): { [key: string]: string } => ({
  width: `${clientRect.width}px`,
  height: `${clientRect.height}px`,
  top: `${clientRect.top}px`,
  left: `${clientRect.left}px`,
});
