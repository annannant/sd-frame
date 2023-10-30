import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrderItemsController } from './production-order-items.controller';
import { ProductionOrderItemsService } from './production-order-items.service';

describe('ProductionOrderItemsController', () => {
  let controller: ProductionOrderItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionOrderItemsController],
      providers: [ProductionOrderItemsService],
    }).compile();

    controller = module.get<ProductionOrderItemsController>(ProductionOrderItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
