import { SortType } from "./product.enum";
export interface ICreateProduct {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface IUpdateProduct {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
}

export interface IGetProduct {
  id: string;
}

export interface IGetProductsPagination {
  limit?: number;
}

export interface IGetProductsSort {
  sortBy?: SortType;
}

export interface IGetProducts {
  pagination?: IGetProductsPagination;
  sort?: IGetProductsSort;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
