import { Test, TestingModule } from '@nestjs/testing';
import { ProductionWoodSummaryService } from './production-wood-summary.service';

describe('ProductionWoodSummaryService', () => {
  let service: ProductionWoodSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionWoodSummaryService],
    }).compile();

    service = module.get<ProductionWoodSummaryService>(ProductionWoodSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
