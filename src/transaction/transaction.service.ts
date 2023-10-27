import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MessageEntity } from 'src/common/global-endity/message.endity';
import { PrismaService } from 'src/common/prisma/prisma';

@Injectable()
export class TransactionService {
    
    constructor(private readonly prisma: PrismaService) {}

    public async addTrandaction() {
        try {
            
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong when adding the transaction!');
        }
    }

    public async getAllTransaction() {
        
    }

    public async getOneTransaction() {
        try {
            
        } catch (error) {
            
        }
    }

    public async editTransaction() {
        try {
            
        } catch (error) {
            
        }
    }

    public async deleteTransaction(id: number): Promise<MessageEntity> {
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
            throw new InternalServerErrorException('Something went wrong when deleting the transaction!');
        }
    }
}
