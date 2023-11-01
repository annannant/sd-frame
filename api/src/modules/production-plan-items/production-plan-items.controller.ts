import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionPlanItemsService } from './production-plan-items.service';
import { CreateProductionPlanItemDto } from './dto/create-production-plan-item.dto';
import { UpdateProductionPlanItemDto } from './dto/update-production-plan-item.dto';

@Controller('production-plan-items')
export class ProductionPlanItemsController {
  constructor(private readonly productionPlanItemsService: ProductionPlanItemsService) {}

  @Post()
  create(@Body() createProductionPlanItemDto: CreateProductionPlanItemDto) {
    return this.productionPlanItemsService.create(createProductionPlanItemDto);
  }

  @Get()
  findAll() {
    return this.productionPlanItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionPlanItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionPlanItemDto: UpdateProductionPlanItemDto) {
    return this.productionPlanItemsService.update(+id, updateProductionPlanItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionPlanItemsService.remove(+id);
  }
}
