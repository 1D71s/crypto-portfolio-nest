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
    getAllUserPortfolio() {
        return this.portfolioService.getAllUserPortfolio()
    }

    @UseGuards(AuthGuard)
    @Query(() => MessageEntity)
    getOnePortfolio() {
        
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageEntity)
    updatePortfolio() {
        
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageEntity)
    deletePortfolio(@Args('input') input: IdPortfolioInput) {
        return this.portfolioService.deletePortfolio(input.id)
    }
}

