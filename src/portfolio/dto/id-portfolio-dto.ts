import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class IdPortfolioInput {

    @IsNotEmpty()
    @Field()
    readonly id: number;
}