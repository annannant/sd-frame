import { Module } from '@nestjs/common';
import { WoodStockLocationsService } from './wood-stock-locations.service';
import { WoodStockLocationsController } from './wood-stock-locations.controller';

@Module({
  controllers: [WoodStockLocationsController],
  providers: [WoodStockLocationsService],
})
export class WoodStockLocationsModule {}
