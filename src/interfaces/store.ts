export interface StoreResponse {
  total: number;
  stores: Store[];
}
export interface Store {
  createdAt: Date;
  deletedAt?: Date;
  description?: string;
  id: string;
  name: string;
  updatedAt: Date;
}
