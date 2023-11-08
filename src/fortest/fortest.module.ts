import { Module } from '@nestjs/common';
import { FortestController } from './fortest.controller';
import { ChartModule } from 'src/chart/chart.module';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  controllers: [FortestController],
  imports: [
    ChartModule,
    StatisticsModule
  ]
})
export class FortestModule {}
