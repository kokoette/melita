import { loginResponse } from "../../core/models/auth.models";
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    // Login actions
    login: props<{ username: string; password: string }>(),
    loginSuccess: props<{ user: loginResponse }>(),
    loginFailure: props<{ error: string }>(),

    // Logout actions
    logout: emptyProps(), // No payload needed for logout
    logoutSuccess: emptyProps(),
    logoutFailure: props<{ error: string }>(),
  },
});
