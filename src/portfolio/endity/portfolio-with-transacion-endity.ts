import { ObjectType, Field } from "@nestjs/graphql"
import { TransactionEntity } from "src/transaction/endity/transaction-endity"
import { PortfolioEntity } from "./portfolio-endity"

@ObjectType()
export class PortfolioWithTransactionEntity extends PortfolioEntity{
	
	@Field(() => [TransactionEntity])
	transactions: TransactionEntity[]
}

export { PortfolioEntity };