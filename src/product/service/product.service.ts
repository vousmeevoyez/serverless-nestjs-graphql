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
        const {
          name,
          description,
          priceGreater,
          priceLess,
          stockGreater,
          stockLess,
        } = filter;
        if (name) {
          parameter = (product: IProduct) => product.name === name;
        }

        if (description) {
          parameter = (product: IProduct) =>
            product.description === description;
        }

        if (priceGreater) {
          parameter = (product: IProduct) => product.price > priceGreater;
        }

        if (priceLess) {
          parameter = (product: IProduct) => product.price > priceLess;
        }

        if (stockGreater) {
          parameter = (product: IProduct) => product.stock > stockGreater;
        }

        if (stockLess) {
          parameter = (product: IProduct) => product.stock > stockLess;
        }
      }
    }

    return parameter ? products.find(parameter) : products;
  }
}
