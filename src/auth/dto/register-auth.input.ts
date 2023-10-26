import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateAuthInput {

    @IsEmail()
    @Field()
    readonly email: string;

    @IsNotEmpty()
    @Field()
    readonly name: string;
   
    @MinLength(6)    
    @Field()
    readonly password: string;
}