import { Field, Float, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ICreateProduct } from "../product.interface";

@InputType()
export class CreateProductInput implements ICreateProduct {
  @IsNotEmpty()
  @IsString()
  @Field()
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float)
  price!: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  image!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  category!: string;
}
