import { Module } from '@nestjs/common';
import { ProductionPlanWoodItemsService } from './production-plan-wood-items.service';
import { ProductionPlanWoodItemsController } from './production-plan-wood-items.controller';

@Module({
  controllers: [ProductionPlanWoodItemsController],
  providers: [ProductionPlanWoodItemsService],
})
export class ProductionPlanWoodItemsModule {}
