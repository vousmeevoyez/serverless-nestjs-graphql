import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ProductResolver } from "./resolver/product.resolver";
import { ProductService } from "./service/product.service";

@Module({
  imports: [HttpModule],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
