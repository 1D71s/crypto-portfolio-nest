import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class TokenEntity {

	@Field()
	token: string
	
}