import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionEntity } from 'src/transaction/endity/transaction-endity';
import { CoinService } from 'src/coin/coin.service';
import { map } from "rxjs";


@Injectable()
export class StatisticsService {

    constructor(
        private readonly transactionService: TransactionService,
        private readonly coinService: CoinService
    ) { }

    public async calculateTotalProfit(portfolio = 1) {
        try {
            const transactions = await this.transactionService.getAllTransactionInPortfolio(portfolio);

            if (transactions.length === 0) {
                return {message: 'Transaction not found!'}
            }
            
            const sortedCoins = await this.coinService.sortCoin(transactions);

            const coin = await this.calculateProfitOneCrypto(sortedCoins['WBT']);

            return coin

        } catch (error) {
            throw error;
        }
    }

    public async calculateProfitOneCrypto(transactions: TransactionEntity[]) {

        const oldestDate = await this.getOldestDate(transactions);
        const todayData = Math.floor(Date.now() / 1000);

        const startDate = new Date(oldestDate * 1000);
        const endDate = new Date(todayData * 1000);
    
        const chart = [];
        let portfolioState = 0;
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {

            const timestamp = Math.floor(date.getTime() / 1000);

            const hasTimestamp = transactions.some(item => new Date(+item.date).getTime() / 1000 === +timestamp);

            if (hasTimestamp) {
                const oneDayTransaction = transactions.filter(item => +item.date === +new Date(timestamp * 1000))
                portfolioState += this.getOneDayTransactionResult(oneDayTransaction)
                chart.push({ portfolioState , date: new Date(timestamp * 1000), coin: transactions[0].coin});
            } else {
                chart.push({ portfolioState , date: new Date(timestamp * 1000), coin: transactions[0].coin});
            }

        }

        const promises = chart.map(async item => {
            const portfolioState = +item.portfolioState;
            const date = +new Date(+item.date);
            const coin = item.coin;

            const historyPricePromise = this.coinService.getHistoryPriceOneDay(date, coin);

            const historyPrice = await +historyPricePromise;

            return portfolioState * historyPrice;
        });

        const result = await Promise.all(promises);

        return result;


    }

    private getOneDayTransactionResult(transactions: TransactionEntity[]) {
        let result = 0;
    
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].operation) {
                result += transactions[i].spent
            }
        }

        return result;
    }
    
    private getOldestDate(transactions: TransactionEntity[]) {

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