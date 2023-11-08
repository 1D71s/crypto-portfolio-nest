import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { CoinService } from 'src/coin/coin.service';
import { PrismaService } from 'src/common/prisma/prisma';
import { TransactionEntity } from 'src/transaction/endity/transaction-endity';

@Injectable()
export class StatisticsService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly coinService: CoinService
    ) {}

    public async getTotalProfitPortfolio(portfolioId: number) {
        try {
            const crypto = await this.prisma.transaction.findMany({
                where: {  portfolioId: portfolioId }
            })

            const uniqueCoinsSet = new Set(crypto.map(transaction => transaction.coin));
            const uniqueCoinsArray = Array.from(uniqueCoinsSet);

            const statePortfolio = await Promise.all(uniqueCoinsArray.map(async (item) => {
                const result = await this.getTotalProfitOneCrypto(portfolioId, item);
                return result
            }));

            const totalStart = statePortfolio.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.start;
            }, 0);

            const totalNow = statePortfolio.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.now;
            }, 0);

            const differentStartNow = {
                totalStart,
                totalNow,
                differentProcent: totalNow - totalStart,
                differentUsd: ((totalNow - totalStart) / totalStart) * 100,
                coins: statePortfolio, 
            };

            return differentStartNow;
        } catch (error) {
            throw error;
        }
    }

    public async getTotalProfitOneCrypto(portfolioId: number, coin: string) {
        try {
            const priceToday = await this.coinService.getHistoryPriceOneDay(Date.now(), coin);

            const state = { usd: 0, coin: 0 }

            const spent = await this.prisma.transaction.findMany({
                where: { coin, portfolioId }
            })

            for (let i = 0; i < spent.length; i++) {
                state.usd += spent[i].spent;
                state.coin += spent[i].spentCoin;
            }

            const now = state.coin * priceToday;

            const result = {
                coin,
                now,
                start: state.usd,
                profitProcent: ((now - state.usd) / state.usd) * 100,
                profitUsd: now - state.usd
            };

            return result
        } catch (error) {
            throw error;
        }
    }

    public getOneDayTransactionSum(transactions: TransactionEntity[]): number {
        let result = 0;
    
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].operation) {
                result += transactions[i].spentCoin;
            } else  {
                result -= transactions[i].spentCoin;
            }
        }

        return result;
    }
    
    public getOldestDate(transactions: TransactionEntity[]): number {
        if (transactions.length === 0) {
            return null; 
        }

        let oldestDate = new Date(transactions[0].date);
        
        for (const transaction of transactions) {
            const currentDate = new Date(transaction.date);
            if (currentDate < oldestDate) {
                oldestDate = currentDate;
            }
        }

        const timestamp = new Date(oldestDate).getTime() / 1000;

        return +timestamp; 
    }
}
