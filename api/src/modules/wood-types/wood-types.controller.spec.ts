import { Test, TestingModule } from '@nestjs/testing';
import { WoodTypesController } from './wood-types.controller';
import { WoodTypesService } from './wood-types.service';

describe('WoodTypesController', () => {
  let controller: WoodTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WoodTypesController],
      providers: [WoodTypesService],
    }).compile();

    controller = module.get<WoodTypesController>(WoodTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
