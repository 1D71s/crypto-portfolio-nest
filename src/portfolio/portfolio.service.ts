import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma';
import { MessageEntity } from '../common/global-endity/message.endity';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreatePortfolioInput } from './dto/create-portfolio-dto';
import { UpdatePortfolioInput } from './dto/update-portfolio-dto';
import { PortfolioEntity } from './endity/portfolio-endity';

@Injectable()
export class PortfolioService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly transactionService: TransactionService
    ) { }

    public async createPortfolio(dto: CreatePortfolioInput, userId: number): Promise<PortfolioEntity> {
        try {
            const portfolio = await this.prisma.portfolio.create({
                data: {
                    name: dto.name,
                    authorId: +userId
                },
            })

            return portfolio
            
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong wehen creating the portfolio!');
        }
    }

    public async getAllUserPortfolio(): Promise<PortfolioEntity[]> {
        try {
            const portfolios = await this.prisma.portfolio.findMany()

            return portfolios

        } catch (error) {
            throw new InternalServerErrorException('An error occurred while retrieving the portfolios!');
        }
    }

    public async getOnePortfolio(portfolioId: number) {
        try {
            const portfolio = await this.prisma.portfolio.findFirst({
                where: {
                    id: +portfolioId
                }
            })

            return portfolio
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while retrieving the portfolio!');
        }
    }

    public async editPortfolio(dto: UpdatePortfolioInput, portfolioId: number) {
        try {
            const portfolio = await this.prisma.portfolio.update({
                where: {
                    id: +portfolioId
                },
                data: {
                    name: dto.name
                }
            })

            return portfolio
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong when editing the portfolio!');
        }
    }

    public async deletePortfolio(id: number): Promise<MessageEntity> {
        try {
            const portfolioToDelete = await this.prisma.portfolio.findUnique({
                where: { id: +id },
            });

            if (!portfolioToDelete) {
                throw new NotFoundException('Portfolio not found');
            }

            //delete portfolio's transactions
            console.log("delete portfolio's transactions")

            await this.prisma.portfolio.delete({
                where: {
                    id: portfolioToDelete.id
                }
            })

            return { message: 'Portfolio has been deleted!' }
    
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong when deleting the portfolio!');
        }
    }
}