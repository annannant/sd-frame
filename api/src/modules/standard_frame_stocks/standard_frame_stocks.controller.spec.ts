import { Test, TestingModule } from '@nestjs/testing';
import { StandardFrameStocksController } from './standard_frame_stocks.controller';
import { StandardFrameStocksService } from './standard_frame_stocks.service';

describe('StandardFrameStocksController', () => {
  let controller: StandardFrameStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandardFrameStocksController],
      providers: [StandardFrameStocksService],
    }).compile();

    controller = module.get<StandardFrameStocksController>(StandardFrameStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
