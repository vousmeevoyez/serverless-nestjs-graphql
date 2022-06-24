import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateProductInput } from "../dto/create-product.input";
import { GetProductsInput } from "../dto/get-products.input";
import { GetProductInput } from "../dto/get-product.input";
import { Product } from "../dto/product.object";
import { UpdateProductInput } from "../dto/update-product.input";
import { ProductService } from "../service/product.service";

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args("input") input: CreateProductInput) {
    return this.productService.create(input).toPromise();
  }

  @Mutation(() => Product)
  updateProduct(@Args("input") input: UpdateProductInput) {
    return this.productService.update(input).toPromise();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args("input") input: GetProductInput) {
    await this.productService.delete(input).toPromise();
    // no void available on graphql
    return true;
  }

  @Query(() => Product)
  product(@Args("input") input: GetProductInput) {
    return this.productService.findOne(input).toPromise();
  }

  @Query(() => [Product])
  products(@Args("input", { nullable: true }) input: GetProductsInput) {
    return this.productService.findMany(input).toPromise();
  }
}
