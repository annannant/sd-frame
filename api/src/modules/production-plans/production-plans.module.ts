import { Module } from '@nestjs/common';
import { ProductionPlansService } from './production-plans.service';
import { ProductionPlansController } from './production-plans.controller';

@Module({
  controllers: [ProductionPlansController],
  providers: [ProductionPlansService],
})
export class ProductionPlansModule {}
