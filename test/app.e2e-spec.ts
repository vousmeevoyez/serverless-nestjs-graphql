import { of } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { useContainer } from "class-validator";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "./../src/app.module";
import {
  createProductMutation,
  deleteProductMutation,
  getProductQuery,
  getProductsQuery,
  updateProductMutation,
} from "./gql.fixture";
import products from "../src/product/product.data";

class MockHttpService {
  post = jest.fn();
  put = jest.fn();
  get = jest.fn();
  delete = jest.fn();
}

let httpService: HttpService;

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: HttpService,
          useClass: MockHttpService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();

    httpService = module.get<HttpService>(HttpService);
  });

  it("/graphql (CreateProduct)", async () => {
    jest.spyOn(httpService, "post").mockImplementationOnce(() =>
      of({
        data: products[0],
        headers: {},
        config: { url: "https://fakestoreapi.com/products" },
        status: 200,
        statusText: "OK",
      })
    );

    const response = await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: createProductMutation,
        variables: {
          title: "name",
          description: "description",
          price: 1,
          category: "category",
          image: "image",
        },
      });

    expect(response.ok).toBeTruthy();
    expect(response.body.data.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("createProduct");
    expect(response.body.data.createProduct).toHaveProperty("title");
    expect(response.body.data.createProduct).toHaveProperty("description");
    expect(response.body.data.createProduct).toHaveProperty("price");
    expect(response.body.data.createProduct).toHaveProperty("category");
    expect(response.body.data.createProduct).toHaveProperty("image");
  });

  it("/graphql (UpdateProduct)", async () => {
    jest.spyOn(httpService, "put").mockImplementationOnce(() =>
      of({
        data: products[0],
        headers: {},
        config: { url: "https://fakestoreapi.com/products" },
        status: 200,
        statusText: "OK",
      })
    );

    const response = await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: updateProductMutation,
        variables: {
          id: "5e469625-af4e-4f74-88f8-24f724bd87e9",
          title: "name",
          description: "description",
          price: 1,
          category: "category",
          image: "image",
        },
      });
    expect(response.ok).toBeTruthy();
    expect(response.body.data.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("updateProduct");
    expect(response.body.data.updateProduct).toHaveProperty("title");
    expect(response.body.data.updateProduct).toHaveProperty("description");
    expect(response.body.data.updateProduct).toHaveProperty("price");
    expect(response.body.data.updateProduct).toHaveProperty("category");
    expect(response.body.data.updateProduct).toHaveProperty("image");
  });

  it("/graphql (DeleteProduct)", async () => {
    jest.spyOn(httpService, "delete").mockImplementationOnce(() =>
      of({
        data: undefined,
        headers: {},
        config: { url: "https://fakestoreapi.com/products" },
        status: 200,
        statusText: "OK",
      })
    );

    const response = await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: deleteProductMutation,
        variables: {
          id: "5e469625-af4e-4f74-88f8-24f724bd87e9",
        },
      });

    expect(response.ok).toBeTruthy();
    expect(response.body.data.errors).toBeUndefined();
    expect(response.body.data.deleteProduct).toBeTruthy();
  });

  it("/graphql (GetProduct)", async () => {
    jest.spyOn(httpService, "get").mockImplementationOnce(() =>
      of({
        data: products[0],
        headers: {},
        config: { url: "https://fakestoreapi.com/products" },
        status: 200,
        statusText: "OK",
      })
    );

    const response = await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: getProductQuery,
        variables: {
          id: "5e469625-af4e-4f74-88f8-24f724bd87e8",
        },
      });
    expect(response.ok).toBeTruthy();
    expect(response.body.data.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("product");
    expect(response.body.data.product).toHaveProperty("title");
    expect(response.body.data.product).toHaveProperty("description");
    expect(response.body.data.product).toHaveProperty("price");
    expect(response.body.data.product).toHaveProperty("category");
    expect(response.body.data.product).toHaveProperty("image");
  });

  it("/graphql (GetProducts)", async () => {
    jest.spyOn(httpService, "get").mockImplementationOnce(() =>
      of({
        data: products,
        headers: {},
        config: { url: "https://fakestoreapi.com/products" },
        status: 200,
        statusText: "OK",
      })
    );

    const response = await request(app.getHttpServer()).post("/graphql").send({
      query: getProductsQuery,
      variables: {},
    });

    expect(response.ok).toBeTruthy();
    expect(response.body.data.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("products");
    expect(response.body.data.products[0]).toHaveProperty("title");
    expect(response.body.data.products[0]).toHaveProperty("description");
    expect(response.body.data.products[0]).toHaveProperty("price");
    expect(response.body.data.products[0]).toHaveProperty("category");
    expect(response.body.data.products[0]).toHaveProperty("image");
  });
});
