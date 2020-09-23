import { getEntityId, generateName } from "../utils";

export enum RoomState {
  WAITING,
  PLAYING,
  ENDED,
}

export interface Player {
  id: string;
  name: string;
  image?: string;
}

export interface Room {
  state: RoomState;
  players: Player[];
}

export enum RoomActionTypes {
  UPDATE_STATE,
}

type UpdateState = {
  type: RoomActionTypes.UPDATE_STATE;
  payload: {
    state: RoomState;
  };
};

type RoomAction = UpdateState;

// export const initialState: Room = {
//   state: RoomState.WAITING,
//   players: [],
// };

export const initialState: Room = {
  state: RoomState.WAITING,
  players: [
    {
      id: getEntityId(),
      name: generateName(),
    },
    {
      id: getEntityId(),
      name: generateName(),
    },
  ],
};

export const reducer = (state: Room, action: RoomAction): Room => {
  switch (action.type) {
    case RoomActionTypes.UPDATE_STATE:
      return {
        ...state,
        state: action.payload.state,
      };
    default:
      return state;
  }
};
