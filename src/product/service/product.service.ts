import { Injectable } from "@nestjs/common";
import * as uuid from "uuid";
import {
  ICreateProduct,
  IGetProduct,
  IGetProducts,
  IProduct,
  IUpdateProduct,
} from "../product.interface";
import products from "../product.data";

@Injectable()
export class ProductService {
  create(input: ICreateProduct): IProduct {
    return { id: uuid.v4(), ...input };
  }

  update({ id, ...parameter }: IUpdateProduct) {
    const product = this.findOne({ id });
    return { id, product, ...parameter };
  }

  delete({ id }: IGetProduct): boolean {
    products.filter((product: IProduct) => product.id !== id);
    return true;
  }

  findOne({ id }: IGetProduct) {
    return products.find((product: IProduct) => product.id === id);
  }

  findMany(payload: IGetProducts) {
    let parameter;
    if (payload) {
      const { filter } = payload;

      if (filter) {
        const { name, description, price, stock } = filter;
        if (name) {
          parameter = (product: IProduct) => product.name === name;
        }

        if (description) {
          parameter = (product: IProduct) =>
            product.description === description;
        }

        if (price) {
          parameter = (product: IProduct) => product.price === price;
        }

        if (stock) {
          parameter = (product: IProduct) => product.stock === stock;
        }
      }
    }

    return parameter ? products.find(parameter) : products;
  }
}
