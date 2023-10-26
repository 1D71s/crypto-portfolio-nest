import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PriceModule } from 'src/price/price.module';
import { PortfolioResolver } from './portfolio.resolver';

@Module({
  controllers: [],
  providers: [PortfolioService, PortfolioResolver],
  imports: [
    PriceModule
  ]
})
export class PortfolioModule {}
