import { Injectable } from '@nestjs/common';
import { CreateStandardFrameStockDto } from './dto/create-standard-frame-stocks.dto';
import { UpdateStandardFrameStockDto } from './dto/update-standard-frame-stocks.dto';

@Injectable()
export class StandardFrameStocksService {
  create(createStandardFrameStockDto: CreateStandardFrameStockDto) {
    return 'This action adds a new standardFrameStock';
  }

  findAll() {
    return `This action returns all standardFrameStocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} standardFrameStock`;
  }

  update(id: number, updateStandardFrameStockDto: UpdateStandardFrameStockDto) {
    return `This action updates a #${id} standardFrameStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} standardFrameStock`;
  }
}
