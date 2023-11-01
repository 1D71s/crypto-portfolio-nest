import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TransactionModule } from './transaction/transaction.module';
import { CoinModule } from './coin/coin.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        PortfolioModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req, res }) => ({ req, res })
        }),
        StatisticsModule,
        TransactionModule,
        CoinModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
