import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlanWoodItemsService } from './production-plan-wood-items.service';

describe('ProductionPlanWoodItemsService', () => {
  let service: ProductionPlanWoodItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionPlanWoodItemsService],
    }).compile();

    service = module.get<ProductionPlanWoodItemsService>(ProductionPlanWoodItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
