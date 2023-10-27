import { MessageEntity } from 'src/common/global-endity/message.endity';
import { PortfolioService } from './portfolio.service';
import { Resolver, Mutation, Query } from '@nestjs/graphql';


@Resolver()
export class PortfolioResolver {

    constructor(private readonly portfolioService: PortfolioService) { }
    
    @Mutation(() => MessageEntity, { name: 'createPortfolio' })
    createPortfolio() {
        
    }

    @Query(() => MessageEntity)
    getAllUserPortfolio() {

    }

    @Query(() => MessageEntity)
    getOnePortfolio() {
        
    }

    @Mutation(() => MessageEntity, { name: 'updatePortfolio' })
    updatePortfolio() {
        
    }

    @Mutation(() => MessageEntity, { name: 'deletePortfolio' })
    deletePortfolio() {
        
    }
}

