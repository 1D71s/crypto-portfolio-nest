import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreatePortfolioInput } from './dto/create-portfolio-dto';
import { UpdatePortfolioInput } from './dto/update-portfolio-dto';
import { PortfolioEntity } from './endity/portfolio-endity';
import { PortfolioWithTransactionEntity } from './endity/portfolio-with-transacion-endity';
import { MessageEntity } from 'src/common/global-endity/message.endity';
import { ChartStateForResult } from 'src/chart/endity/chart-state-for-result';


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
            throw error;
        }
    }

    public async getAllUserPortfolio(userId: number): Promise<PortfolioWithTransactionEntity[]> {
        try {
            const portfolios = await this.prisma.portfolio.findMany({
                where: {
                    authorId: +userId
                },
                include: {
                    transactions: true
                }
            })


            return portfolios

        } catch (error) {
            throw error;
        }
    }

    public async getOnePortfolio(portfolioId: number): Promise<PortfolioWithTransactionEntity> {
        try {
            const portfolio = await this.prisma.portfolio.findFirst({
                where: {
                    id: +portfolioId
                },
                include: {
                    transactions: true
                }
            })

            if (!portfolio) {
                throw new NotFoundException('Portfolio not found');
            }

            return portfolio

        } catch (error) {
            throw error;
        }
    }

    public async editPortfolio(dto: UpdatePortfolioInput, userId: number): Promise<PortfolioEntity> {
        try {

            const portfolio = await this.getOnePortfolio(dto.id)

            if (!portfolio) {
                throw new NotFoundException('Portfolio not found');
            }

            if (userId !== portfolio.authorId) {
                throw new UnauthorizedException('No access!!');
            }

            return this.prisma.portfolio.update({
                where: {
                    id: +dto.id
                },
                data: {
                    name: dto.name
                }
            })

        } catch (error) {
            throw error;
        }
    }

    public async deletePortfolio(portfolioId: number, userId: number): Promise<MessageEntity> {
        try {
            const portfolioToDelete = await this.getOnePortfolio(portfolioId)

            if (!portfolioToDelete) {
                throw new NotFoundException('Portfolio not found');
            }

            if (portfolioToDelete.authorId !== userId) {
                throw new UnauthorizedException('No access!!');
            }

            const deleteTransactionPromises = portfolioToDelete.transactions.map((transaction) =>
                this.transactionService.deleteTransaction(transaction.id, userId)
            );
            await Promise.all(deleteTransactionPromises);

            await this.prisma.portfolio.delete({
                where: {
                    id: +portfolioId
                }
            })

            return { message: 'Portfolio has been deleted!' }

        } catch (error) {
            throw error;
        }
    }

    public async checkByOwner(portfolio: number, userId: number): Promise<boolean> {
        try {
            const authorId = await this.getOnePortfolio(portfolio);

            if (userId !== +authorId.id) {
                return false
            }

            return true
        } catch (error) {
            throw error;
        }
    }
}