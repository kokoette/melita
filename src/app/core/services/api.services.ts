import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { loginPayload, loginResponse, logoutResponse } from "../models/auth.models";
import { offersResponse, subscriptionResponse } from "../models/offer.models";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs";
import { CustomErrorHandler } from "./error-handler";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errorHandler = inject(CustomErrorHandler)
  private httpClient = inject(HttpClient);
  private baseUrl: string = environment.baseUrl

  authenticateUser(payload:loginPayload) {
    return this.httpClient.post<loginResponse>(`${this.baseUrl}/login`, payload)
    // .pipe(catchError(this.errorHandler.errorHandler));
  }

  logOutUser(){
    return this.httpClient.get<logoutResponse>(`${this.baseUrl}/logout`)
    // .pipe(catchError(this.errorHandler.errorHandler));

  }

  getOffers(){
    return this.httpClient.get<offersResponse>(`${this.baseUrl}/offers`)
    .pipe(catchError(this.errorHandler.errorHandler));
  }

  getSubscriptionById(offerId:number){
    return this.httpClient.get<subscriptionResponse>(`${this.baseUrl}/offers/${offerId}/subscriptions`)
    .pipe(catchError(this.errorHandler.errorHandler));
  }
}
