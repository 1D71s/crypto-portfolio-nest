import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { TransactionModule } from 'src/transaction/transaction.module';
import { CoinModule } from 'src/coin/coin.module';
import { StatisticsController } from "./statistics.controller";

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsResolver, StatisticsService],
  imports: [
    TransactionModule,
    CoinModule
  ]
})
export class StatisticsModule {}
