import { Module } from '@nestjs/common';
import { WoodsService } from './woods.service';
import { WoodsController } from './woods.controller';
import { Wood } from './entities/wood.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WoodStock } from '../wood-stocks/entities/wood-stock.entity';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
import { StandardFrameStock } from '../standard-frame-stocks/entities/standard-frame-stocks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Wood,
      WoodStock,
      WoodStockLocation,
      StandardFrameStock,
    ]),
  ],
  controllers: [WoodsController],
  providers: [WoodsService],
})
export class WoodsModule {}
