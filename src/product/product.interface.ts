export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface IUpdateProduct {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
}

export interface IGetProduct {
  id: string;
}

export interface IGetProductsFilter {
  name?: string;
  description?: string;
  priceGreater?: number;
  priceLess?: number;
  stockGreater?: number;
  stockLess?: number;
}

export interface IGetProducts {
  filter?: IGetProductsFilter;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}
