import { Test, TestingModule } from '@nestjs/testing';
import { WoodStockLocationsService } from './wood-stock-locations.service';

describe('WoodStockLocationsService', () => {
  let service: WoodStockLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WoodStockLocationsService],
    }).compile();

    service = module.get<WoodStockLocationsService>(WoodStockLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
