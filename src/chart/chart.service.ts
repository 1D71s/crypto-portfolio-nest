import { Injectable } from '@nestjs/common';
import { CoinService } from 'src/coin/coin.service';
import { PrismaService } from 'src/common/prisma/prisma';
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

            const coin = await this.getStateDaysChartOneCrypto(sortedCoins['WBT']);

            return coin;
            
        } catch (error) {
            throw error;
        }
    }

    public async getStateDaysChartOneCrypto(transactions: TransactionEntity[]): Promise<ChartState[]> {
        const oldestDate = this.statisticsService.getOldestDate(transactions);
        const todayData = Math.floor(Date.now() / 1000);

        const startDate = new Date(oldestDate * 1000);
        const endDate = new Date(todayData * 1000);
    
        const chart = [];
        let portfolioState = 0;

        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {

            const timestamp = Math.floor(date.getTime() / 1000);

            const hasTimestamp = transactions.some(item => new Date(+item.date).getTime() / 1000 === +timestamp);

            if (hasTimestamp) {
                const oneDayTransaction = transactions.filter(item => +item.date === +new Date(timestamp * 1000));
                portfolioState += this.statisticsService.getOneDayTransactionSum(oneDayTransaction);
                chart.push({ portfolioState , date: new Date(timestamp * 1000), coin: transactions[0].coin});
            } else {
                chart.push({ portfolioState, date: new Date(timestamp * 1000), coin: transactions[0].coin});
            }
        }

        return chart;
    }

    private async getProfitChartDaysOneCrypto(chartStateDays: ChartState[]) {
        const chart = await Promise.all(chartStateDays.map(async (item) => {
            const portfolioState = +item.portfolioState;
            const date = +new Date(+item.date / 1000);
            const coin = item.coin;
            //const historyPrice = await this.coinService.getHistoryPriceOneDay(date, coin);

            return portfolioState ;
        }));

        return chart;
    }
}
