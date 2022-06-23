import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
  ICreateProduct,
  IGetProduct,
  IGetProducts,
  IProduct,
  IUpdateProduct,
} from "../product.interface";

@Injectable()
export class ProductService {
  url = "https://fakestoreapi.com/products";
  constructor(private readonly httpService: HttpService) {}

  async create(input: ICreateProduct): Promise<IProduct> {
    const response = await this.httpService.post(this.url, input).toPromise();
    console.log(response);
    if (!response) throw new Error("error response");
    return response.data;
  }

  async update({ id, ...parameter }: IUpdateProduct): Promise<IProduct> {
    const response = await this.httpService
      .put(`${this.url}/${id}`, { ...parameter })
      .toPromise();
    if (!response) throw new Error("error response");
    return response.data;
  }

  async delete({ id }: IGetProduct): Promise<void> {
    const response = await this.httpService
      .delete(`${this.url}/${id}`)
      .toPromise();
    if (!response) throw new Error("error response");
  }

  async findOne({ id }: IGetProduct): Promise<IProduct> {
    const response = await this.httpService
      .get(`${this.url}/${id}`)
      .toPromise();
    if (!response) throw new Error("error response");
    return response.data;
  }

  async findMany(payload: IGetProducts): Promise<IProduct[]> {
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

    const response = await this.httpService
      .get(this.url, { params })
      .toPromise();
    if (!response) throw new Error("error response");
    return response.data;
  }
}
