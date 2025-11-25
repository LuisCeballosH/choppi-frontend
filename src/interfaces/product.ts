import { Store } from "./store";

export interface ProductResponse {
  total: number;
  products: Product[];
}
export interface Product {
  createdAt: Date;
  deletedAt?: Date;
  description?: string;
  stores?: Store[];
  id: string;
  name: string;
  updatedAt: Date;
}
