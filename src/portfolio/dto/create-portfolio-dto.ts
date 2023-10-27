import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePortfolioInput {

    @IsNotEmpty()
    @Field()
    readonly name: string;
}