import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartResolver } from './chart.resolver';
import { CoinModule } from 'src/coin/coin.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { PrismaService } from 'src/common/prisma/prisma';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { JwtModule } from '@nestjs/jwt';
import { PortfolioModule } from 'src/portfolio/portfolio.module';

@Module({
  providers: [ChartResolver, ChartService, PrismaService],
  imports: [
    TransactionModule,
    CoinModule,
    StatisticsModule,
    PortfolioModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
          expiresIn: '24h'
      }
    })
  ],
  exports: [
    ChartService
  ]
})
export class ChartModule {}
