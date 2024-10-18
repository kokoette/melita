
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
  loading:boolean;
  logoutLoading:boolean,
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  loading:false,
  isAuthenticated: false,
  logoutLoading:false,
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
    logoutLoading:true,
    error: null,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    error: null,
    logoutLoading:false

  })),

  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
    logoutLoading:false
  }))

)
