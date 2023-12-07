import { Module } from '@nestjs/common';
import { WoodStocksService } from './wood-stocks.service';
import { WoodStocksController } from './wood-stocks.controller';
import { WoodStock } from './entities/wood-stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wood } from '../woods/entities/wood.entity';
import { Location } from '../locations/entities/location.entity';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
import { WoodItemStock } from '../wood-item-stocks/entities/wood-item-stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WoodStock,
      Wood,
      Location,
      WoodStockLocation,
      WoodItemStock,
    ]),
  ],
  controllers: [WoodStocksController],
  providers: [WoodStocksService],
})
export class WoodStocksModule {}
