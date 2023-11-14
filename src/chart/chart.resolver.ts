import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChartService } from './chart.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth-guards';
import { ChartStateForResult } from 'src/chart/endity/chart-state';
import { User } from 'src/common/decorators/get-user';
import { UserEntity } from 'src/user/entity/user.entity';
import { IdPortfolioInput } from 'src/portfolio/dto/id-portfolio-dto';

@Resolver('Chart')
export class ChartResolver {

    constructor(private readonly chartService: ChartService) { }
    
    @UseGuards(AuthGuard)
    @Query(() => [ChartStateForResult])
    calculateTotalProfitChart(@User() user: UserEntity, @Args('input') dto: IdPortfolioInput) {
        return this.chartService.checkByOwner(dto.id, user.id)
    }

}
