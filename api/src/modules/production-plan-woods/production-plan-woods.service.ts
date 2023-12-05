import { Injectable } from '@nestjs/common';
import { CreateProductionPlanWoodDto } from './dto/create-production-plan-wood.dto';
import { UpdateProductionPlanWoodDto } from './dto/update-production-plan-wood.dto';

@Injectable()
export class ProductionPlanWoodsService {
  create(createProductionPlanWoodDto: CreateProductionPlanWoodDto) {
    return 'This action adds a new productionPlanWood';
  }

  findAll() {
    return `This action returns all productionPlanWoods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionPlanWood`;
  }

  update(id: number, updateProductionPlanWoodDto: UpdateProductionPlanWoodDto) {
    return `This action updates a #${id} productionPlanWood`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlanWood`;
  }
}
