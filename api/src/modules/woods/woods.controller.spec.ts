import { Test, TestingModule } from '@nestjs/testing';
import { WoodsController } from './woods.controller';
import { WoodsService } from './woods.service';

describe('WoodsController', () => {
  let controller: WoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WoodsController],
      providers: [WoodsService],
    }).compile();

    controller = module.get<WoodsController>(WoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
