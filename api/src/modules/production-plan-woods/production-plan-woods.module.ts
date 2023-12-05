import { Module } from '@nestjs/common';
import { ProductionPlanWoodsService } from './production-plan-woods.service';
import { ProductionPlanWoodsController } from './production-plan-woods.controller';

@Module({
  controllers: [ProductionPlanWoodsController],
  providers: [ProductionPlanWoodsService],
})
export class ProductionPlanWoodsModule {}
