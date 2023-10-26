import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
    @Field()
    readonly email: string;

    @Field()
    readonly name: string;

    @Field()
    readonly password: string;
}