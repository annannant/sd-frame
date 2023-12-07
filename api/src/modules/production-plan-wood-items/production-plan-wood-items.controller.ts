import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductionPlanWoodItemsService } from './production-plan-wood-items.service';
import { CreateProductionPlanWoodItemDto } from './dto/create-production-plan-wood-item.dto';
import { UpdateProductionPlanWoodItemDto } from './dto/update-production-plan-wood-item.dto';
import { UpdateStatusProductionPlanWoodItemDto } from './dto/update-status-production-plan-wood-item.dto';

@Controller('production-plan-wood-items')
export class ProductionPlanWoodItemsController {
  constructor(
    private readonly productionPlanWoodItemsService: ProductionPlanWoodItemsService,
  ) {}

  @Post()
  create(
    @Body() createProductionPlanWoodItemDto: CreateProductionPlanWoodItemDto,
  ) {
    return this.productionPlanWoodItemsService.create(
      createProductionPlanWoodItemDto,
    );
  }

  @Get()
  findAll() {
    return this.productionPlanWoodItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionPlanWoodItemsService.findOne(+id);
  }

  @Patch('status')
  updateStatus(
    @Body()
    updateStatusProductionPlanWoodItemDto: UpdateStatusProductionPlanWoodItemDto,
  ) {
    return this.productionPlanWoodItemsService.updateStatus(
      updateStatusProductionPlanWoodItemDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionPlanWoodItemDto: UpdateProductionPlanWoodItemDto,
  ) {
    return this.productionPlanWoodItemsService.update(
      +id,
      updateProductionPlanWoodItemDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionPlanWoodItemsService.remove(+id);
  }
}
