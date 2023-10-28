import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class ManyPortfoliosEntity {

	@Field()
	token: string
	
}