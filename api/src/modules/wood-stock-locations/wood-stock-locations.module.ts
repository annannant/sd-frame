import { Module } from '@nestjs/common';
import { WoodStockLocationsService } from './wood-stock-locations.service';
import { WoodStockLocationsController } from './wood-stock-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WoodStockLocation } from './entities/wood-stock-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WoodStockLocation])],
  controllers: [WoodStockLocationsController],
  providers: [WoodStockLocationsService],
})
export class WoodStockLocationsModule {}
