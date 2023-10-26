import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  
    @Field()
    readonly email: string;

    @Field()
    readonly password: string;
}