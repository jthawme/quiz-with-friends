import React, { useMemo, useState, useCallback } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  onSubmit?: () => void;
  inputSize?: "normal" | "large";
}

const Input: React.FC<InputProps> = ({
  value,
  onSubmit,
  onChange,
  inputSize = "normal",
  maxLength,
  ...props
}: InputProps) => {
  const [internalValue, setInternalValue] = useState<
    string | number | string[] | undefined
  >(value);

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
      [styles.dirty]: !!internalValue,
    },
    {
      [styles.hasSubmit]: !!onSubmit,
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

        {onSubmit && (
          <IconButton className={styles.button} type="submit" icon="check" />
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
