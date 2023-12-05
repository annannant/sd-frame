import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlanWoodItemsController } from './production-plan-wood-items.controller';
import { ProductionPlanWoodItemsService } from './production-plan-wood-items.service';

describe('ProductionPlanWoodItemsController', () => {
  let controller: ProductionPlanWoodItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionPlanWoodItemsController],
      providers: [ProductionPlanWoodItemsService],
    }).compile();

    controller = module.get<ProductionPlanWoodItemsController>(ProductionPlanWoodItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
