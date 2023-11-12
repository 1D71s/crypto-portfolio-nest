import { Injectable } from '@nestjs/common';
import { CoinService } from 'src/coin/coin.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import { ChartState, ChartStateForResult } from 'src/chart/types/chart-state';
import { TransactionEntity } from 'src/transaction/endity/transaction-endity';
import { TransactionService } from 'src/transaction/transaction.service';
import { MessageEntity } from 'src/common/global-endity/message.endity';

@Injectable()
export class ChartService {

    constructor(
        private readonly transactionService: TransactionService,
        private readonly coinService: CoinService,
        private readonly statisticsService: StatisticsService
    ) { }

    public async calculateTotalProfitChart(portfolio: number): Promise<ChartStateForResult[] | MessageEntity> {
        try {
            const transactions = await this.transactionService.getAllTransactionInPortfolio(portfolio);

            if (transactions.length === 0) {
                return { message: 'Transaction not found!' };
            }
            
            const sortedCoins = await this.coinService.sortCoin(transactions);

            const uniqueCoins = [...new Set(transactions.map(transaction => transaction.coin))];

            const totalChart = await Promise.all(
                uniqueCoins.map(async (coin) => {
                    const chart = await this.getStateDaysChartOneCrypto(sortedCoins[coin]);
                    return chart;
                })
            );
            const flattenedChart = totalChart.flat();
            
            const sortedByDate = this.sortedByDateAndCalculate(flattenedChart)

            const calculateProfit = await this.calculateItemByDate(sortedByDate)

            return calculateProfit;

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

    private async toShortChart(chart: ChartState[][]): Promise<ChartState[][]> {
        try {
            const count = chart.length > 28 ? 30 : 3

            const finalyChart = []

            for (let i = 0; i < chart.length; i += count) {
                finalyChart.push(chart[i])
            }

            finalyChart[finalyChart.length - 1].map(item => {
                item.date = new Date()
            })

            return finalyChart

        } catch (error) {
            throw error;
        }
    }

    private sortedByDateAndCalculate(flattenedChart: ChartState[]): ChartState[][] {
        const sortedByDate: Record<string, ChartState[]> = {};

        for (let i = 0; i < flattenedChart.length; i++) {
            const currentDate = flattenedChart[i].date.toISOString();

            if (sortedByDate[currentDate] === undefined) {
                sortedByDate[currentDate] = [{ ...flattenedChart[i] }];
            } else {
                sortedByDate[currentDate].push({ ...flattenedChart[i] });
            }
        }

        const toArray = Object.values(sortedByDate);

        return toArray;
    }

    private async calculateItemByDate(chartState: ChartState[][]): Promise<ChartStateForResult[]> {
        try {
            const finalyChart = await this.toShortChart(chartState)

            const chart = await Promise.all(finalyChart.map(async (item) => {
                const result = await Promise.all(item.map(async (item) => {
                    const coinState = +item.coinState;
                    const date = +new Date(+item.date / 1000);
                    const coin = item.coin;
                    const historyPrice = await this.coinService.getHistoryPriceOneDay(date, coin);
    
                    return {...item, coinState: coinState * historyPrice} ;
                }));

                return result
            }));

            const result = this.calculateProfit(chart)

            return result
        } catch (error) {
            throw error;
        }
    }

    private calculateProfit(chartState: ChartState[][]): ChartStateForResult[] {
        const result: ChartStateForResult[] = chartState.map(item => {
            const state = item.reduce((accumulator, current) => accumulator + current.coinState, 0);
            const date = item[0].date;
    
            return { date, coinState: state };
        });
    
        return result;
    }
}