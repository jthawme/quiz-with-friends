import React from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import { GameContextProvider, useGameContext } from "../../context/game";
import { RoomState } from "../../core/types/room";
import { Lobby } from "./Lobby";

interface GameProps extends RouteComponentProps {
  roomCode?: string;
}

const GameSwitch: React.FC = () => {
  const { state } = useGameContext();

  if (state === RoomState.WAITING) {
    return <Lobby />;
  }

  return null;
};

const Game: React.FC<GameProps> = ({ roomCode }: GameProps) => {
  if (!roomCode) {
    return <Redirect to="/" />;
  }

  return (
    <GameContextProvider code={roomCode}>
      <GameSwitch />
    </GameContextProvider>
  );
};

export { Game };
