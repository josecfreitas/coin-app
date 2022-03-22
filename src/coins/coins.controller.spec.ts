import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CoinsPoolsRepository } from './coins-pools.repository';
import { CoinsController } from './coins.controller';
import { CoinsService } from './coins.service';
import { CoinsPools } from './CoinsPools';

describe('CoinsController', () => {
  let controller: CoinsController;
  let service: CoinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinsController],
      providers: [CoinsService, CoinsPoolsRepository],
      imports: [ConfigModule],
    }).compile();

    controller = module.get<CoinsController>(CoinsController);
    service = module.get<CoinsService>(CoinsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listCoins', () => {
    it('should return a list of coins names', async () => {
      jest
        .spyOn(service, 'getAllCoinsWithAtLeast1Pool')
        .mockImplementation(() => Promise.resolve(['a', 'b', 'c']));

      expect(await controller.listCoins()).toHaveLength(3);
    });
  });

  describe('get10BestPools', () => {
    it('should return a list of pools for a given coin', async () => {
      jest
        .spyOn(service, 'getBestPools')
        .mockImplementation(() =>
          Promise.resolve([{} as CoinsPools, {} as CoinsPools]),
        );

      expect(await controller.get10BestPools('BTC')).toHaveLength(2);
    });

    it('should return max of 10 results', async () => {
      jest
        .spyOn(service, 'getBestPools')
        .mockImplementation(() => Promise.resolve(mockCoinsPools(5)));

      expect(await controller.get10BestPools('BTC')).toHaveLength(5);

      jest
        .spyOn(service, 'getBestPools')
        .mockImplementation(() => Promise.resolve(mockCoinsPools(100)));

      expect(await controller.get10BestPools('BTC')).toHaveLength(10);
    });
  });
});

const mockCoinsPools = (quantity: number): CoinsPools[] => {
  const coinsPools: CoinsPools[] = [];

  for (let i = 0; i < quantity; i++) {
    coinsPools.push({} as CoinsPools);
  }

  return coinsPools;
};
