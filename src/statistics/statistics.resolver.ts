import { Query, Resolver } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { PriceData } from './endity/history.price';

@Resolver()
export class StatisticsResolver {

    constructor(private readonly statisticsService: StatisticsService) { }
    
    @Query(() => [PriceData])
    async getPrice(): Promise<PriceData[]> {
        return this.statisticsService.getHistoryPrice();
    }
}
