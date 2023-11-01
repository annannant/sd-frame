import { Test, TestingModule } from '@nestjs/testing';
import { WoodItemStocksController } from './wood-item-stocks.controller';
import { WoodItemStocksService } from './wood-item-stocks.service';

describe('WoodItemStocksController', () => {
  let controller: WoodItemStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WoodItemStocksController],
      providers: [WoodItemStocksService],
    }).compile();

    controller = module.get<WoodItemStocksController>(WoodItemStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
