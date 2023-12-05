import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlanSuggestItemsService } from './production-plan-suggest-items.service';

describe('ProductionPlanSuggestItemsService', () => {
  let service: ProductionPlanSuggestItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionPlanSuggestItemsService],
    }).compile();

    service = module.get<ProductionPlanSuggestItemsService>(ProductionPlanSuggestItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
