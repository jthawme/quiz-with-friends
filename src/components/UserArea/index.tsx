import React, { useState, useRef, useEffect, useCallback } from "react";

import { IconButton } from "../IconButton";
import styles from "./UserArea.module.scss";
import { ExpandDiv } from "../Expand";
import { MenuItem } from "../Menu";
import { Button } from "../Button";

interface UserAreaProps {
  name: string;
  image: string | false;
}

const UserArea: React.FC<UserAreaProps> = ({ name, image }: UserAreaProps) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);
  const [internalName, setInternalName] = useState<string>(name);

  const onNameSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log("changed to", internalName);
      setEditName(false);
    },
    [internalName],
  );

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalName(e.target.value);
  }, []);

  const documentClickAway = useCallback((e) => {
    if (elRef.current !== null) {
      if (e.target !== elRef.current && !elRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
  }, []);

  const getInputRef = useCallback((ref) => {
    if (ref) {
      ref.focus();
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("click", documentClickAway);
    } else {
      document.removeEventListener("click", documentClickAway);
    }
  }, [open]);

  return (
    <div className={styles.wrapper} ref={elRef}>
      <IconButton
        icon="user"
        buttonType="negative"
        onClick={(): void => setOpen(!open)}
      />

      <ExpandDiv
        expand={open}
        expandedClassName={styles.dropdownOpen}
        initialClassName={styles.dropdownClosed}
        className={styles.dropdown}
        absolute
      >
        <div className={styles.content}>
          {editName ? (
            <form onSubmit={onNameSubmit} className={styles.form}>
              <input
                ref={getInputRef}
                type="text"
                onChange={onChangeName}
                value={internalName}
              />
              <Button type="submit" buttonType="positive">
                Save
              </Button>
            </form>
          ) : (
            <span className={styles.name}>{name}</span>
          )}
          <ul className={styles.actions}>
            <li>
              <MenuItem
                icon="edit"
                disabled={editName}
                onClick={(): void => setEditName(true)}
              >
                Change Name
              </MenuItem>
            </li>
            <li>
              <MenuItem icon="image" tagName="label">
                <>
                  <span>Change Image</span>
                  <input
                    type="file"
                    className={styles.input}
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                </>
              </MenuItem>
            </li>
          </ul>
        </div>
      </ExpandDiv>
    </div>
  );
};

export { UserArea };
