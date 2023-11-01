import { Module } from '@nestjs/common';
import { StandardFrameStocksService } from './standard_frame_stocks.service';
import { StandardFrameStocksController } from './standard_frame_stocks.controller';

@Module({
  controllers: [StandardFrameStocksController],
  providers: [StandardFrameStocksService],
})
export class StandardFrameStocksModule {}
