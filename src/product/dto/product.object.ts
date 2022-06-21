import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { IProduct } from "../product.interface";

@ObjectType()
export class Product implements IProduct {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  price!: number;

  @Field(() => Int)
  stock!: number;

  @Field()
  image!: string;
}
