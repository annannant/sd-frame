import { Test, TestingModule } from '@nestjs/testing';
import { ProductionPlanSuggestItemsController } from './production-plan-suggest-items.controller';
import { ProductionPlanSuggestItemsService } from './production-plan-suggest-items.service';

describe('ProductionPlanSuggestItemsController', () => {
  let controller: ProductionPlanSuggestItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionPlanSuggestItemsController],
      providers: [ProductionPlanSuggestItemsService],
    }).compile();

    controller = module.get<ProductionPlanSuggestItemsController>(ProductionPlanSuggestItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
