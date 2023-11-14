import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { AuthActionType } from '../models';
import { LOCAL_STORAGE_USER_KEY } from '../constants';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // Save the user object in local storage.
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(json));

      // Update the AuthContext with the user.
      dispatch({ type: AuthActionType.Login, payload: { user: json } });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
