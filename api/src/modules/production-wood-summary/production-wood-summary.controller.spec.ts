import { Test, TestingModule } from '@nestjs/testing';
import { ProductionWoodSummaryController } from './production-wood-summary.controller';
import { ProductionWoodSummaryService } from './production-wood-summary.service';

describe('ProductionWoodSummaryController', () => {
  let controller: ProductionWoodSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionWoodSummaryController],
      providers: [ProductionWoodSummaryService],
    }).compile();

    controller = module.get<ProductionWoodSummaryController>(ProductionWoodSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
