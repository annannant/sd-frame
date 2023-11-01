import { Test, TestingModule } from '@nestjs/testing';
import { StandardFrameStocksService } from './standard_frame_stocks.service';

describe('StandardFrameStocksService', () => {
  let service: StandardFrameStocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardFrameStocksService],
    }).compile();

    service = module.get<StandardFrameStocksService>(StandardFrameStocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
