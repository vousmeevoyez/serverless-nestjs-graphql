import {
  Field,
  ID,
  InputType,
  PartialType as GraphQLPartialType,
} from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { IUpdateProduct } from "../product.interface";
import { CreateProductInput } from "./create-product.input";

@InputType()
export class UpdateProductInput extends GraphQLPartialType(CreateProductInput)
  implements IUpdateProduct {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id!: string;
}
