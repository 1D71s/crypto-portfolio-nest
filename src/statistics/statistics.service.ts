import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import axios from 'axios';


@Injectable()
export class StatisticsService {

    public async calculateTotalProfit() {
        // - Вход: цена покупки, текущая цена
        // - Действие: Рассчитывает прибыль, сравнив начальную цену покупки с текущей ценой криптовалюты.
        // - Возвращаемое значение: Прибыль.
    }

    public async calculateProfitOneCrypto() {
        // - Вход: цена покупки, текущая цена
        // - Действие: Рассчитывает прибыль, сравнив начальную цену покупки с текущей ценой криптовалюты.
        // - Возвращаемое значение: Прибыль.
    }

    async getHistoryPrice() {
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
