import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionPlanWoodsService } from './production-plan-woods.service';
import { CreateProductionPlanWoodDto } from './dto/create-production-plan-wood.dto';
import { UpdateProductionPlanWoodDto } from './dto/update-production-plan-wood.dto';

@Controller('production-plan-woods')
export class ProductionPlanWoodsController {
  constructor(private readonly productionPlanWoodsService: ProductionPlanWoodsService) {}

  @Post()
  create(@Body() createProductionPlanWoodDto: CreateProductionPlanWoodDto) {
    return this.productionPlanWoodsService.create(createProductionPlanWoodDto);
  }

  @Get()
  findAll() {
    return this.productionPlanWoodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionPlanWoodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionPlanWoodDto: UpdateProductionPlanWoodDto) {
    return this.productionPlanWoodsService.update(+id, updateProductionPlanWoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionPlanWoodsService.remove(+id);
  }
}
