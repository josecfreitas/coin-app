import { Injectable } from '@nestjs/common';
import { CoinsPoolsRepository } from './coins-pools.repository';
import { CoinsPools } from './CoinsPools';

@Injectable()
export class CoinsService {
  constructor(private readonly coinsPoolsRepository: CoinsPoolsRepository) {}

  async getAllCoinsWithAtLeast1Pool(): Promise<string[]> {
    const coinsPools =
      await this.coinsPoolsRepository.getAllCoinsAndPoolsFromAPI();

    const coinsWithAtLeast1Pool = coinsPools
      .filter((coinPool) => coinPool.type === 'pool')
      .map((pool) => pool.reward_unit);

    return Array.from(new Set<string>(coinsWithAtLeast1Pool)).sort();
  }

  async getBestPools(coin: string): Promise<CoinsPools[]> {
    const coinsPools =
      await this.coinsPoolsRepository.getAllCoinsAndPoolsFromAPI();
    return coinsPools
      .filter(
        (coinPool) => coinPool.type === 'pool' && coinPool.reward_unit === coin,
      )
      .sort((a, b) => b.reward - a.reward);
  }
}
