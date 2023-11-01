import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionEntity } from 'src/transaction/endity/transaction-endity';
import { CoinService } from 'src/coin/coin.service';


@Injectable()
export class StatisticsService {

    constructor(
        private readonly transactionService: TransactionService,
        private readonly coinService: CoinService
    ) { }

    public async calculateTotalProfit(portfolio = 1) {
        try {
            const transactions = await this.transactionService.getAllTransactionInPortfolio(portfolio);
            
            const sortedCoins = await this.coinService.sortCoin(transactions);

            const coin = await this.calculateProfitOneCrypto(sortedCoins['BTC']);

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
                const oneDayTransaction = transactions.filter(item => item.date !== new Date(timestamp * 1000))
                chart.push(this.getOneDayTransactionResult(oneDayTransaction));
            }

            portfolioState++
        }
    
        console.log(chart);
        console.log(transactions)
        console.log(portfolioState)
        
        return this.coinService.getHistoryPriceOneDay(oldestDate, transactions[0].coin);
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
    
    private async getOldestDate(transactions: TransactionEntity[]) {
        
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