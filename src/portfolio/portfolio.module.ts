import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioResolver } from './portfolio.resolver';
import { PrismaService } from 'src/common/prisma/prisma';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
  controllers: [],
  providers: [
    PortfolioService,
    PortfolioResolver,
    PrismaService,
    TransactionService
  ]
})
export class PortfolioModule {}
