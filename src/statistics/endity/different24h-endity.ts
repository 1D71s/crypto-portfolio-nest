import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Different24hEndity {

    @Field()
    procent: number;

    @Field()
    usd: number;
}