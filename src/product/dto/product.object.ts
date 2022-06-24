import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { IProduct } from "../product.interface";

@ObjectType()
export class Product implements IProduct {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => Float)
  price!: number;

  @Field()
  image!: string;

  @Field()
  category!: string;
}
