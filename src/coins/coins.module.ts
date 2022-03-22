import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { CoinsPoolsRepository } from './coins-pools.repository';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService, CoinsPoolsRepository],
})
export class CoinsModule {}
