import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ChartStateForResult {

    @Field()
    readonly coinState: number;

    @Field()
    readonly date: Date;

}