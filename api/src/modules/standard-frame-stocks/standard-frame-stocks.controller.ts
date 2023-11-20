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
import { StandardFrameStocksService } from './standard-frame-stocks.service';
import { CreateStandardFrameStockDto } from './dto/create-standard-frame-stocks.dto';
import { UpdateStandardFrameStockDto } from './dto/update-standard-frame-stocks.dto';
import { DeleteStandardFrameStockDto } from './dto/delete-standard-frame-stocks.dto';
import { QueryStandardFrameStockDto } from './dto/query-production-order.dto';

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
  findAll(@Query() query: QueryStandardFrameStockDto) {
    return this.standardFrameStocksService.findAll(query);
  }

  @Get('/standard-frames')
  findAllByStandardFrames(@Query() query: QueryStandardFrameStockDto) {
    return this.standardFrameStocksService.findAllByStandardFrames(query);
  }

  @Get('/standard-frames/:id')
  findAllByStandardFrameId(
    @Param('id') id: string,
    @Query() query: QueryStandardFrameStockDto,
  ) {
    return this.standardFrameStocksService.findAllByStandardFrameId(+id, query);
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
