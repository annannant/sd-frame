import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WoodStockLocationsService } from './wood-stock-locations.service';
import { CreateWoodStockLocationDto } from './dto/create-wood-stock-location.dto';
import { UpdateWoodStockLocationDto } from './dto/update-wood-stock-location.dto';

@Controller('wood-stock-locations')
export class WoodStockLocationsController {
  constructor(
    private readonly woodStockLocationsService: WoodStockLocationsService,
  ) {}

  @Post()
  create(@Body() createWoodStockLocationDto: CreateWoodStockLocationDto) {
    return this.woodStockLocationsService.create(createWoodStockLocationDto);
  }

  @Get()
  findAll() {
    return this.woodStockLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.woodStockLocationsService.findOne(+id);
  }

  @Get('woods/:woodId')
  findByWood(@Param('woodId') id: string) {
    return this.woodStockLocationsService.findByWoods(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWoodStockLocationDto: UpdateWoodStockLocationDto,
  ) {
    return this.woodStockLocationsService.update(
      +id,
      updateWoodStockLocationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.woodStockLocationsService.remove(+id);
  }
}
