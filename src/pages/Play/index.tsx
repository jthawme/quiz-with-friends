import React, { useMemo } from "react";

import { RouteComponentProps, Redirect } from "@reach/router";

import { Page } from "../../components/Common/Page";

import styles from "./Play.module.scss";
import { GameContextProvider, useGameContext } from "../../context/game";
import { RoomState } from "../../core/types/room";

interface PlayProps extends RouteComponentProps {
  roomCode?: string;
}

const PlayInner: React.FC = () => {
  const { code, state } = useGameContext();

  const isInbetween = useMemo<boolean>(() => {
    return state === RoomState.WAITING;
  }, [state]);
  return (
    <>
      <Page noSides className={styles.page}>
        <header className={styles.header}>
          <div className={styles.room}>
            <p>
              Playing in room <span>{code}</span>
            </p>
          </div>
          <div className={styles.score}>
            <p>250</p>
          </div>
        </header>

        <div className={styles.content}>
          {isInbetween ? (
            <p className={styles.idle}>Waiting for something to happen</p>
          ) : (
            <p>its happening</p>
          )}
        </div>
      </Page>
    </>
  );
};

const Play: React.FC<PlayProps> = ({ roomCode }: PlayProps) => {
  if (!roomCode) {
    return <Redirect to="/" />;
  }

  return (
    <GameContextProvider code={roomCode}>
      <PlayInner />
    </GameContextProvider>
  );
};

export { Play };
