import { useContainer } from "class-validator";
import { INestApplication } from "@nestjs/common";
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

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  it("/graphql (CreateProduct)", async () => {
    const response = await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: createProductMutation,
        variables: {
          name: "name",
          description: "name",
          price: 1,
          stock: 1,
          image: "image",
        },
      });
    expect(response.ok).toBeTruthy();
    expect(response.body.data.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("createProduct");
    expect(response.body.data.createProduct).toHaveProperty("name");
    expect(response.body.data.createProduct).toHaveProperty("description");
    expect(response.body.data.createProduct).toHaveProperty("price");
    expect(response.body.data.createProduct).toHaveProperty("stock");
    expect(response.body.data.createProduct).toHaveProperty("image");
  });

  it("/graphql (UpdateProduct)", async () => {
    const response = await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: updateProductMutation,
        variables: {
          id: "5e469625-af4e-4f74-88f8-24f724bd87e9",
          name: "name",
          description: "name",
          price: 1,
          stock: 1,
          image: "image",
        },
      });
    expect(response.ok).toBeTruthy();
    expect(response.body.data.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("updateProduct");
    expect(response.body.data.updateProduct).toHaveProperty("name");
    expect(response.body.data.updateProduct).toHaveProperty("description");
    expect(response.body.data.updateProduct).toHaveProperty("price");
    expect(response.body.data.updateProduct).toHaveProperty("stock");
    expect(response.body.data.updateProduct).toHaveProperty("image");
  });

  it("/graphql (DeleteProduct)", async () => {
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
    expect(response.body.data.product).toHaveProperty("name");
    expect(response.body.data.product).toHaveProperty("description");
    expect(response.body.data.product).toHaveProperty("price");
    expect(response.body.data.product).toHaveProperty("stock");
    expect(response.body.data.product).toHaveProperty("image");
  });

  it("/graphql (GetProducts)", async () => {
    const response = await request(app.getHttpServer()).post("/graphql").send({
      query: getProductsQuery,
      variables: {},
    });
    expect(response.ok).toBeTruthy();
    expect(response.body.data.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("products");
    expect(response.body.data.products[0]).toHaveProperty("name");
    expect(response.body.data.products[0]).toHaveProperty("description");
    expect(response.body.data.products[0]).toHaveProperty("price");
    expect(response.body.data.products[0]).toHaveProperty("stock");
    expect(response.body.data.products[0]).toHaveProperty("image");
  });
});
