import { Injectable } from '@nestjs/common';
import { CoinService } from 'src/coin/coin.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import { ChartState } from 'src/chart/types/chart-state';
import { TransactionEntity } from 'src/transaction/endity/transaction-endity';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class ChartService {

    constructor(
        private readonly transactionService: TransactionService,
        private readonly coinService: CoinService,
        private readonly statisticsService: StatisticsService
    ) {}

    public async calculateTotalProfitChart(portfolio = 1) {
        try {
            const transactions = await this.transactionService.getAllTransactionInPortfolio(portfolio);

            if (transactions.length === 0) {
                return { message: 'Transaction not found!' };
            }
            
            const sortedCoins = await this.coinService.sortCoin(transactions);

            const uniqueCoins = [...new Set(transactions.map(transaction => transaction.coin))];

            const totalChart = []

            for (let i = 0; i < uniqueCoins.length; i++) {
                const coin = await this.getStateDaysChartOneCrypto(sortedCoins[`${uniqueCoins[i]}`]);
                totalChart.push(...coin)
            }

            return totalChart;
            
        } catch (error) {
            throw error;
        }
    }

    public async calculateOneCryptoProfitChart(portfolio: number, coin: string): Promise<ChartState[]> {
        try {
            const transactions = await this.transactionService.getTransactionsByCoinPortfolio(portfolio, coin)

            const chart = await this.getStateDaysChartOneCrypto(transactions);

            const result = await this.getStateChartOneCrypto(chart)

            return result
        } catch (error) {
            throw error;
        }
    }

    private async getStateDaysChartOneCrypto(transactions: TransactionEntity[]): Promise<ChartState[]> {
        const oldestDate = this.statisticsService.getOldestDate(transactions);
        const todayData = Math.floor(Date.now() / 1000);

        const startDate = new Date(oldestDate * 1000);
        const endDate = new Date(todayData * 1000);
    
        const chart = [];
        let coinState = 0;

        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {

            const timestamp = Math.floor(date.getTime() / 1000);

            const hasTimestamp = transactions.some(item => new Date(+item.date).getTime() / 1000 === +timestamp);

            if (hasTimestamp) {
                const oneDayTransaction = transactions.filter(item => +item.date === +new Date(timestamp * 1000));
                coinState += this.statisticsService.getOneDayTransactionSum(oneDayTransaction);
                chart.push({ coinState , date: new Date(timestamp * 1000), coin: transactions[0].coin});
            } else {
                chart.push({ coinState, date: new Date(timestamp * 1000), coin: transactions[0].coin});
            }
        }

        return chart;
    }

    private async getStateChartOneCrypto(chart: ChartState[]): Promise<ChartState[]> {
        try {
            const count = chart.length > 28 ? 10 : 1

            const finalyChart = []

            for (let i = 0; i < chart.length; i += count) {
                finalyChart.push(chart[i])
            }

            finalyChart[finalyChart.length - 1].date = new Date()

            const result = await this.getProfitChartOneCrypto(finalyChart)

            return result

        } catch (error) {
            throw error;
        }
    }

    private async getProfitChartOneCrypto(chartStateDays: ChartState[]): Promise<ChartState[]> {
        const chart = await Promise.all(chartStateDays.map(async (item) => {
            const coinState = +item.coinState;
            const date = +new Date(+item.date / 1000);
            const coin = item.coin;
            const historyPrice = await this.coinService.getHistoryPriceOneDay(date, coin);

            return {...item, coinState: coinState * historyPrice} ;
        }));

        return chart;
    }
}