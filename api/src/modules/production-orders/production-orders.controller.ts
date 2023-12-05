import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { UpdateProductionOrderDto } from './dto/update-production-order.dto';
import { QueryProductionOrderDto } from './dto/query-production-order.dto';
import { CreateProductionOrderPlanDto } from './dto/create-production-order-plan.dto';

@Controller('production-orders')
export class ProductionOrdersController {
  constructor(
    private readonly productionOrdersService: ProductionOrdersService,
  ) {}

  @Post()
  create(@Body() createProductionOrderDto: CreateProductionOrderDto) {
    return this.productionOrdersService.create(createProductionOrderDto);
  }

  @Get()
  findAll(@Query() query: QueryProductionOrderDto) {
    return this.productionOrdersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionOrdersService.findOne(+id);
  }

  @Post(':id/plan')
  plan(
    @Param('id') id: string,
    @Query() query: QueryProductionOrderDto,
    @Body() createProductionOrderDto: CreateProductionOrderPlanDto,
  ) {
    return this.productionOrdersService.plan(+id, createProductionOrderDto);
  }

  @Post(':id/create-plan')
  createPlan(
    @Param('id') id: string,
    @Query() query: QueryProductionOrderDto,
    @Body() createProductionOrderDto: CreateProductionOrderPlanDto,
  ) {
    return this.productionOrdersService.createPlanV2(
      +id,
      createProductionOrderDto,
    );
    // return this.productionOrdersService.createPlan(
    //   +id,
    //   createProductionOrderDto,
    // );
  }

  @Post(':id/cancel-plan')
  cancelPlan(@Param('id') id: string) {
    return this.productionOrdersService.cancelPlan(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionOrderDto: UpdateProductionOrderDto,
  ) {
    return this.productionOrdersService.update(+id, updateProductionOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionOrdersService.remove(+id);
  }
}
