import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "../service/product.service";
import { IGetProducts } from "../product.interface";

let service: ProductService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [ProductService],
  }).compile();

  service = module.get<ProductService>(ProductService);
});

describe("Product Service", () => {
  beforeAll(() => {
    expect(service).toBeDefined();
  });

  it("create", async () => {
    const result = await service.create({
      name: "",
      description: "",
      price: 1,
      stock: 1,
      image: "",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("stock");
    expect(result).toHaveProperty("image");
  });

  it("update", async () => {
    const result = await service.update({
      id: "",
      name: "",
      description: "",
      price: 1,
      stock: 1,
      image: "",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("stock");
    expect(result).toHaveProperty("image");
  });

  it("findOne", async () => {
    const result = await service.findOne({
      id: "5e469625-af4e-4f74-88f8-24f724bd87e8",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("stock");
    expect(result).toHaveProperty("image");
  });

  it.each([
    [{ filter: { name: "" } }, 2],
    [{ filter: { description: "" } }, 2],
  ])("findMany %s", async (parameter: IGetProducts, expected: number) => {
    const result = await service.findMany(parameter);
    expect(result).toHaveLength(expected);
  });

  it("delete", async () => {
    const result = await service.delete({
      id: "",
    });

    expect(result).toBeTruthy();
  });
});
