import { Module } from '@nestjs/common';
import { ProductionPlanItemsService } from './production-plan-items.service';
import { ProductionPlanItemsController } from './production-plan-items.controller';

@Module({
  controllers: [ProductionPlanItemsController],
  providers: [ProductionPlanItemsService],
})
export class ProductionPlanItemsModule {}
