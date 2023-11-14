import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { TransactionModule } from 'src/transaction/transaction.module';
import { CoinModule } from 'src/coin/coin.module';
import { PrismaService } from 'src/common/prisma/prisma';
import { JwtModule } from '@nestjs/jwt';
import { PortfolioModule } from 'src/portfolio/portfolio.module';

@Module({
  providers: [StatisticsResolver, StatisticsService, PrismaService],
  imports: [
    TransactionModule,
    CoinModule,
    PortfolioModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
          expiresIn: '24h'
      }
    })
  ],
  exports: [
    StatisticsService
  ]
})
export class StatisticsModule {}
