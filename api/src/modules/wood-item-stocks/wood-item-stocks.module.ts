import { Module } from '@nestjs/common';
import { WoodItemStocksService } from './wood-item-stocks.service';
import { WoodItemStocksController } from './wood-item-stocks.controller';

@Module({
  controllers: [WoodItemStocksController],
  providers: [WoodItemStocksService],
})
export class WoodItemStocksModule {}
