import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import { wait, noop } from "../core/utils";
import {
  Room,
  initialState as RoomInitialState,
  reducer as RoomReducer,
  RoomActionTypes,
  RoomState,
} from "../core/types/room";
import {
  Quiz,
  initialState as QuizInitialState,
  reducer as QuizReducer,
} from "../core/types/quiz";
import { Loading } from "../components/Common/Loading";

interface GameContextProps extends Room, Quiz {
  roomLoading: boolean;
  setPlaying: () => void;
}

interface GameContextProviderProps {
  children: React.ReactNode;
  code: string;
}

const GameContext = createContext<GameContextProps>({
  roomLoading: true,
  setPlaying: noop,
  ...QuizInitialState,
  ...RoomInitialState,
});

const GameContextProvider: React.FC<GameContextProviderProps> = ({
  children,
  code,
}: GameContextProviderProps) => {
  const codeRef = useRef<string>();
  const [roomLoading, setRoomLoading] = useState<boolean>(true);
  const [quizState, quizDispatch] = useReducer(QuizReducer, QuizInitialState);
  const [roomState, roomDispatch] = useReducer(RoomReducer, RoomInitialState);

  const loadRoom = useCallback(() => {
    wait(1000).then(() => {
      setRoomLoading(false);
    });
  }, []);

  useEffect(() => {
    if (codeRef.current !== code) {
      codeRef.current = code;
      loadRoom();
    }
  }, [code, loadRoom]);

  const setPlaying = useCallback(() => {
    if (roomState.state === RoomState.WAITING) {
      roomDispatch({
        type: RoomActionTypes.UPDATE_STATE,
        payload: {
          state: RoomState.PLAYING,
        },
      });
    }
  }, [roomState.state]);

  const value = {
    roomLoading,
    setPlaying,
    ...quizState,
    ...roomState,
  };

  if (roomLoading) {
    return <Loading full />;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = (): GameContextProps => useContext(GameContext);

export { GameContextProvider };
