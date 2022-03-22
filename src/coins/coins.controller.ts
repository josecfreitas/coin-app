import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  public async listCoins() {
    return this.coinsService.getAllCoinsWithAtLeast1Pool();
  }

  @Get(':coin/pools')
  public async get10BestPools(@Param('coin') coin: string) {
    const bestPools = await this.coinsService.getBestPools(coin);
    if (!bestPools.length) {
      throw new NotFoundException(`Coin ${coin} doesn't have any pool`);
    }
    return bestPools.splice(0, 10);
  }
}
