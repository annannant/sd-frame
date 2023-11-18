import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WoodItemStocksService } from './wood-item-stocks.service';
import { CreateWoodItemStockDto } from './dto/create-wood-item-stock.dto';
import { UpdateWoodItemStockDto } from './dto/update-wood-item-stock.dto';

@Controller('wood-item-stocks')
export class WoodItemStocksController {
  constructor(private readonly woodItemStocksService: WoodItemStocksService) {}

  @Post()
  create(@Body() createWoodItemStockDto: CreateWoodItemStockDto) {
    return this.woodItemStocksService.create(createWoodItemStockDto);
  }

  @Get()
  findAll() {
    return this.woodItemStocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.woodItemStocksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWoodItemStockDto: UpdateWoodItemStockDto,
  ) {
    return this.woodItemStocksService.update(+id, updateWoodItemStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.woodItemStocksService.remove(+id);
  }
}
