import { Injectable } from '@nestjs/common';
import { CreateWoodStockDto } from './dto/create-wood-stock.dto';
import { UpdateWoodStockDto } from './dto/update-wood-stock.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { WoodStock } from './entities/wood-stock.entity';
import { EntityManager, Repository } from 'typeorm';
import { Wood } from '../woods/entities/wood.entity';
import { sumBy } from 'lodash';
import * as humps from 'humps';

@Injectable()
export class WoodStocksService {
  constructor(
    @InjectRepository(WoodStock)
    private woodStocksRepository: Repository<WoodStock>,
    @InjectRepository(Wood)
    private woodRepository: Repository<Wood>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  create(createWoodStockDto: CreateWoodStockDto) {
    return 'This action adds a new woodStock';
  }

  async findAll() {
    const data = await this.woodRepository
      .createQueryBuilder('wood')
      .innerJoinAndSelect('wood.woodStocks', 'woodStocks')
      .innerJoinAndSelect('wood.woodType', 'woodType')
      .select(['wood', 'woodType'])
      .addSelect('SUM(woodStocks.totalStock)', 'total_stock')
      .addSelect('COUNT(woodStocks.lot)', 'total_lot')
      .addSelect('SUM(woodStocks.totalUsed)', 'total_used')
      .groupBy('wood.id')
      .getRawMany();

    const res = data
      .map((item) => humps.camelizeKeys(item, { deep: true }))
      .map((item) => {
        return {
          code: item.woodCode,
          name: item.woodName,
          description: item.woodDescription,
          woodType: {
            id: item.woodTypeId,
            name: item.woodTypeName,
            code: item.woodTypeCode,
            description: item.woodTypeDescription,
            width: item.woodTypeWidth,
          },
          totalStock: parseInt(item.totalStock),
          totalLot: parseInt(item.totalLot),
          totalUsed: parseInt(item.totalUsed),
        };
      });

    return res;
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

  async findAllByWoods() {
    const data = await this.woodRepository
      .createQueryBuilder('wood')
      .innerJoinAndSelect('wood.woodStocks', 'woodStocks')
      .innerJoinAndSelect('wood.woodType', 'woodType')
      .select(['wood', 'woodType'])
      .addSelect('SUM(woodStocks.totalStock)', 'total_stock')
      .addSelect('COUNT(woodStocks.lot)', 'total_lot')
      .addSelect('SUM(woodStocks.totalUsed)', 'total_used')
      .groupBy('wood.id')
      .getRawMany();

    const res = data
      .map((item) => humps.camelizeKeys(item, { deep: true }))
      .map((item) => {
        return {
          id: item.woodId,
          code: item.woodCode,
          name: item.woodName,
          description: item.woodDescription,
          woodType: {
            id: item.woodTypeId,
            name: item.woodTypeName,
            code: item.woodTypeCode,
            description: item.woodTypeDescription,
            width: item.woodTypeWidth,
          },
          totalStock: parseInt(item.totalStock),
          totalLot: parseInt(item.totalLot),
          totalUsed: parseInt(item.totalUsed),
        };
      });

    return res;
  }

  async findByWoods(woodId: number) {
    const data = await this.woodStocksRepository.findBy({
      woodId: woodId,
    });

    const summary = {
      totalStock: sumBy(data, 'totalStock'),
      totalUsed: sumBy(data, 'totalUsed'),
    };

    return {
      data,
      summary,
    };
  }
}
