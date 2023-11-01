import { Test, TestingModule } from '@nestjs/testing';
import { WoodItemStocksService } from './wood-item-stocks.service';

describe('WoodItemStocksService', () => {
  let service: WoodItemStocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WoodItemStocksService],
    }).compile();

    service = module.get<WoodItemStocksService>(WoodItemStocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
