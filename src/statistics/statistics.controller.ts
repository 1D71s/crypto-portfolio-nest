import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from "./statistics.service";


@Controller('/')
export class StatisticsController {

  constructor(private readonly statisticsService: StatisticsService) { }

  @Get()
  addToCart() {
    return this.statisticsService.calculateTotalProfit()
  }
}