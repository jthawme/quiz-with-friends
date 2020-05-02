import React, { useState, useCallback, useMemo } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";
import { IconButton } from "../IconButton";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  onTextSubmit?: (value?: string) => void;
  inputSize?: "normal" | "large";
  validateFunc?: (value?: string) => boolean;
}

const defaultValidateFunc = (value?: string): boolean => {
  return !!(value && value.length > 0);
};

const Input: React.FC<InputProps> = ({
  value,
  onTextSubmit,
  onChange,
  inputSize = "normal",
  maxLength,
  validateFunc = defaultValidateFunc,
  ...props
}: InputProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    (value || "").toString(),
  );

  const isValid = useMemo<boolean>(() => {
    return validateFunc(internalValue);
  }, [internalValue, validateFunc]);

  const onInternalChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange],
  );

  const cls = classNames(
    styles.wrapper,
    [styles[inputSize]],
    {
      [styles.dirty]: !!internalValue && isValid,
    },
    {
      [styles.hasSubmit]: !!onTextSubmit,
    },
  );

  return (
    <div className={styles.outer}>
      <div className={cls}>
        <input
          className={styles.input}
          onChange={onInternalChange}
          maxLength={maxLength}
          value={internalValue}
          {...props}
        />

        {onTextSubmit && (
          <IconButton
            onClick={(): void => {
              onTextSubmit(internalValue);
            }}
            className={styles.button}
            type="submit"
            icon="check"
          />
        )}
      </div>
      {maxLength && (
        <p className={styles.valueLength}>
          {maxLength - (internalValue ? internalValue.toString().length : 0)}
        </p>
      )}
    </div>
  );
};

export { Input };
