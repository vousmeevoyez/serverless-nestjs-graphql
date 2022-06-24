import { of } from "rxjs";
import { AxiosResponse } from "axios";
import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "../service/product.service";
import { IGetProducts } from "../product.interface";
import { SortType } from "../product.enum";
import products from "../product.data";

class MockHttpService {
  post = jest.fn();
  put = jest.fn();
  get = jest.fn();
  delete = jest.fn();
}

let service: ProductService;
let httpService: HttpService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProductService,
      {
        provide: HttpService,
        useClass: MockHttpService,
      },
    ],
  }).compile();

  service = module.get<ProductService>(ProductService);
  httpService = module.get<HttpService>(HttpService);
});

describe("Product Service", () => {
  beforeAll(() => {
    expect(service).toBeDefined();
  });

  it("create", async () => {
    const response: AxiosResponse<any> = {
      data: products[0],
      headers: {},
      config: { url: "https://fakestoreapi.com/products" },
      status: 200,
      statusText: "OK",
    };
    jest.spyOn(httpService, "post").mockImplementationOnce(() => of(response));

    const result = await service
      .create({
        title: "",
        description: "",
        price: 1,
        image: "",
        category: "",
      })
      .toPromise();

    expect(httpService.post).toBeCalled();
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("image");
    expect(result).toHaveProperty("category");
  });

  it("update", async () => {
    const response: AxiosResponse<any> = {
      data: products[0],
      headers: {},
      config: { url: "https://fakestoreapi.com/products" },
      status: 200,
      statusText: "OK",
    };
    jest.spyOn(httpService, "put").mockImplementationOnce(() => of(response));

    const result = await service
      .update({
        id: "",
        title: "",
        description: "",
        price: 1,
        image: "",
        category: "",
      })
      .toPromise();

    expect(httpService.put).toBeCalled();
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("image");
    expect(result).toHaveProperty("category");
  });

  it("findOne", async () => {
    const response: AxiosResponse<any> = {
      data: products[0],
      headers: {},
      config: { url: "https://fakestoreapi.com/products" },
      status: 200,
      statusText: "OK",
    };
    jest.spyOn(httpService, "get").mockImplementationOnce(() => of(response));

    const result = await service
      .findOne({
        id: "5e469625-af4e-4f74-88f8-24f724bd87e8",
      })
      .toPromise();

    expect(httpService.get).toBeCalled();
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("image");
    expect(result).toHaveProperty("category");
  });

  it.each([
    [{ sort: { sortBy: SortType.ASCEND } }, 1],
    [{ pagination: { limit: 1 } }, 1],
  ])("findMany %s", async (parameter: IGetProducts, expected: number) => {
    const response: AxiosResponse<any> = {
      data: products,
      headers: {},
      config: { url: "https://fakestoreapi.com/products" },
      status: 200,
      statusText: "OK",
    };
    jest.spyOn(httpService, "get").mockImplementationOnce(() => of(response));

    const result = await service.findMany(parameter).toPromise();

    expect(httpService.get).toBeCalled();
    expect(result).toHaveLength(expected);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("description");
    expect(result[0]).toHaveProperty("price");
    expect(result[0]).toHaveProperty("image");
    expect(result[0]).toHaveProperty("category");
  });

  it("delete", async () => {
    const response: AxiosResponse<any> = {
      data: products,
      headers: {},
      config: { url: "https://fakestoreapi.com/products" },
      status: 200,
      statusText: "OK",
    };
    jest
      .spyOn(httpService, "delete")
      .mockImplementationOnce(() => of(response));

    await service
      .delete({
        id: "",
      })
      .toPromise();

    expect(httpService.delete).toBeCalled();
  });
});
