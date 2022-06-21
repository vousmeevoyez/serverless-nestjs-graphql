import { Module } from "@nestjs/common";
import { ProductResolver } from "./resolver/product.resolver";
import { ProductService } from "./service/product.service";

@Module({
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
