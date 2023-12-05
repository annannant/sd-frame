import { Module } from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import { ProductionOrdersController } from './production-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionOrder } from './entities/production-order.entity';
import { ProductionOrderItem } from '../production-order-items/entities/production-order-item.entity';
import { ProductionOrderItemsService } from '../production-order-items/production-order-items.service';
import { StandardFrame } from '../standard-frames/entities/standard-frame.entity';
import { WoodItemStock } from '../wood-item-stocks/entities/wood-item-stock.entity';
import { StandardFrameStock } from '../standard-frame-stocks/entities/standard-frame-stocks.entity';
import { WoodStock } from '../wood-stocks/entities/wood-stock.entity';
import { ProductionPlan } from '../production-plans/entities/production-plan.entity';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductionOrder,
      ProductionOrderItem,
      StandardFrame,
      WoodItemStock,
      WoodStock,
      StandardFrameStock,
      ProductionPlan,
      WoodStockLocation,
    ]),
  ],
  controllers: [ProductionOrdersController],
  providers: [ProductionOrdersService, ProductionOrderItemsService],
})
export class ProductionOrdersModule {}
