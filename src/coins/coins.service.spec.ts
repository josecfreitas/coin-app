import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CoinsPoolsRepository } from './coins-pools.repository';
import { CoinsService } from './coins.service';
import { CoinsPools } from './CoinsPools';

describe('CoinsService', () => {
  let service: CoinsService;
  let repository: CoinsPoolsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinsService, CoinsPoolsRepository],
      imports: [ConfigModule],
    }).compile();

    service = module.get<CoinsService>(CoinsService);
    repository = module.get<CoinsPoolsRepository>(CoinsPoolsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCoinsWithAtLeast1Pool', () => {
    it('should return a list of coins names', async () => {
      jest
        .spyOn(repository, 'getAllCoinsAndPoolsFromAPI')
        .mockImplementation(() => Promise.resolve(coinsPoolsMock));

      const allCoinsWithAtLeast1Pool =
        await service.getAllCoinsWithAtLeast1Pool();

      expect(allCoinsWithAtLeast1Pool).toHaveLength(2);
      expect(allCoinsWithAtLeast1Pool[0]).toBe('AE');
      expect(allCoinsWithAtLeast1Pool[1]).toBe('BTC');
    });
  });

  describe('getBestPools', () => {
    it('should return a list of the best pools', async () => {
      jest
        .spyOn(repository, 'getAllCoinsAndPoolsFromAPI')
        .mockImplementation(() => Promise.resolve(coinsPoolsMock));

      const bestPoolsForBTC = await service.getBestPools('BTC');

      expect(bestPoolsForBTC).toHaveLength(3);
      expect(bestPoolsForBTC[0].coin).toBe('NH cuckAToo31');
      expect(bestPoolsForBTC[1].coin).toBe('NH CuckooCycle');
      expect(bestPoolsForBTC[2].coin).toBe('NH cuckAToo32');

      const bestPoolsForAE = await service.getBestPools('AE');

      expect(bestPoolsForAE).toHaveLength(1);
      expect(bestPoolsForAE[0].coin).toBe('2MINERS AE');
    });
  });
});

const coinsPoolsMock: CoinsPools[] = [
  {
    coin: 'CLO',
    type: 'coin',
    reward: 1,
    reward_unit: 'CLO',
  } as CoinsPools,
  {
    coin: 'NH cuckAToo32',
    type: 'pool',
    reward: 1,
    reward_unit: 'BTC',
  } as CoinsPools,
  {
    coin: 'NH cuckAToo31',
    type: 'pool',
    reward: 10,
    reward_unit: 'BTC',
  } as CoinsPools,
  {
    coin: 'NH CuckooCycle',
    type: 'pool',
    reward: 5,
    reward_unit: 'BTC',
  } as CoinsPools,
  {
    coin: '2MINERS AE',
    type: 'pool',
    reward: 3,
    reward_unit: 'AE',
  } as CoinsPools,
];
