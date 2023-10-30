import { Module } from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import { ProductionOrdersController } from './production-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionOrder } from './entities/production-order.entity';
import { ProductionOrderItem } from '../production-order-items/entities/production-order-item.entity';
import { ProductionOrderItemsService } from '../production-order-items/production-order-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionOrder, ProductionOrderItem])],
  controllers: [ProductionOrdersController],
  providers: [ProductionOrdersService, ProductionOrderItemsService],
})
export class ProductionOrdersModule {}
