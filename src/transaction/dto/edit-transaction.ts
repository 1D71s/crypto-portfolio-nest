import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateTransactionInput {

    @IsNotEmpty()
    @Field()
    readonly id: number;

    @IsNotEmpty()
    @Field()
    readonly coin: string;

    @IsNotEmpty()
    @Field()
    readonly operation: boolean;

    @IsNotEmpty()
    @Field()
    readonly price: number;

    @IsNotEmpty()
    @Field()
    readonly spent: number;

    @IsNotEmpty()
    @Field()
    readonly date: string;
}