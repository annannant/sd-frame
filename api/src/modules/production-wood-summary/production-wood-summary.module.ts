import { Module } from '@nestjs/common';
import { ProductionWoodSummaryService } from './production-wood-summary.service';
import { ProductionWoodSummaryController } from './production-wood-summary.controller';

@Module({
  controllers: [ProductionWoodSummaryController],
  providers: [ProductionWoodSummaryService],
})
export class ProductionWoodSummaryModule {}
