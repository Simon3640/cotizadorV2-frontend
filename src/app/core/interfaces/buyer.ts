export interface Buyer {
  email: string;
  names?: string;
  last_names?: string;
  address?: string;
  age?: number;
  phone?: string;
}


export interface BuyerInDB extends Buyer {
    id: number; 
    created_at: Date;
    updated_at: Date;
}