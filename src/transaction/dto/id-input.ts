import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class IdInput {

    @IsNotEmpty()
    @Field()
    readonly id: number;
}