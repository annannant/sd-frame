import { Module } from '@nestjs/common';
import { ProductionPlansService } from './production-plans.service';
import { ProductionPlansController } from './production-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionPlan } from '../production-plans/entities/production-plan.entity';
import { ProductionPlanSuggestItem } from '../production-plan-suggest-items/entities/production-plan-suggest-item.entity';
import { ProductionPlanWood } from '../production-plan-woods/entities/production-plan-wood.entity';
import { ProductionPlanWoodItem } from '../production-plan-wood-items/entities/production-plan-wood-item.entity';
import { ProductionWoodSummary } from '../production-wood-summary/entities/production-wood-summary.entity';
import { ProductionOrder } from '../production-orders/entities/production-order.entity';
import { ProductionOrderItem } from '../production-order-items/entities/production-order-item.entity';
import { StandardFrame } from '../standard-frames/entities/standard-frame.entity';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
import { StandardFrameStock } from '../standard-frame-stocks/entities/standard-frame-stocks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductionOrder,
      ProductionOrderItem,
      ProductionPlan,
      ProductionPlanSuggestItem,
      ProductionPlanWood,
      ProductionPlanWoodItem,
      ProductionWoodSummary,
      StandardFrame,
      WoodStockLocation,
      StandardFrameStock,
    ]),
  ],
  controllers: [ProductionPlansController],
  providers: [ProductionPlansService],
})
export class ProductionPlansModule {}
