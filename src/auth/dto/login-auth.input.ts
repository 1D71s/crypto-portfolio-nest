import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class LoginAuthInput {
  
    @IsEmail()
    @Field()
    readonly email: string;

    @IsNotEmpty()
    @Field()
    readonly password: string;
}