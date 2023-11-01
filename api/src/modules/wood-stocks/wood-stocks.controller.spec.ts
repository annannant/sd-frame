import { Test, TestingModule } from '@nestjs/testing';
import { WoodStocksController } from './wood-stocks.controller';
import { WoodStocksService } from './wood-stocks.service';

describe('WoodStocksController', () => {
  let controller: WoodStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WoodStocksController],
      providers: [WoodStocksService],
    }).compile();

    controller = module.get<WoodStocksController>(WoodStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
