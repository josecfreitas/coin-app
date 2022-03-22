import { Controller, Get, Param } from '@nestjs/common';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  public listCoins() {
    return this.coinsService.getAllCoins();
  }

  @Get(':coin/pools')
  public bestPools(@Param('coin') coin: string) {
    return this.coinsService.getBestPools(coin);
  }
}
