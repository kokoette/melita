import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { loginPayload, loginResponse, logoutResponse } from "../models/auth.models";
import { offersResponse } from "../models/offer.models";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = environment.baseUrl


  authenticateUser(payload:loginPayload) {
    return this.httpClient.post<loginResponse>(`${this.baseUrl}/login`, payload)
  }

  logOutUser(){
    return this.httpClient.get<logoutResponse>(`${this.baseUrl}/logout`)
  }

  getOffers(){
    return this.httpClient.get<offersResponse>(`${this.baseUrl}/offers`)
  }

  getSubscriptionById(offerId:number){
    return this.httpClient.get<any>(`${this.baseUrl}/offers/${offerId}/subscriptions`)
  }
}
