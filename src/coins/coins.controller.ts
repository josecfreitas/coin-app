import { Controller, Get, Param } from '@nestjs/common';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  public async listCoins() {
    return this.coinsService.getAllCoinsWithAtLeast1Pool();
  }

  @Get(':coin/pools')
  public async bestPools(@Param('coin') coin: string) {
    return this.coinsService.getBestPools(coin);
  }
}
