import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

import { LOCAL_STORAGE_USER_KEY } from '../constants';
import { AuthActionType } from '../models';
import { WorkoutActionType } from '../models';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);

    dispatch({ type: AuthActionType.Logout, payload: { user: null } });
    workoutsDispatch({ type: WorkoutActionType.SetWorkouts, payload: [] });
  };

  return { logout };
};
