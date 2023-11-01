import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { TransactionModule } from 'src/transaction/transaction.module';
import { CoinModule } from 'src/coin/coin.module';

@Module({
  providers: [StatisticsResolver, StatisticsService],
  imports: [
    TransactionModule,
    CoinModule
  ]
})
export class StatisticsModule {}
