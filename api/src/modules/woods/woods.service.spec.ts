import { Test, TestingModule } from '@nestjs/testing';
import { WoodsService } from './woods.service';

describe('WoodsService', () => {
  let service: WoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WoodsService],
    }).compile();

    service = module.get<WoodsService>(WoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
