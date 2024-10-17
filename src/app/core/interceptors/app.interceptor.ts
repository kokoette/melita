import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, throwError } from "rxjs";
import { AuthActions } from "../../store/actions/auth.actions";
import { MatSnackBar } from "@angular/material/snack-bar";

export const AppInterceptor: HttpInterceptorFn = (req, next) => {

  // Get token from local storage
  const store = inject(Store);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    // This is to handle the different error scenerios
    catchError((error: HttpErrorResponse) => {
      let userMessage = 'An unexpected error occurred';

      if (error.status === 401 || error.status === 403) {
        // Handle unauthorized or forbidden error
        store.dispatch(AuthActions.logout());
        localStorage.removeItem('token');
        userMessage = 'Session expired. Please log in again.';
      } else if (error.status >= 500) {
        // Handle server errors
        userMessage = 'Server error, please try again later.';
      } else if (error.status === 404) {
        userMessage = 'The requested resource was not found.';
      }

      // Display a notification to the user
      inject(MatSnackBar).open(userMessage, 'Close', { duration: 3000 });

      return throwError(() => new Error(error.message || userMessage));
    })
  );
};
