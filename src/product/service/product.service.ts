import { map } from "rxjs";
import { AxiosResponse } from "axios";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
  ICreateProduct,
  IGetProduct,
  IGetProducts,
  IUpdateProduct,
} from "../product.interface";

@Injectable()
export class ProductService {
  url = "https://fakestoreapi.com/products";
  constructor(private readonly httpService: HttpService) {}

  create(input: ICreateProduct) {
    return this.httpService
      .post(this.url, input)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  update({ id, ...parameter }: IUpdateProduct) {
    return this.httpService
      .put(`${this.url}/${id}`, { ...parameter })
      .pipe(map((response: AxiosResponse) => response.data));
  }

  delete({ id }: IGetProduct) {
    return this.httpService
      .delete(`${this.url}/${id}`)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  findOne({ id }: IGetProduct) {
    return this.httpService
      .get(`${this.url}/${id}`)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  findMany(payload: IGetProducts) {
    const params: Record<string, unknown> = {};
    if (payload) {
      const { pagination, sort } = payload;

      if (pagination) {
        const { limit } = pagination;
        params["limit"] = limit;
      }

      if (sort) {
        const { sortBy } = sort;
        params["sort"] = sortBy;
      }
    }

    return this.httpService
      .get(this.url, params)
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
