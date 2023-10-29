import { MessageEntity } from 'src/common/global-endity/message.endity';
import { PortfolioService } from './portfolio.service';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth-guards';
import { CreatePortfolioInput } from './dto/create-portfolio-dto';
import { PortfolioEntity } from './endity/portfolio-endity';
import { User } from 'src/common/decorators/get-user';
import { UserEntity } from 'src/user/entity/user.entity';
import { IdPortfolioInput } from './dto/id-portfolio-dto';
import { UpdatePortfolioInput } from './dto/update-portfolio-dto';


@Resolver()
export class PortfolioResolver {

    constructor(private readonly portfolioService: PortfolioService) { }
    
    @UseGuards(AuthGuard)
    @Mutation(() => PortfolioEntity)
    createPortfolio(@User() user: UserEntity, @Args('input') dto: CreatePortfolioInput) {
        return this.portfolioService.createPortfolio(dto, +user.id)
    }

    @UseGuards(AuthGuard)
    @Query(() => [PortfolioEntity])
    getAllUserPortfolio(@User() user: UserEntity) {
        return this.portfolioService.getAllUserPortfolio(+user.id)
    }

    @UseGuards(AuthGuard)
    @Query(() => PortfolioEntity)
    getOnePortfolio(@Args('input') dto: IdPortfolioInput) {
        return this.portfolioService.getOnePortfolio(dto.id)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => PortfolioEntity)
    updatePortfolio(@User() user: UserEntity, @Args('input') dto: UpdatePortfolioInput) {
        return this.portfolioService.editPortfolio(dto, +user.id)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageEntity)
    deletePortfolio(@User() user: UserEntity, @Args('input') dto: IdPortfolioInput) {
        return this.portfolioService.deletePortfolio(dto.id, +user.id)
    }
}

