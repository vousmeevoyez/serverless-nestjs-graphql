import { MockFunctionMetadata, ModuleMocker } from "jest-mock";
import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "../service/product.service";
//import { IGetProducts } from "../product.interface";
//import { SortType } from "../product.enum";
import products from "../product.data";

const moduleMocker = new ModuleMocker(global);

let service: ProductService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [ProductService],
  })
    .useMocker((token) => {
      if (token === HttpService) {
        return {
          post: jest.fn().mockResolvedValue(products[0]),
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

  service = module.get<ProductService>(ProductService);
});

describe("Product Service", () => {
  beforeAll(() => {
    expect(service).toBeDefined();
  });

  it("create", async () => {
    const result = await service.create({
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

  //it("update", async () => {
  //  const result = await service.update({
  //    id: "",
  //    title: "",
  //    description: "",
  //    price: 1,
  //    image: "",
  //    category: "",
  //  });

  //  expect(result).toHaveProperty("id");
  //  expect(result).toHaveProperty("title");
  //  expect(result).toHaveProperty("description");
  //  expect(result).toHaveProperty("price");
  //  expect(result).toHaveProperty("image");
  //  expect(result).toHaveProperty("category");
  //});

  //it("findOne", async () => {
  //  const result = await service.findOne({
  //    id: "5e469625-af4e-4f74-88f8-24f724bd87e8",
  //  });

  //  expect(result).toHaveProperty("id");
  //  expect(result).toHaveProperty("title");
  //  expect(result).toHaveProperty("description");
  //  expect(result).toHaveProperty("price");
  //  expect(result).toHaveProperty("image");
  //  expect(result).toHaveProperty("category");
  //});

  //it.each([
  //  [{ sort: { sortBy: SortType.ASCEND } }, 1],
  //  [{ pagination: { limit: 1 } }, 1],
  //])("findMany %s", async (parameter: IGetProducts, expected: number) => {
  //  const result = await service.findMany(parameter);
  //  expect(result).toHaveLength(expected);
  //});

  //it("delete", async () => {
  //  const result = await service.delete({
  //    id: "",
  //  });

  //  expect(result).toBeTruthy();
  //});
});
