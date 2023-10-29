import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma';
import { AddTransactionInput } from './dto/add-transaction';


@Injectable()
export class TransactionService {
    
    constructor( private readonly prisma: PrismaService ) {}

    public async addTransaction(dto: AddTransactionInput) {
        try {

            const portfolio = await this.prisma.portfolio.findFirst({ where: { id: +dto.portfolioId } })
            
            if (!portfolio) {
                throw new NotFoundException('Portfolio not found');
            }
            
            const transaction = await this.prisma.transaction.create({
                data: {
                    coin: dto.coin,
                    operation: dto.operation,
                    price: dto.price,
                    spent: dto.spent,
                    date: dto.date,
                    portfolioId: dto.portfolioId
                }
            });

            return transaction;

        } catch (error) {
            throw error;
        }
    }

    public async getAllTransaction() {
        try {
            
        } catch (error) {
            throw new error;
        }
    }

    public async getOneTransaction() {
        try {
            
        } catch (error) {
            throw new error;
        }
    }

    public async editTransaction() {
        try {
            
        } catch (error) {
            throw new error;
        }
    }

    public async deleteTransaction(id: number) {
        try {
            const transactionToDelete = await this.prisma.transaction.findUnique({
                where: { id: +id },
            });

            if (!transactionToDelete) {
                throw new NotFoundException('Transaction not found');
            }

            await this.prisma.transaction.delete({
                where: {
                    id: transactionToDelete.id
                }
            })

            return { message: 'Transaction has been deleted!' }
        } catch (error) {
            throw new error;
        }
    }
}
