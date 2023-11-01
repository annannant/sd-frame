import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlanItemsController } from './production-plan-items.controller';
import { ProductionPlanItemsService } from './production-plan-items.service';

describe('ProductionPlanItemsController', () => {
  let controller: ProductionPlanItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionPlanItemsController],
      providers: [ProductionPlanItemsService],
    }).compile();

    controller = module.get<ProductionPlanItemsController>(ProductionPlanItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
