import { Injectable } from '@nestjs/common';
import { CreateProductionWoodSummaryDto } from './dto/create-production-wood-summary.dto';
import { UpdateProductionWoodSummaryDto } from './dto/update-production-wood-summary.dto';

@Injectable()
export class ProductionWoodSummaryService {
  create(createProductionWoodSummaryDto: CreateProductionWoodSummaryDto) {
    return 'This action adds a new productionWoodSummary';
  }

  findAll() {
    return `This action returns all productionWoodSummary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionWoodSummary`;
  }

  update(id: number, updateProductionWoodSummaryDto: UpdateProductionWoodSummaryDto) {
    return `This action updates a #${id} productionWoodSummary`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionWoodSummary`;
  }
}
