import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { AddTransactionInput } from './dto/add-transaction';
import { TransactionEntity } from './endity/transaction-endity';
import { MessageEntity } from 'src/common/global-endity/message.endity';
import { IdInput } from './dto/id-input';

@Resolver('Transaction')
export class TransactionResolver {

    constructor(private readonly transactionService: TransactionService) { }
    
    @Mutation(() => TransactionEntity)
    addTransaction(@Args('input') dto: AddTransactionInput) {
        return this.transactionService.addTransaction(dto)
    }

    @Mutation(() => MessageEntity)
    deleteTransaction(@Args('input') dto: IdInput) {
        return this.transactionService.deleteTransaction(dto.id)
    }
}
