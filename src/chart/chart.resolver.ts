import { Resolver } from '@nestjs/graphql';
import { ChartService } from './chart.service';

@Resolver('Chart')
export class ChartResolver {
  constructor(private readonly chartService: ChartService) {}
}
