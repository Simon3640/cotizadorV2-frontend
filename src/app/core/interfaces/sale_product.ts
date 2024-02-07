import { ProductInDB } from './product';

export interface SaleProduct {
  total: number;
  tax: number;
  product: ProductInDB;
  discount: number;
}
