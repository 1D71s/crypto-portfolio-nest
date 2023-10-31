import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PriceData {

    @Field()
    price: number;
    
}