import { Module } from '@nestjs/common';
import { StandardFramesService } from './standard-frames.service';
import { StandardFramesController } from './standard-frames.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandardFrame } from './entities/standard-frame.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StandardFrame])],
  controllers: [StandardFramesController],
  providers: [StandardFramesService],
})
export class StandardFramesModule {}
