import { Test, TestingModule } from '@nestjs/testing';
import { StandardFramesController } from './standard-frames.controller';
import { StandardFramesService } from './standard-frames.service';

describe('StandardFramesController', () => {
  let controller: StandardFramesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandardFramesController],
      providers: [StandardFramesService],
    }).compile();

    controller = module.get<StandardFramesController>(StandardFramesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
