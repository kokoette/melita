
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
  loading:boolean;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  loading:false,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    token: user.authToken,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
    error,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    error: null,
  })),

  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
  }))

)
