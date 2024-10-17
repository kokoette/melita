export interface loginResponse{
  authToken: string
}

export interface loginPayload{
  username:string,
  password:string
}

export interface logoutResponse{
  status: string
}

