import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlanItemsService } from './production-plan-items.service';

describe('ProductionPlanItemsService', () => {
  let service: ProductionPlanItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionPlanItemsService],
    }).compile();

    service = module.get<ProductionPlanItemsService>(ProductionPlanItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
