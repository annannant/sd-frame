import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrderItemsService } from './production-order-items.service';

describe('ProductionOrderItemsService', () => {
  let service: ProductionOrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionOrderItemsService],
    }).compile();

    service = module.get<ProductionOrderItemsService>(ProductionOrderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
