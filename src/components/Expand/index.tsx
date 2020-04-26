import React, {
  useLayoutEffect,
  useRef,
  useCallback,
  useReducer,
  Reducer,
} from "react";

import {
  getInitialState,
  reducer,
  TransitionState,
  TransitionActions,
} from "./state";
import { getClassName, singleRaf, clientRectToStyle } from "./utils";

interface ExpandDivProps {
  className?: string;
  initialClassName: string;
  expandedClassName: string;
  tagName?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  expand: boolean;
  onBefore?: (state: boolean) => void;
  onAfter?: (state: boolean) => void;
  easing?: string;
  duration?: number;
}

const ExpandDiv: React.FC<ExpandDivProps> = ({
  className,
  initialClassName,
  expandedClassName,
  children,
  expand,
  duration = 300,
  easing = "ease-in-out",
  onAfter,
  onBefore,
}: ExpandDivProps) => {
  const [state, dispatch] = useReducer<
    Reducer<TransitionState, TransitionActions>
  >(reducer, getInitialState(expand));

  const elRef = useRef<HTMLDivElement | null>(null);
  const cls = useRef<string>(
    getClassName(
      initialClassName,
      expandedClassName,
      state.isExpanded,
      className,
    ),
  );

  const transitionStates = useCallback(
    async (expandState: boolean) => {
      if (elRef.current !== null) {
        const first = elRef.current.getBoundingClientRect();

        if (onBefore) {
          onBefore(expandState);
        }

        cls.current = getClassName(
          initialClassName,
          expandedClassName,
          expandState,
          className,
        );

        await singleRaf();

        const last = elRef.current.getBoundingClientRect();

        cls.current = getClassName(
          initialClassName,
          expandedClassName,
          !expandState,
          className,
        );

        const anim = elRef.current.animate(
          [clientRectToStyle(first), clientRectToStyle(last)],
          {
            duration,
            easing,
          },
        );

        anim.onfinish = (): void => {
          cls.current = getClassName(
            initialClassName,
            expandedClassName,
            expandState,
            className,
          );

          if (onAfter) {
            onAfter(expandState);
          }

          dispatch({
            type: "TRANSITION_UPDATE",
            payload: {
              isExpanded: expandState,
              isTransitioning: false,
            },
          });
        };
      }
    },
    [initialClassName, expandedClassName, className, duration, easing],
  );

  useLayoutEffect(() => {
    if (expand !== state.isExpanded && !state.isTransitioning) {
      dispatch({
        type: "TRANSITION_UPDATE",
        payload: {
          isExpanded: state.isExpanded,
          isTransitioning: true,
        },
      });
      transitionStates(expand);
    }
  }, [expand, state, transitionStates]);

  return (
    <div ref={elRef} className={`${cls.current} ${className}`}>
      {children}
    </div>
  );
};

export { ExpandDiv };
