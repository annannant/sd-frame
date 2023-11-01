import { Test, TestingModule } from '@nestjs/testing';
import { WoodStocksService } from './wood-stocks.service';

describe('WoodStocksService', () => {
  let service: WoodStocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WoodStocksService],
    }).compile();

    service = module.get<WoodStocksService>(WoodStocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
