import { Module } from '@nestjs/common';
import { StandardFramesService } from './standard-frames.service';
import { StandardFramesController } from './standard-frames.controller';

@Module({
  controllers: [StandardFramesController],
  providers: [StandardFramesService],
})
export class StandardFramesModule {}
