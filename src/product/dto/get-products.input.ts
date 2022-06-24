import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum, IsNumber, IsOptional, ValidateNested } from "class-validator";
import {
  IGetProducts,
  IGetProductsPagination,
  IGetProductsSort,
} from "../product.interface";
import { SortType } from "../product.enum";

registerEnumType(SortType, { name: "SortType" });

@InputType()
export class GetProductsPagination implements IGetProductsPagination {
  @IsNumber()
  @Field()
  limit!: number;
}

@InputType()
export class GetProductsSort implements IGetProductsSort {
  @Field(() => SortType, { nullable: true })
  @IsOptional()
  @IsEnum(SortType)
  sortBy!: SortType;
}

@InputType()
export class GetProductsInput implements IGetProducts {
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => GetProductsPagination, { nullable: true })
  pagination?: IGetProductsPagination;

  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => GetProductsSort, { nullable: true })
  sort?: IGetProductsSort;
}
