import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddTransactionInput {

    @IsNotEmpty()
    @Field()
    readonly name: string;
}