import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinResolver } from './coin.resolver';

@Module({
  providers: [CoinResolver, CoinService],
  exports: [
    CoinService
  ]
})
export class CoinModule {}
