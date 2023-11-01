import { Test, TestingModule } from '@nestjs/testing';
import { WoodStockLocationsController } from './wood-stock-locations.controller';
import { WoodStockLocationsService } from './wood-stock-locations.service';

describe('WoodStockLocationsController', () => {
  let controller: WoodStockLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WoodStockLocationsController],
      providers: [WoodStockLocationsService],
    }).compile();

    controller = module.get<WoodStockLocationsController>(WoodStockLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
