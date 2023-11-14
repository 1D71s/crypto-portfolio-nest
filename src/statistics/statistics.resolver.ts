import { Args, Query, Resolver } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth-guards';
import { FullStatisticEndity } from './endity/full-statistic-endity';
import { ItemStatisticEndity } from './endity/item-statistic-endity';
import { User } from 'src/common/decorators/get-user';
import { UserEntity } from 'src/user/entity/user.entity';
import { GetProfitOneCryptoDto } from './dto/profit-crypto-dto';
import { IdPortfolioInput } from 'src/portfolio/dto/id-portfolio-dto';

@Resolver()
export class StatisticsResolver {

    constructor(private readonly statisticsService: StatisticsService) { }
    
    @UseGuards(AuthGuard)
    @Query(() => FullStatisticEndity)
    getTotalProfitPortfolio(/*@User() user: UserEntity, @Args('input') dto: IdPortfolioInput*/) {
        return this.statisticsService.getTotalProfitPortfolio(1)
    }

    @UseGuards(AuthGuard)
    @Query(() => ItemStatisticEndity)
    getTotalProfitOneCrypto(/*@User() user: UserEntity, @Args('input') dto: GetProfitOneCryptoDto*/) {
        return this.statisticsService.getTotalProfitOneCrypto(1, 'WBT')
    }

}
