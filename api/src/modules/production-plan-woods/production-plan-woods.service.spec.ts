import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlanWoodsService } from './production-plan-woods.service';

describe('ProductionPlanWoodsService', () => {
  let service: ProductionPlanWoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionPlanWoodsService],
    }).compile();

    service = module.get<ProductionPlanWoodsService>(ProductionPlanWoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
