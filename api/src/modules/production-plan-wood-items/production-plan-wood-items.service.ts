import { Injectable } from '@nestjs/common';
import { CreateProductionPlanWoodItemDto } from './dto/create-production-plan-wood-item.dto';
import { UpdateProductionPlanWoodItemDto } from './dto/update-production-plan-wood-item.dto';

@Injectable()
export class ProductionPlanWoodItemsService {
  create(createProductionPlanWoodItemDto: CreateProductionPlanWoodItemDto) {
    return 'This action adds a new productionPlanWoodItem';
  }

  findAll() {
    return `This action returns all productionPlanWoodItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionPlanWoodItem`;
  }

  update(id: number, updateProductionPlanWoodItemDto: UpdateProductionPlanWoodItemDto) {
    return `This action updates a #${id} productionPlanWoodItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlanWoodItem`;
  }
}
