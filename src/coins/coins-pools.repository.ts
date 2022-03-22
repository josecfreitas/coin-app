import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CoinsPools } from './CoinsPools';

@Injectable()
export class CoinsPoolsRepository {
  constructor(private configService: ConfigService) {}

  public async getAllCoinsAndPoolsFromAPI(): Promise<CoinsPools[]> {
    return (
      await axios.get<CoinsPools[]>(
        this.configService.get<string>('MINERSTAT_URL'),
      )
    ).data;
  }
}
