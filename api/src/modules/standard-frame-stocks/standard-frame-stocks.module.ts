import { Module } from '@nestjs/common';
import { StandardFrameStocksService } from './standard-frame-stocks.service';
import { StandardFrameStocksController } from './standard-frame-stocks.controller';
import { StandardFrame } from '../standard-frames/entities/standard-frame.entity';
import { StandardFrameStock } from './entities/standard-frame-stocks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StandardFrame, StandardFrameStock])],
  controllers: [StandardFrameStocksController],
  providers: [StandardFrameStocksService],
})
export class StandardFrameStocksModule {}
