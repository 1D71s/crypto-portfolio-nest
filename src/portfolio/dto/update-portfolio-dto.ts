import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePortfolioInput {

    @IsNotEmpty()
    @Field()
    readonly id: number;

    @IsNotEmpty()
    @Field()
    readonly name: string;
}