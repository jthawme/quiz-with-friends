import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import styles from "./UserArea.module.scss";
import { ExpandDiv } from "../Common/Expand";
import { MenuItem } from "../Menu";
import { Button } from "../Common/Button";
import { AvatarButton } from "../Common/AvatarButton";

interface UserAreaProps {
  name: string;
  image?: string;
  onChangeName: (name: string) => void;
  onChangeImage: (image: string) => void;
  initialsLength?: number;
  disabled?: boolean;
}

const UserArea: React.FC<UserAreaProps> = ({
  name,
  image,
  onChangeName,
  onChangeImage,
  initialsLength = 3,
  disabled,
}: UserAreaProps) => {
  const initials = useMemo(() => {
    const split = name.split(" ");

    if (split.length > initialsLength) {
      split.length = initialsLength;
    }
    return split.map((w) => w.charAt(0).toUpperCase()).join("");
  }, [name, initialsLength]);

  const elRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);
  const [internalName, setInternalName] = useState<string>(name);

  const onNameSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onChangeName(internalName);
      setEditName(false);
    },
    [internalName, onChangeName],
  );

  const onInternalChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalName(e.target.value);
    },
    [],
  );

  const onInternalChangeImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const files = e.target.files;

        const fileReader = new FileReader();
        fileReader.addEventListener(
          "load",
          () => {
            if (fileReader.result && typeof fileReader.result === "string") {
              onChangeImage(fileReader.result);
            }
          },
          false,
        );
        fileReader.readAsDataURL(files[0]);
      }
    },
    [onChangeImage],
  );

  const onKeyUpName = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 27) {
        setEditName(false);
        setInternalName(name);
      }
    },
    [name],
  );

  const documentClickAway = useCallback(
    (e) => {
      if (elRef.current !== null) {
        if (e.target !== elRef.current && !elRef.current.contains(e.target)) {
          setOpen(false);
          setInternalName(name);
        }
      }
    },
    [name],
  );

  const onAfterExpand = useCallback((state: boolean) => {
    if (!state) {
      setEditName(false);
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
  }, [documentClickAway, open]);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setEditName(false);
    }
  }, [disabled]);

  return (
    <div className={styles.wrapper} ref={elRef}>
      <AvatarButton
        buttonType="negative"
        onClick={(): void => setOpen(!open)}
        text={initials}
        image={image}
      />

      <ExpandDiv
        expand={open}
        expandedClassName={styles.dropdownOpen}
        initialClassName={styles.dropdownClosed}
        className={styles.dropdown}
        onAfter={onAfterExpand}
        absolute
      >
        <div className={styles.content}>
          {editName ? (
            <form onSubmit={onNameSubmit} className={styles.form}>
              <input
                ref={getInputRef}
                type="text"
                onChange={onInternalChangeName}
                onKeyUp={onKeyUpName}
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
                    onChange={onInternalChangeImage}
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
