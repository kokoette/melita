import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/api.services';
import { AuthActions } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.authenticateUser({username: action.username, password: action.password}).pipe(
          map(response => AuthActions.loginSuccess({ user: response })),
          catchError(error => {
            let errorMessage = 'Login failed. Please try again.';

            if (error.status === 400) {
              errorMessage = 'Invalid email or password';
            } else if (error.status >= 500) {
              errorMessage = 'Server error, please try again later.';
            }

            console.error('Login Error:', error); // for debugging

            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        )
      ),
      tap((action) => {
        if (action.type === AuthActions.loginSuccess.type) {
          localStorage.setItem('token', action.user.authToken);
          this.router.navigateByUrl('/home');
        }
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.authService.logOutUser().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(error => of(AuthActions.logoutFailure({ error: error.message })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          localStorage.removeItem('token'); // Clear token
          this.router.navigate(['/']); // Redirect to login
        })
      ),
    { dispatch: false }
  );
}
