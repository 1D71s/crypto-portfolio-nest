import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { PrismaService } from 'src/common/prisma/prisma';

@Module({
  providers: [TransactionResolver, TransactionService, PrismaService],
})
export class TransactionModule {}
