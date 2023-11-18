import { Module } from '@nestjs/common';
import { StandardFrameStocksService } from './standard-frame-stocks.service';
import { StandardFrameStocksController } from './standard-frame-stocks.controller';

@Module({
  controllers: [StandardFrameStocksController],
  providers: [StandardFrameStocksService],
})
export class StandardFrameStocksModule {}
