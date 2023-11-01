import { Injectable } from '@nestjs/common';
import { CreateWoodStockDto } from './dto/create-wood-stock.dto';
import { UpdateWoodStockDto } from './dto/update-wood-stock.dto';

@Injectable()
export class WoodStocksService {
  create(createWoodStockDto: CreateWoodStockDto) {
    return 'This action adds a new woodStock';
  }

  findAll() {
    return `This action returns all woodStocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} woodStock`;
  }

  update(id: number, updateWoodStockDto: UpdateWoodStockDto) {
    return `This action updates a #${id} woodStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} woodStock`;
  }
}
