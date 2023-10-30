import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  providers: [StatisticsResolver, StatisticsService],
  imports: [
    TransactionModule
  ]
})
export class StatisticsModule {}
