import { PortfolioService } from './portfolio.service';
import { PriceService } from 'src/price/price.service';
import { Query, Resolver } from '@nestjs/graphql';
import { PriceData } from './endity/history.price';


@Resolver()
export class PortfolioResolver {
    constructor(
        private readonly portfolioService: PortfolioService,
        private readonly priceService: PriceService
    ) {}
    
    @Query(() => [PriceData])
    async getPrice(): Promise<PriceData[]> {
        return this.priceService.getHistoryPrice();
    }
}

