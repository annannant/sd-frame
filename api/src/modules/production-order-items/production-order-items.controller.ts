import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionOrderItemsService } from './production-order-items.service';
import { CreateProductionOrderItemDto } from './dto/create-production-order-item.dto';
import { UpdateProductionOrderItemDto } from './dto/update-production-order-item.dto';

@Controller('production-order-items')
export class ProductionOrderItemsController {
  constructor(private readonly productionOrderItemsService: ProductionOrderItemsService) {}

  @Post()
  create(@Body() createProductionOrderItemDto: CreateProductionOrderItemDto) {
    return this.productionOrderItemsService.create(createProductionOrderItemDto);
  }

  @Get()
  findAll() {
    return this.productionOrderItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionOrderItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionOrderItemDto: UpdateProductionOrderItemDto) {
    return this.productionOrderItemsService.update(+id, updateProductionOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionOrderItemsService.remove(+id);
  }
}
