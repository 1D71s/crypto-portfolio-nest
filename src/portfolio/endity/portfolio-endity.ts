import { ObjectType, Field } from "@nestjs/graphql"
import { TransactionEntity } from "src/transaction/endity/transaction-endity"

@ObjectType()
export class PortfolioEntity {

	@Field()
	id: number

	@Field()
	name: string

	@Field()
	authorId: number

	@Field(() => [TransactionEntity])
	transactions: TransactionEntity[]
}