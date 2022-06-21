import { Field, InputType } from "@nestjs/graphql";
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { IGetProducts, IGetProductsFilter } from "../product.interface";

@InputType()
export class GetProductsFilter implements IGetProductsFilter {
  @IsString()
  @Field()
  name!: string;

  @IsString()
  @Field()
  description!: string;

  @IsNumber()
  @Field()
  price!: number;

  @IsNumber()
  @Field()
  stock!: number;
}

@InputType()
export class GetProductsInput implements IGetProducts {
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => GetProductsFilter, { nullable: true })
  filter?: IGetProductsFilter;
}
