import { ObjectType, Field } from "@nestjs/graphql";
import { Different24hEndity } from "src/statistics/endity/different24h-endity";
import { ItemStatisticEndity } from "./item-statistic-endity";

@ObjectType()
export class FullStatisticEndity {

    @Field()
    totalStart: number;

    @Field()
    totalNow: number;

    @Field()
    different24h: Different24hEndity;

    @Field()
    differentProcent: number;

    @Field()
    differentUsd: number;

    @Field()
    coins: ItemStatisticEndity[]
}