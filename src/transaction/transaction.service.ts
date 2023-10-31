import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma';
import { AddTransactionInput } from './dto/add-transaction';
import { UpdateTransactionInput } from './dto/edit-transaction';
import { MessageEntity } from 'src/common/global-endity/message.endity';
import { TransactionEntity } from './endity/transaction-endity';


@Injectable()
export class TransactionService {
    
    constructor( private readonly prisma: PrismaService ) {}

    public async addTransaction(dto: AddTransactionInput, userId: number): Promise<TransactionEntity> {
        try {

            const portfolio = await this.prisma.portfolio.findFirst({ where: { id: +dto.portfolioId } })
            
            if (!portfolio) {
                throw new NotFoundException('Portfolio not found');
            }

            if (portfolio.authorId !== userId) {
                throw new UnauthorizedException('No access!!');
            }
            
            return this.prisma.transaction.create({
                data: {
                    coin: dto.coin,
                    operation: dto.operation,
                    price: dto.price,
                    spent: dto.spent,
                    date: dto.date,
                    authorId: +userId,
                    portfolioId: dto.portfolioId
                }
            });

        } catch (error) {
            throw error;
        }
    }

    public async editTransaction(dto: UpdateTransactionInput, userId: number): Promise<TransactionEntity> {
        try {
            const transaction = await this.getOneTransaction(dto.id)
            
            if (!transaction) {
                throw new NotFoundException('Portfolio not found');
            }

            if (transaction.authorId !== userId) {
                throw new UnauthorizedException('No access!!');
            }
            
            return this.prisma.transaction.update({
                where: {
                    id: dto.id
                },
                data: {
                    coin: dto.coin,
                    operation: dto.operation,
                    price: dto.price,
                    spent: dto.spent,
                    date: dto.date,
                    authorId: +userId,
                }
            });

        } catch (error) {
            throw error;
        }
    }

    public async getOneTransaction(transactionId: number): Promise<TransactionEntity> {
        try {
            const transaction = await this.prisma.transaction.findUnique({
                where: { id: +transactionId },
            });

            if (!transaction) {
                throw new NotFoundException('Transaction not found');
            }

            return transaction

        } catch (error) {
            throw error;
        }
    }

    public async getAllTransactionInPortfolio(portfolioId: number): Promise<TransactionEntity[]> {
        try {
            const transactions = await this.prisma.transaction.findMany({
                where: { portfolioId }
            });

            if (!transactions) {
                throw new NotFoundException('Transaction not found');
            }

            return transactions

        } catch (error) {
            throw error;
        }
    }

    public async deleteTransaction(id: number, userId: number): Promise<MessageEntity> {
        try {
            const transactionToDelete = await this.getOneTransaction(id);

            if (transactionToDelete.authorId !== userId) {
                throw new UnauthorizedException('No access!!');
            }

            await this.prisma.transaction.delete({
                where: {
                    id: transactionToDelete.id
                }
            })

            return { message: 'Transaction has been deleted!' }
        } catch (error) {
            throw error;
        }
    }
}