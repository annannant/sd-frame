import { Injectable } from '@nestjs/common';
import { CreateProductionOrderItemDto } from './dto/create-production-order-item.dto';
import { UpdateProductionOrderItemDto } from './dto/update-production-order-item.dto';

@Injectable()
export class ProductionOrderItemsService {
  create(createProductionOrderItemDto: CreateProductionOrderItemDto) {
    return 'This action adds a new productionOrderItem';
  }

  findAll() {
    return `This action returns all productionOrderItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionOrderItem`;
  }

  update(id: number, updateProductionOrderItemDto: UpdateProductionOrderItemDto) {
    return `This action updates a #${id} productionOrderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionOrderItem`;
  }
}
