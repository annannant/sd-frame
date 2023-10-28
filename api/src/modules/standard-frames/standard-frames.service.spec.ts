import { Test, TestingModule } from '@nestjs/testing';
import { StandardFramesService } from './standard-frames.service';

describe('StandardFramesService', () => {
  let service: StandardFramesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardFramesService],
    }).compile();

    service = module.get<StandardFramesService>(StandardFramesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
