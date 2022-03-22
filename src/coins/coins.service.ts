import { Injectable } from '@nestjs/common';
import { CoinsPoolsRepository } from './coins-pools.repository';

@Injectable()
export class CoinsService {
  constructor(private readonly coinsPoolsRepository: CoinsPoolsRepository) {}

  getAllCoins(): string {
    return this.coinsPoolsRepository.getAllCoinsAndPoolsFromAPI();
  }

  getBestPools(coin: string): string {
    return this.coinsPoolsRepository.getAllCoinsAndPoolsFromAPI() + coin;
  }
}
