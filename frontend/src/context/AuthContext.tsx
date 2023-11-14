import { PropsWithChildren, createContext, useReducer, useEffect } from 'react';
import { AuthActionType } from '../models';
import { LOCAL_STORAGE_USER_KEY } from '../constants';

type User = {
  email: string;
  token: string;
};

type AuthAction = {
  type: AuthActionType.Login | AuthActionType.Logout;
  payload: { user: User | null };
};

interface AuthState {
  user: User | null;
  dispatch: React.Dispatch<AuthAction>;
}

const initialState: AuthState = { user: null, dispatch: () => {} };

export const AuthContext = createContext(initialState);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.Login:
      return { ...action.payload, dispatch: state.dispatch };
    case AuthActionType.Logout:
      return { user: null, dispatch: state.dispatch };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const cachedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (!cachedUser) return;

    const user = JSON.parse(cachedUser ? cachedUser : '');

    if (user) {
      dispatch({ type: AuthActionType.Login, payload: { user } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
