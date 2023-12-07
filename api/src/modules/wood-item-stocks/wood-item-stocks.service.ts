import { Injectable } from '@nestjs/common';
import { CreateWoodItemStockDto } from './dto/create-wood-item-stock.dto';
import { UpdateWoodItemStockDto } from './dto/update-wood-item-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WoodItemStock } from './entities/wood-item-stock.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WoodItemStocksService {
  constructor(
    @InjectRepository(WoodItemStock)
    private woodItemStocksRepository: Repository<WoodItemStock>,
  ) {}

  async createMultiple(createWoodItemStockDto: CreateWoodItemStockDto[]) {
    const woodItemStocks = createWoodItemStockDto.map((woodItemStock) => {
      return this.woodItemStocksRepository.save(
        plainToInstance(
          WoodItemStock,
          {
            ...woodItemStock,
            stock: 1,
          },
          {
            strategy: 'excludeAll',
          },
        ),
      );
    });

    await Promise.all(woodItemStocks);
    return createWoodItemStockDto;
  }

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
