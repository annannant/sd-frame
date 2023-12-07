import { Module } from '@nestjs/common';
import { ProductionPlanWoodItemsService } from './production-plan-wood-items.service';
import { ProductionPlanWoodItemsController } from './production-plan-wood-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionPlanWoodItem } from './entities/production-plan-wood-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionPlanWoodItem])],
  controllers: [ProductionPlanWoodItemsController],
  providers: [ProductionPlanWoodItemsService],
})
export class ProductionPlanWoodItemsModule {}
