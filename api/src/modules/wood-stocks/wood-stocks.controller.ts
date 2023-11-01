import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WoodStocksService } from './wood-stocks.service';
import { CreateWoodStockDto } from './dto/create-wood-stock.dto';
import { UpdateWoodStockDto } from './dto/update-wood-stock.dto';

@Controller('wood-stocks')
export class WoodStocksController {
  constructor(private readonly woodStocksService: WoodStocksService) {}

  @Post()
  create(@Body() createWoodStockDto: CreateWoodStockDto) {
    return this.woodStocksService.create(createWoodStockDto);
  }

  @Get()
  findAll() {
    return this.woodStocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.woodStocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWoodStockDto: UpdateWoodStockDto) {
    return this.woodStocksService.update(+id, updateWoodStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.woodStocksService.remove(+id);
  }
}
