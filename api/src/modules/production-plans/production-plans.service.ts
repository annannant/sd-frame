import { Injectable } from '@nestjs/common';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';

@Injectable()
export class ProductionPlansService {
  create(createProductionPlanDto: CreateProductionPlanDto) {
    return 'This action adds a new productionPlan';
  }

  findAll() {
    return `This action returns all productionPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionPlan`;
  }

  update(id: number, updateProductionPlanDto: UpdateProductionPlanDto) {
    return `This action updates a #${id} productionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlan`;
  }
}
