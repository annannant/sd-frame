import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionWoodSummaryService } from './production-wood-summary.service';
import { CreateProductionWoodSummaryDto } from './dto/create-production-wood-summary.dto';
import { UpdateProductionWoodSummaryDto } from './dto/update-production-wood-summary.dto';

@Controller('production-wood-summary')
export class ProductionWoodSummaryController {
  constructor(private readonly productionWoodSummaryService: ProductionWoodSummaryService) {}

  @Post()
  create(@Body() createProductionWoodSummaryDto: CreateProductionWoodSummaryDto) {
    return this.productionWoodSummaryService.create(createProductionWoodSummaryDto);
  }

  @Get()
  findAll() {
    return this.productionWoodSummaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionWoodSummaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionWoodSummaryDto: UpdateProductionWoodSummaryDto) {
    return this.productionWoodSummaryService.update(+id, updateProductionWoodSummaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionWoodSummaryService.remove(+id);
  }
}
