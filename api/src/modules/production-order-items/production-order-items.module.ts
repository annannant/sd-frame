import { Module } from '@nestjs/common';
import { ProductionOrderItemsService } from './production-order-items.service';
import { ProductionOrderItemsController } from './production-order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionOrderItem } from './entities/production-order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionOrderItem])],
  controllers: [ProductionOrderItemsController],
  providers: [ProductionOrderItemsService],
})
export class ProductionOrderItemsModule {}
