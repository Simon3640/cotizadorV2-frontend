export interface Product {
  reference: string;
  image: string;
  name: string;
  description: string;
  value: number;
}

export interface ProductCreate extends Product {}

export interface ProductInDB extends Product {
  id: number;
  created_at: Date;
  updated_at: Date;
}
