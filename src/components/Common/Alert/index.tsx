import React, { useState, useEffect, useMemo, useCallback } from "react";

import classNames from "classnames";
import styles from "./Alert.module.scss";
import { ExpandDiv } from "../Expand";
import { Button, ButtonProps } from "../Button";

type AlertTypes = "normal" | "positive" | "negative";

interface AlertProps {
  children: React.ReactNode;

  type?: AlertTypes;
  initialDelay?: number;
  canClose?: boolean;

  closeButtonProps?: ButtonProps;

  onClose?: () => void;

  unmountOnClose?: boolean;
}

const initialCloseButtonProps: ButtonProps = {
  icon: "x",
  children: "Close",
  buttonType: "negative",
};

const Alert: React.FC<AlertProps> = ({
  children,
  type = "normal",
  initialDelay = 500,
  closeButtonProps,
  onClose,
  unmountOnClose = true,
  canClose = true,
}: AlertProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(true);

  const cls = classNames(styles.wrapper, styles[type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, initialDelay);

    return (): void => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const internalCloseButtonProps = useMemo(() => {
    return {
      ...initialCloseButtonProps,
      ...(closeButtonProps || {}),
    };
  }, [closeButtonProps]);

  const onChangeState = useCallback(
    (state: boolean) => {
      if (onClose && !state) {
        onClose();
      }
      if (unmountOnClose && !state) {
        setMount(false);
      }
    },
    [onClose, unmountOnClose],
  );

  if (!mount) {
    return null;
  }

  return (
    <ExpandDiv
      expand={show}
      initialClassName={styles.collapsed}
      expandedClassName={styles.expanded}
      className={cls}
      onAfter={onChangeState}
    >
      <div className={styles.content}>
        {children}

        {canClose && (
          <Button
            onClick={(): void => setShow(false)}
            {...internalCloseButtonProps}
          />
        )}
      </div>
    </ExpandDiv>
  );
};

export { Alert };
