import { Module } from '@nestjs/common';
import { WoodStocksService } from './wood-stocks.service';
import { WoodStocksController } from './wood-stocks.controller';

@Module({
  controllers: [WoodStocksController],
  providers: [WoodStocksService],
})
export class WoodStocksModule {}
