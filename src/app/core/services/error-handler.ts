import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root', // Ensures this service is available application-wide
})
export class CustomErrorHandler {

  // This method no longer needs to be static
  errorHandler(err: any): Observable<never> {
    let errorMessage = 'Something went wrong. Please try again.';

    if (!navigator.onLine) {
      // Handle offline scenario
      errorMessage = 'No internet connection. Please check your network and try again.';
    } else if (err.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `A client-side error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      // Server-side error
      switch (err.status) {
        case 400:
          errorMessage = 'Bad Request. Please verify your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          break;
        case 403:
          errorMessage = 'Forbidden. You don’t have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Not Found. The resource you are looking for doesn’t exist.';
          break;
        case 500:
          errorMessage = 'Internal Server Error. Please try again later.';
          break;
        default:
          errorMessage = err.error?.message || `Error ${err.status}: ${err.statusText}`;
      }
    }

    // console.error('Error occurred:', err);
    return throwError(() => new Error(errorMessage));
  }
}
