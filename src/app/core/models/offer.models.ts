
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
