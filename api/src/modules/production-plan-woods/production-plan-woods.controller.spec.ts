import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlanWoodsController } from './production-plan-woods.controller';
import { ProductionPlanWoodsService } from './production-plan-woods.service';

describe('ProductionPlanWoodsController', () => {
  let controller: ProductionPlanWoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionPlanWoodsController],
      providers: [ProductionPlanWoodsService],
    }).compile();

    controller = module.get<ProductionPlanWoodsController>(ProductionPlanWoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
