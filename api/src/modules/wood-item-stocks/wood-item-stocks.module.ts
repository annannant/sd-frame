import { Module } from '@nestjs/common';
import { WoodItemStocksService } from './wood-item-stocks.service';
import { WoodItemStocksController } from './wood-item-stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WoodItemStock } from './entities/wood-item-stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WoodItemStock])],
  controllers: [WoodItemStocksController],
  providers: [WoodItemStocksService],
})
export class WoodItemStocksModule {}
