import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class UserEntity {
	@Field()
	id: number

	@Field()
	name: string

	@Field()
	email: string

    @Field()
	password: string
}