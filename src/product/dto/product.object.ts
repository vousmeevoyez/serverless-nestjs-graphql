import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { IProduct } from "../product.interface";

@ObjectType()
export class Product implements IProduct {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  price!: number;

  @Field()
  image!: string;

  @Field()
  category!: string;
}
