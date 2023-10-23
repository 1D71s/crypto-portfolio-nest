import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [UserModule, AuthModule, PortfolioModule],
  controllers: [],
  providers: [],
})
export class AppModule { }