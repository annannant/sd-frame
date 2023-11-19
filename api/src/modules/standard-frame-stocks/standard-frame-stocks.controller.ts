import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StandardFrameStocksService } from './standard-frame-stocks.service';
import { CreateStandardFrameStockDto } from './dto/create-standard-frame-stocks.dto';
import { UpdateStandardFrameStockDto } from './dto/update-standard-frame-stocks.dto';
import { DeleteStandardFrameStockDto } from './dto/delete-standard-frame-stocks.dto';

@Controller('standard-frame-stocks')
export class StandardFrameStocksController {
  constructor(
    private readonly standardFrameStocksService: StandardFrameStocksService,
  ) {}

  @Post()
  create(@Body() createStandardFrameStockDto: CreateStandardFrameStockDto) {
    return this.standardFrameStocksService.create(createStandardFrameStockDto);
  }

  @Get()
  findAll() {
    return this.standardFrameStocksService.findAll();
  }

  @Get('/standard-frames')
  findAllByStandardFrames() {
    return this.standardFrameStocksService.findAllByStandardFrames();
  }

  @Get('/standard-frames/:id')
  findAllByStandardFrameId(@Param('id') id: string) {
    return this.standardFrameStocksService.findAllByStandardFrameId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standardFrameStocksService.findOne(+id);
  }

  @Patch()
  update(@Body() updateStandardFrameStockDto: UpdateStandardFrameStockDto) {
    if (
      !updateStandardFrameStockDto.standardFrameId ||
      !updateStandardFrameStockDto.woodId
    ) {
      return {
        message: 'standardFrameId and woodId are required',
      };
    }
    return this.standardFrameStocksService.update(updateStandardFrameStockDto);
  }

  @Delete()
  remove(@Body() deleteStandardFrameStockDto: DeleteStandardFrameStockDto) {
    if (
      !deleteStandardFrameStockDto.standardFrameId ||
      !deleteStandardFrameStockDto.woodId
    ) {
      return {
        message: 'standardFrameId and woodId are required',
      };
    }
    return this.standardFrameStocksService.remove(deleteStandardFrameStockDto);
  }
}
