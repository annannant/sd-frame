import { Injectable } from '@nestjs/common';
import { CreateWoodDto } from './dto/create-wood.dto';
import { UpdateWoodDto } from './dto/update-wood.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wood } from './entities/wood.entity';
import { Repository } from 'typeorm';
import { WoodStock } from '../wood-stocks/entities/wood-stock.entity';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
import { StandardFrameStock } from '../standard-frame-stocks/entities/standard-frame-stocks.entity';

@Injectable()
export class WoodsService {
  constructor(
    @InjectRepository(Wood)
    private woodsRepository: Repository<Wood>,
    @InjectRepository(WoodStock)
    private woodStocksRepository: Repository<WoodStock>,
    @InjectRepository(WoodStockLocation)
    private woodStockLocationsRepository: Repository<WoodStockLocation>,
    @InjectRepository(StandardFrameStock)
    private standardFrameStocksRepository: Repository<StandardFrameStock>,
  ) {}

  create(createWoodDto: CreateWoodDto) {
    return this.woodsRepository.save(createWoodDto);
  }

  findAll(): Promise<Wood[]> {
    return this.woodsRepository.find({
      order: {
        name: 'ASC',
      },
      relations: {
        woodType: true,
        attribute: true,
      },
    });
  }

  findOne(id: number): Promise<Wood | null> {
    return this.woodsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        woodType: true,
        attribute: true,
      },
    });
  }

  update(id: number, updateWoodDto: UpdateWoodDto) {
    return this.woodsRepository.update(id, updateWoodDto);
  }

  remove(id: number) {
    return Promise.all([
      this.woodsRepository.delete(id),
      this.woodStocksRepository.delete({ woodId: id }),
      this.woodStockLocationsRepository.delete({ woodId: id }),
      this.standardFrameStocksRepository.delete({ woodId: id }),
    ]);
  }
}
