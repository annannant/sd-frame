import { Injectable } from '@nestjs/common';
import { CreateWoodItemStockDto } from './dto/create-wood-item-stock.dto';
import { UpdateWoodItemStockDto } from './dto/update-wood-item-stock.dto';

@Injectable()
export class WoodItemStocksService {
  create(createWoodItemStockDto: CreateWoodItemStockDto) {
    return 'This action adds a new woodItemStock';
  }

  findAll() {
    return `This action returns all woodItemStocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} woodItemStock`;
  }

  update(id: number, updateWoodItemStockDto: UpdateWoodItemStockDto) {
    return `This action updates a #${id} woodItemStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} woodItemStock`;
  }
}
