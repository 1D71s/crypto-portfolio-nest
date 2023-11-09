import { ObjectType, Field } from "@nestjs/graphql";
import { Different24hEndity } from "src/statistics/endity/different24h-endity";

@ObjectType()
export class ItemStatisticEndity {

    @Field()
    coin: string;

    @Field()
    now: number;

    @Field()
    different24h: Different24hEndity;

    @Field()
    start: number;

    @Field()
    coinState: number;

    @Field()
    profitProcent: number;

    @Field()
    profitUsd: number;
}
