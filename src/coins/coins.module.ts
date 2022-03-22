import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { CoinsPoolsRepository } from './coins-pools.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService, CoinsPoolsRepository],
  imports: [ConfigModule],
})
export class CoinsModule {}
