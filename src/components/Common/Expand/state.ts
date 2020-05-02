export interface TransitionState {
  isExpanded: boolean;
  isTransitioning: boolean;
}

type TransitionUpdate = {
  type: "TRANSITION_UPDATE";
  payload: TransitionState;
};

export type TransitionActions = TransitionUpdate;

export const getInitialState = (isExpanded: boolean): TransitionState => ({
  isExpanded,
  isTransitioning: false,
});

export const reducer = (
  state: TransitionState,
  action: TransitionActions,
): TransitionState => {
  switch (action.type) {
    case "TRANSITION_UPDATE":
      return {
        ...action.payload,
      };
  }

  return state;
};
