import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";
import { IconButton } from "../IconButton";
import { Loading } from "../Loading";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  onTextSubmit?: (value?: string) => void;
  inputSize?: "normal" | "large";
  validateFunc?: (value?: string) => boolean;
  error?: boolean;
  loading?: boolean;
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
  error = false,
  disabled,
  loading = false,
  onKeyUp,
  ...props
}: InputProps) => {
  const [internalValue, setInternalValue] = useState<string>();

  const isValid = useMemo<boolean>(() => {
    return validateFunc(value?.toString() || internalValue);
  }, [validateFunc, value, internalValue]);
  const valueLength = useMemo<number>(() => {
    if (value || internalValue) {
      return (value || internalValue || "").toString().length;
    }

    return 0;
  }, [internalValue, value]);
  const isDirty = useMemo<boolean>(() => {
    return (!!value || !!internalValue) && isValid;
  }, [internalValue, isValid, value]);

  const onInternalChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange],
  );

  const onInternalKeyUp = useCallback(
    (e) => {
      if (e.keyCode === 13 && onTextSubmit && isDirty) {
        onTextSubmit(value?.toString() || internalValue);
      }

      if (onKeyUp) {
        onKeyUp(e);
      }
    },
    [internalValue, isDirty, onTextSubmit, value, onKeyUp],
  );

  const cls = classNames(
    styles.wrapper,
    [styles[inputSize]],
    {
      [styles.dirty]: isDirty,
    },
    {
      [styles.hasSubmit]: !!onTextSubmit,
    },
    {
      [styles.error]: error,
    },
  );

  return (
    <div className={styles.outer} data-error={!!error}>
      <div className={cls}>
        <input
          className={styles.input}
          onChange={onInternalChange}
          onKeyUp={onInternalKeyUp}
          maxLength={maxLength}
          value={value}
          disabled={disabled}
          {...props}
        />

        {onTextSubmit && (
          <IconButton
            onClick={(): void => {
              onTextSubmit(value?.toString() || internalValue);
            }}
            className={styles.button}
            type="submit"
            icon="check"
            disabled={disabled}
          />
        )}
      </div>
      <div className={styles.bottom}>
        {loading && (
          <div className={styles.loader}>
            <Loading inline />
          </div>
        )}
        {maxLength && (
          <p className={styles.valueLength}>{maxLength - valueLength}</p>
        )}
      </div>
    </div>
  );
};

export { Input };
