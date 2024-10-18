
export interface offersResponse{
  offers: offer[],
  status:number
}

export interface offer{
  id: number,
  name: string,
  contractStartDate: string,
  contractEndDate: string
}

export interface subscription{
  id: number,
  name: string,
  type: string,
  line: number,
  usage?: usage[]
}

export interface subscriptionResponse{
  subscriptions: subscription[],
  status:0
}

export interface usage{
    type: string,
    used: number,
    limit: number
}
