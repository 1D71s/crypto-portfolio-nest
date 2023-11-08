import { Controller, Get } from '@nestjs/common';
import { ChartService } from 'src/chart/chart.service';
import { StatisticsService } from 'src/statistics/statistics.service';

@Controller()
export class FortestController {
    constructor(
        private readonly statisticsService: StatisticsService,
        private readonly chartService: ChartService
    ) { }

    @Get()
    addToCart() {
        return this.chartService.calculateTotalProfitChart()
    }

    @Get('/total')
    getTotalProfitOneCrypto() {
        return this.statisticsService.getTotalProfitOneCrypto(1, 'WBT')
    }

    @Get('/portfolio')
    getTotalProfitPortfolio() {
        return this.statisticsService.getTotalProfitPortfolio(1)
    }
}
