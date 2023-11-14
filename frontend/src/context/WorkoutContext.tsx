import { PropsWithChildren, createContext, useReducer } from 'react';
import { Workout, WorkoutActionType } from '../models';

type WorkoutAction =
  | {
      type: WorkoutActionType.SetWorkouts;
      payload: Workout[];
    }
  | {
      type: WorkoutActionType.CreateWorkout | WorkoutActionType.DeleteWorkout;
      payload: Workout;
    };

interface WorkoutState {
  workouts: Workout[];
  dispatch: React.Dispatch<WorkoutAction>;
}

const initialState: WorkoutState = {
  workouts: [],
  dispatch: () => {},
};

export const WorkoutContext = createContext(initialState);

const workoutsReducer = (
  state: WorkoutState,
  action: WorkoutAction
): WorkoutState => {
  switch (action.type) {
    case WorkoutActionType.SetWorkouts:
      return {
        workouts: action.payload,
        dispatch: state.dispatch,
      };

    case WorkoutActionType.CreateWorkout:
      return {
        workouts: [action.payload, ...state.workouts],
        dispatch: state.dispatch,
      };

    case WorkoutActionType.DeleteWorkout:
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
        dispatch: state.dispatch,
      };

    default:
      return state;
  }
};

export const WorkoutContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
