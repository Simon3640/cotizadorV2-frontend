import { EmpleadoInDB } from './user';
import { BuyerInDB } from './buyer';
import { SaleProduct } from './sale_product';

export interface Sale {
  user_id: number;
  buyer_id: number;
  status: string;
  consecutive?: number;
  document?: string;
}

export interface SaleInDB extends Sale {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface SaleMultiResponse extends SaleInDB {
  user: EmpleadoInDB;
  buyer: BuyerInDB;
}

export interface SaleProducts {
  product_id: number;
  total: number;
  tax: number;
  discount:number;
}

export interface SaleProductResponse extends SaleMultiResponse {
  sale_product: SaleProduct[];
  total: number;
  total_tax: number;
  total_discount: number;
}