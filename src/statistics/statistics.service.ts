import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import axios from 'axios';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionEntity } from 'src/transaction/endity/transaction-endity';

@Injectable()
export class StatisticsService {

    constructor(private readonly transactionService: TransactionService) {}

    public async calculateTotalProfit(portfolio = 1) {
        try {
            const transactions = await this.transactionService.getAllTransactionInPortfolio(portfolio);

            const sortedCoins = await this.sortCoin(transactions);

            const coin = await this.calculateProfitOneCrypto(sortedCoins['BTC']);

            return coin

        } catch (error) {
            throw error;
        }
    }


    private async calculateProfitOneCrypto(transactions: TransactionEntity[]) {

        const oldestDate = await this.getOldestDate(transactions)

        return this.getHistoryPriceOfDay(oldestDate, transactions[0].coin);
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

    private async sortCoin(transactions) {

        const sortedCrypto = {};

        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            const crypto = transaction.coin;

            if (!sortedCrypto[crypto]) {
                sortedCrypto[crypto] = [];
            }

            sortedCrypto[crypto].push(transaction);
        }

        return sortedCrypto;
    }

    private async getHistoryPriceOfDay(date: number, coin: string) {
        try {
            const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coin}&tsyms=USD&ts=${date}`;
            const apiKey = process.env.API_KEY;

            const response = await axios.get(url, {
                headers: {
                    authorization: `Apikey ${apiKey}`,
                },
            });

            const data = response.data[coin].USD;

            return {price: data};
            
        } catch (error) {
            throw error;
        }
    }
}