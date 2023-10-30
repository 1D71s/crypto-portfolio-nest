import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import axios from 'axios';
import { TransactionService } from 'src/transaction/transaction.service';


@Injectable()
export class StatisticsService {

    constructor(private readonly transactionService: TransactionService) {}

    public async calculateTotalProfit() {
        
    }

    public async calculateProfitOneCrypto() {
        
    }

    public async calculateProfitOneTransaction() {
        
    }

    async getHistoryPriceOfDay() {
        try {
            const url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=600';
            const apiKey = process.env.API_KEY;

            const response = await axios.get(url, {
                headers: {
                'authorization': `Apikey ${apiKey}`,
                },
            });

            const data = response.data;

            const priceDataWithDates = data.Data.Data.map(item => ({
                time: new Date(item.time * 1000),
                open: item.open,
            }));

            return priceDataWithDates;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}