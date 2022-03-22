export class CoinsPools {
  'id': string;
  'coin': string;
  'name': string;
  'type': 'coin' | 'pool';
  'algorithm': string;
  'network_hashrate': number;
  'difficulty': number;
  'reward': number;
  'reward_unit': string;
  'reward_block': number;
  'price': number;
  'volume': number;
  'updated': number;
}
