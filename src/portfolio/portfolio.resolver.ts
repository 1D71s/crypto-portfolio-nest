import { MessageEntity } from 'src/common/global-endity/message.endity';
import { PortfolioService } from './portfolio.service';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth-guards';
import { CreatePortfolioInput } from './dto/create-portfolio-dto';
import { OnePortfolioEntity } from './endity/one-portfolio-endity';
import { User } from 'src/common/decorators/get-user';
import { UserEntity } from 'src/user/entity/user.entity';


@Resolver()
export class PortfolioResolver {

    constructor(private readonly portfolioService: PortfolioService) { }
    
    @Mutation(() => OnePortfolioEntity, { name: 'createPortfolio' })
    @UseGuards(AuthGuard)
    createPortfolio(@User() user: UserEntity, @Args('input') dto: CreatePortfolioInput) {
        return this.portfolioService.createPortfolio(dto, +user.id)
    }

    @UseGuards(AuthGuard)
    @Query(() => MessageEntity)
    getAllUserPortfolio() {

    }

    @UseGuards(AuthGuard)
    @Query(() => MessageEntity)
    getOnePortfolio() {
        
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageEntity, { name: 'updatePortfolio' })
    updatePortfolio() {
        
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageEntity, { name: 'deletePortfolio' })
    deletePortfolio() {
        
    }
}

