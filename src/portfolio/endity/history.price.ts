import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PriceData {

    @Field()
    time: Date;

    @Field()
    open: number;
    
}