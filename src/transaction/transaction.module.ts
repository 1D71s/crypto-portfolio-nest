import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { PrismaService } from 'src/common/prisma/prisma';
import { JwtModule } from '@nestjs/jwt';


@Module({
  providers: [
    TransactionResolver,
    TransactionService,
    PrismaService
  ],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
          expiresIn: '24h'
      }
    })
  ]
})
export class TransactionModule {}
