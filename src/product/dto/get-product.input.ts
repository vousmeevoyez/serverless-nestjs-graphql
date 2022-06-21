import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { IGetProduct } from "../product.interface";

@InputType()
export class GetProductInput implements IGetProduct {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id!: string;
}
