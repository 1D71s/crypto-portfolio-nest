import 'dotenv/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CoinService } from 'src/coin/coin.service';
import { PrismaService } from 'src/common/prisma/prisma';
import { TransactionEntity } from 'src/transaction/endity/transaction-endity';
import { ItemStatisticEndity } from './endity/item-statistic-endity';
import { Different24hEndity } from 'src/statistics/endity/different24h-endity';
import { FullStatisticEndity } from './endity/full-statistic-endity';
import { PortfolioService } from 'src/portfolio/portfolio.service';

@Injectable()
export class StatisticsService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly coinService: CoinService,
        private readonly portfolioService: PortfolioService,
    ) {}

    public async getTotalProfitPortfolio(portfolioId: number): Promise<FullStatisticEndity> {
        try {
            const crypto = await this.prisma.transaction.findMany({
                where: {  portfolioId: portfolioId }
            })

            const uniqueCoinsSet = new Set(crypto.map(transaction => transaction.coin));
            const uniqueCoinsArray = Array.from(uniqueCoinsSet);

            const statePortfolio = await Promise.all(uniqueCoinsArray.map(async (item) => {
                const result = await this.getTotalProfitOneCrypto(portfolioId, item);
                return result;
            }));

            const totalStart = statePortfolio.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.start;
            }, 0);

            const totalNow = statePortfolio.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.now;
            }, 0);

            const different24h = this.getDifferentOfOneDayAllCoins(statePortfolio, totalNow);

            const differentStartNow = {
                totalStart,
                totalNow,
                different24h,
                differentUsd: totalNow - totalStart,
                differentProcent: ((totalNow - totalStart) / totalStart) * 100,
                coins: statePortfolio, 
            };

            return differentStartNow;
        } catch (error) {
            throw error;
        }
    }

    public async getTotalProfitOneCrypto(portfolioId: number, coin: string): Promise<ItemStatisticEndity> {
        try {
            const priceToday = await this.coinService.getHistoryPriceOneDay(Date.now(), coin);

            const state = { usd: 0, coin: 0 };

            const spent = await this.prisma.transaction.findMany({
                where: { coin, portfolioId }
            })

            for (let i = 0; i < spent.length; i++) {
                state.usd += spent[i].spent;
                state.coin += spent[i].spentCoin;
            }

            const now = state.coin * priceToday;
            const different24h = await this.getDifferentOfOneDay(coin, state.coin);

            const result = {
                coin,
                now,
                different24h,
                start: state.usd,
                coinState: state.coin,
                profitProcent: ((now - state.usd) / state.usd) * 100,
                profitUsd: now - state.usd
            };

            return result;
        } catch (error) {
            throw error;
        }
    }

    private getDifferentOfOneDayAllCoins(coins: ItemStatisticEndity[], state: number): Different24hEndity {
        const result = { procent: 0, usd: 0 };

        for (let i = 0; i < coins.length; i++) {
            result.usd += coins[i].different24h.usd;
        }

        result.procent = (result.usd / state) * 100;

        return result;
    }

    private async getDifferentOfOneDay(coin: string, coinState: number): Promise<Different24hEndity> {
        try {
            const currentDate = new Date();
    
            const twentyFourHoursAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);    
            const priceYesterday = await this.coinService.getHistoryPriceOneDay(+new Date(+twentyFourHoursAgo / 1000), coin);

            const priceToday = await this.coinService.getHistoryPriceOneDay(Date.now(), coin);

            const differentUsd = (priceToday * coinState) - (priceYesterday * coinState);
            const differenceProcent = ((priceToday - priceYesterday) / priceYesterday) * 100;

            const result = { usd: differentUsd, procent: differenceProcent };
        
            return result;
            
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