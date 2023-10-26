import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
    
export class PriceService {

    async getHistoryPrice() {
        try {
        const url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=600';
        const apiKey = 'c504a37a5d993c5d9a1e32118acc71a7d211c5eaa5ba678a6837e3875998ef7a';

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
            throw error; // Вы можете обработать ошибку в более структурированном виде в вашем приложении
        }
    }
}