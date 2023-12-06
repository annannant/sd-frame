import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductionPlansService } from './production-plans.service';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';
import { UpdateProductionWoodSummaryDto } from '../production-wood-summary/dto/update-production-wood-summary.dto';

@Controller('production-plans')
export class ProductionPlansController {
  constructor(
    private readonly productionPlansService: ProductionPlansService,
  ) {}

  @Post()
  create(@Body() createProductionPlanDto: CreateProductionPlanDto) {
    return this.productionPlansService.create(createProductionPlanDto);
  }

  @Get()
  findAll() {
    return this.productionPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionPlansService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionPlanDto: UpdateProductionPlanDto,
  ) {
    return this.productionPlansService.update(+id, updateProductionPlanDto);
  }

  @Patch(':id/withdraw-woods')
  withdrawWoods(
    @Param('id') id: string,
    @Body() updateProductionWoodSummaryDto: UpdateProductionWoodSummaryDto[],
  ) {
    return this.productionPlansService.withdrawWoods(
      +id,
      updateProductionWoodSummaryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionPlansService.remove(+id);
  }
}
