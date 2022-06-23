import { MockFunctionMetadata, ModuleMocker } from "jest-mock";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "../service/product.service";
import products from "../product.data";

const moduleMocker = new ModuleMocker(global);

let resolver: ProductResolver;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [ProductResolver],
  })
    .useMocker((token) => {
      if (token === ProductService) {
        return {
          create: jest.fn().mockResolvedValue(products[0]),
          update: jest.fn().mockResolvedValue(products[0]),
          delete: jest.fn().mockResolvedValue(true),
          findOne: jest.fn().mockResolvedValue(products[0]),
          findMany: jest.fn().mockResolvedValue(products),
        };
      }
      if (typeof token === "function") {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();

  resolver = module.get<ProductResolver>(ProductResolver);
});

describe("Product Resolver", () => {
  beforeAll(async () => {
    expect(resolver).toBeDefined();
  });

  it("createProduct", async () => {
    const result = await resolver.createProduct({
      title: "",
      description: "",
      price: 1,
      image: "",
      category: "",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("image");
    expect(result).toHaveProperty("category");
  });

  it("updateProduct", async () => {
    const result = await resolver.updateProduct({
      id: "",
      title: "",
      description: "",
      price: 1,
      image: "",
      category: "",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("image");
    expect(result).toHaveProperty("category");
  });

  it("product", async () => {
    const result = await resolver.product({
      id: "",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("image");
    expect(result).toHaveProperty("category");
  });

  it("products", async () => {
    const result = await resolver.products({});

    expect(result).toHaveLength(1);
  });

  it("deleteProduct", async () => {
    const result = await resolver.deleteProduct({
      id: "",
    });

    expect(result).toBeTruthy();
  });
});
