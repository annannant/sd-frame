import { Injectable } from '@nestjs/common';
import { CreateProductionPlanItemDto } from './dto/create-production-plan-item.dto';
import { UpdateProductionPlanItemDto } from './dto/update-production-plan-item.dto';

@Injectable()
export class ProductionPlanItemsService {
  create(createProductionPlanItemDto: CreateProductionPlanItemDto) {
    return 'This action adds a new productionPlanItem';
  }

  findAll() {
    return `This action returns all productionPlanItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionPlanItem`;
  }

  update(id: number, updateProductionPlanItemDto: UpdateProductionPlanItemDto) {
    return `This action updates a #${id} productionPlanItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlanItem`;
  }
}
