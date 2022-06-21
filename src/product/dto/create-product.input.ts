import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ICreateProduct } from "../product.interface";

@InputType()
export class CreateProductInput implements ICreateProduct {
  @IsNotEmpty()
  @IsString()
  @Field()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  stock!: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  image!: string;
}
