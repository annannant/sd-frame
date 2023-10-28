import { Test, TestingModule } from '@nestjs/testing';
import { WoodTypesService } from './wood-types.service';

describe('WoodTypesService', () => {
  let service: WoodTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WoodTypesService],
    }).compile();

    service = module.get<WoodTypesService>(WoodTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
