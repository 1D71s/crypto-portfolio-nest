import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class PortfolioEntity {

    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    authorId: number;
}
