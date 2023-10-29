import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { AddTransactionInput } from './dto/add-transaction';
import { TransactionEntity } from './endity/transaction-endity';
import { MessageEntity } from 'src/common/global-endity/message.endity';
import { IdInput } from './dto/id-input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth-guards';
import { User } from 'src/common/decorators/get-user';
import { UserEntity } from 'src/user/entity/user.entity';

@Resolver('Transaction')
export class TransactionResolver {

    constructor(private readonly transactionService: TransactionService) { }
    
    @UseGuards(AuthGuard)
    @Mutation(() => TransactionEntity)
    addTransaction(@User() user: UserEntity, @Args('input') dto: AddTransactionInput) {
        return this.transactionService.addTransaction(dto, +user.id)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageEntity)
    deleteTransaction(@Args('input') dto: IdInput) {
        return this.transactionService.deleteTransaction(dto.id)
    }
}
