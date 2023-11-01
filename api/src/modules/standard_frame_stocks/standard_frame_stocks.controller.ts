import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StandardFrameStocksService } from './standard_frame_stocks.service';
import { CreateStandardFrameStockDto } from './dto/create-standard_frame_stock.dto';
import { UpdateStandardFrameStockDto } from './dto/update-standard_frame_stock.dto';

@Controller('standard-frame-stocks')
export class StandardFrameStocksController {
  constructor(private readonly standardFrameStocksService: StandardFrameStocksService) {}

  @Post()
  create(@Body() createStandardFrameStockDto: CreateStandardFrameStockDto) {
    return this.standardFrameStocksService.create(createStandardFrameStockDto);
  }

  @Get()
  findAll() {
    return this.standardFrameStocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standardFrameStocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStandardFrameStockDto: UpdateStandardFrameStockDto) {
    return this.standardFrameStocksService.update(+id, updateStandardFrameStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standardFrameStocksService.remove(+id);
  }
}
