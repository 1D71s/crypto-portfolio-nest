import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'src/transaction/endity/transaction-endity';
import axios from 'axios';


@Injectable()
export class CoinService {

    public sortCoin(transactions: TransactionEntity[]): TransactionEntity[][] {

        const sortedCrypto: { [crypto: string]: TransactionEntity[] } = {};
    
        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            const crypto = transaction.coin;
    
            if (!sortedCrypto[crypto]) {
                sortedCrypto[crypto] = [];
            }
    
            sortedCrypto[crypto].push(transaction);
        }
    
        const result = Object.values(sortedCrypto);
    
        return result;
    }
    

    public async getHistoryPriceOneDay(date: number, coin: string): Promise<number> {
        try {
            const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coin}&tsyms=USD&ts=${date}`;
            const apiKey = process.env.API_KEY;

            const response = await axios.get(url, {
                headers: {
                    authorization: `Apikey ${apiKey}`,
                },
            });

            const data = response.data[`${coin}`].USD;

            return data;
            
        } catch (error) {
            throw error;
        }
    }
}
