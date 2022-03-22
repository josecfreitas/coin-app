import { Injectable } from '@nestjs/common';

@Injectable()
export class CoinsPoolsRepository {
  public getAllCoinsAndPoolsFromAPI(): string {
    return 'coins-and-pools';
  }
}
