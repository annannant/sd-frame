import { Injectable } from '@nestjs/common';
import { CreateProductionPlanSuggestItemDto } from './dto/create-production-plan-suggest-item.dto';
import { UpdateProductionPlanSuggestItemDto } from './dto/update-production-plan-suggest-item.dto';

@Injectable()
export class ProductionPlanSuggestItemsService {
  create(createProductionPlanSuggestItemDto: CreateProductionPlanSuggestItemDto) {
    return 'This action adds a new productionPlanSuggestItem';
  }

  findAll() {
    return `This action returns all productionPlanSuggestItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionPlanSuggestItem`;
  }

  update(id: number, updateProductionPlanSuggestItemDto: UpdateProductionPlanSuggestItemDto) {
    return `This action updates a #${id} productionPlanSuggestItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlanSuggestItem`;
  }
}
