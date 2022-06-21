import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: {
        endpoint: process.env.IS_NOT_SLS === "true"
          ? "/graphql"
          : `/${process.env.STAGE}/graphql`,
      },
    }),
    ProductModule,
  ],
})
export class AppModule {}
