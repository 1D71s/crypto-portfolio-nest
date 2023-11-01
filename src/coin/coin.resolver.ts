import { Resolver } from '@nestjs/graphql';
import { CoinService } from './coin.service';

@Resolver('Coin')
export class CoinResolver {
  constructor(private readonly coinService: CoinService) {}
}
