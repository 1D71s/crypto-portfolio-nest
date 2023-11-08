import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { TransactionModule } from 'src/transaction/transaction.module';
import { CoinModule } from 'src/coin/coin.module';
import { PrismaService } from 'src/common/prisma/prisma';

@Module({
  providers: [StatisticsResolver, StatisticsService, PrismaService],
  imports: [
    TransactionModule,
    CoinModule,
  ],
  exports: [
    StatisticsService
  ]
})
export class StatisticsModule {}
