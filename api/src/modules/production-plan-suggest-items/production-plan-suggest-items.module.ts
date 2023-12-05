import { Module } from '@nestjs/common';
import { ProductionPlanSuggestItemsService } from './production-plan-suggest-items.service';
import { ProductionPlanSuggestItemsController } from './production-plan-suggest-items.controller';

@Module({
  controllers: [ProductionPlanSuggestItemsController],
  providers: [ProductionPlanSuggestItemsService],
})
export class ProductionPlanSuggestItemsModule {}
