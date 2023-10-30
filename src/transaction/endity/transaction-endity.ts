import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class TransactionEntity {

    @Field()
    readonly id: number

    @Field()
    readonly coin: string;

    @Field()
    readonly operation: boolean;

    @Field()
    readonly price: number;

    @Field()
    readonly spent: number;

    @Field()
    readonly date: Date;

    @Field()
    readonly authorId: number;

    @Field()
    readonly portfolioId: number;
}