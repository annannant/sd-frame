import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionPlanSuggestItemsService } from './production-plan-suggest-items.service';
import { CreateProductionPlanSuggestItemDto } from './dto/create-production-plan-suggest-item.dto';
import { UpdateProductionPlanSuggestItemDto } from './dto/update-production-plan-suggest-item.dto';

@Controller('production-plan-suggest-items')
export class ProductionPlanSuggestItemsController {
  constructor(private readonly productionPlanSuggestItemsService: ProductionPlanSuggestItemsService) {}

  @Post()
  create(@Body() createProductionPlanSuggestItemDto: CreateProductionPlanSuggestItemDto) {
    return this.productionPlanSuggestItemsService.create(createProductionPlanSuggestItemDto);
  }

  @Get()
  findAll() {
    return this.productionPlanSuggestItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionPlanSuggestItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionPlanSuggestItemDto: UpdateProductionPlanSuggestItemDto) {
    return this.productionPlanSuggestItemsService.update(+id, updateProductionPlanSuggestItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionPlanSuggestItemsService.remove(+id);
  }
}
