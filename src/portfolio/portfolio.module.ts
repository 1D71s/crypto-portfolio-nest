import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioResolver } from './portfolio.resolver';
import { PrismaService } from 'src/common/prisma/prisma';
import { TransactionService } from 'src/transaction/transaction.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [],
  providers: [
    PortfolioService,
    PortfolioResolver,
    PrismaService,
    TransactionService,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
          expiresIn: '24h'
      }
    })
  ],
  exports: [
    PortfolioService
  ]
})
export class PortfolioModule {}
