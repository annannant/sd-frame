import { Injectable } from '@nestjs/common';
import { CreateWoodStockDto } from './dto/create-wood-stock.dto';
import { UpdateWoodStockDto } from './dto/update-wood-stock.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { WoodStock } from './entities/wood-stock.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { Wood } from '../woods/entities/wood.entity';
import { sumBy, keyBy, maxBy } from 'lodash';
import * as humps from 'humps';
import { ImportWoodStockDto } from './dto/import-wood-stock.dto';
import { Location } from '../locations/entities/location.entity';
import { plainToInstance } from 'class-transformer';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
import { WoodItemStock } from '../wood-item-stocks/entities/wood-item-stock.entity';

@Injectable()
export class WoodStocksService {
  constructor(
    @InjectRepository(WoodStock)
    private woodStocksRepository: Repository<WoodStock>,
    @InjectRepository(WoodStockLocation)
    private woodStocksLocationsRepository: Repository<WoodStockLocation>,
    @InjectRepository(Wood)
    private woodRepository: Repository<Wood>,
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
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
      .innerJoinAndSelect('wood.attribute', 'attribute')
      .select(['wood', 'woodType', 'attribute'])
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
          attribute: {
            id: item.attributeId,
            name: item.attributeName,
            code: item.attributeCode,
            description: item.attributeDescription,
          },
          totalStock: parseInt(item.totalStock),
          totalLot: parseInt(item.totalLot),
          totalUsed: parseInt(item.totalUsed),
        };
      });

    return res;
  }

  async findByWoods(woodId: number) {
    // const data = await this.woodStocksRepository.findBy({
    //   woodId: woodId,
    // });

    const data = await this.woodStocksRepository
      .createQueryBuilder('st')
      .leftJoinAndMapMany(
        'st.woodItemStocks',
        WoodItemStock,
        'woodItemStocks',
        'st.wood_id=woodItemStocks.wood_id AND st.lot=woodItemStocks.lot',
      )
      .leftJoinAndMapOne(
        'woodItemStocks.location',
        Location,
        'location',
        'location.id=woodItemStocks.location_id',
      )
      .where('st.woodId = :woodId', { woodId: woodId })
      .getMany();

    const summary = {
      totalStock: sumBy(data, 'totalStock'),
      totalUsed: sumBy(data, 'totalUsed'),
    };

    return {
      data,
      summary,
    };
  }

  validateImport(data: any) {
    const errors = [];
    if (data.wood === undefined) {
      errors.push('wood_not_found');
    }

    if (data.location === undefined) {
      errors.push('location_not_found');
    }

    if (data.lot) {
      const info = data?.wood?.woodStocks?.find(
        (item) => item.lot === data.lot,
      );
      if (!info) {
        errors.push('lot_not_found');
      }
    }

    if (typeof data.qty !== 'number') {
      errors.push('qty_must_be_number');
    }

    if (data.lot && typeof data.lot !== 'number') {
      errors.push('lot_must_be_number');
    }

    return {
      status: errors.length ? 'failed' : 'pass',
      errors,
    };
  }

  getLotInfo(data: any) {
    const inputLot = data.lot;
    if (inputLot) {
      const info = data?.wood?.woodStocks?.find(
        (item) => item.lot === inputLot,
      );
      return {
        importToLot: info?.lot,
        currentStock: info?.totalStock,
        newStock: info?.totalStock + data.qty,
        isNewLot: false,
      };
    }

    const latestLot = maxBy(data?.wood?.woodStocks, 'lot');
    return {
      importToLot: (latestLot?.lot ?? 0) + 1,
      currentStock: 0,
      newStock: data.qty,
      isNewLot: true,
    };
  }

  async importValidation(importWoodStockDtoList: ImportWoodStockDto[]) {
    const locationCodes = importWoodStockDtoList.map(
      (item) => item.locationCode,
    );
    const woodCodes = importWoodStockDtoList.map((item) => item.woodCode);
    const [locations, woods] = await Promise.all([
      this.locationsRepository.findBy({
        code: In(locationCodes),
      }),
      this.woodRepository.find({
        where: {
          code: In(woodCodes),
        },
        relations: {
          woodType: true,
          attribute: true,
          woodStocks: true,
        },
      }),
    ]);
    const locationInfo = keyBy(locations, 'code');
    const woodInfo = keyBy(woods, 'code');
    const response = importWoodStockDtoList.map((item) => {
      const formatted = {
        ...item,
        wood: woodInfo[item.woodCode],
        location: locationInfo[item.locationCode],
      };
      return {
        ...formatted,
        ...this.validateImport(formatted),
        ...this.getLotInfo(formatted),
      };
    });
    return response;
  }

  async importStock(item: ImportWoodStockDto) {
    const pkey = {
      woodId: item.woodId,
      lot: item.lot,
    };
    const data = await this.woodStocksRepository.findOneBy(pkey);
    const value = plainToInstance(
      WoodStock,
      {
        ...item,
        totalStock: (data?.totalStock ?? 0) + item.qty,
        importedAt: new Date(),
      },
      { strategy: 'excludeAll' },
    );
    console.log('value:', value);

    if (data) {
      await this.woodStocksRepository.update(pkey, value);
    } else {
      await this.woodStocksRepository.save(value);
    }
  }

  async importStockLocation(item: ImportWoodStockDto) {
    const pkey = {
      woodId: item.woodId,
      lot: item.lot,
      locationId: item.locationId,
    };
    const data = await this.woodStocksLocationsRepository.findOneBy(pkey);
    console.log('data:', data);
    const value = plainToInstance(
      WoodStockLocation,
      {
        ...item,
        stock: (data?.stock ?? 0) + item.qty,
      },
      { strategy: 'excludeAll' },
    );
    if (data) {
      await this.woodStocksLocationsRepository.update(pkey, value);
    } else {
      await this.woodStocksLocationsRepository.save(value);
    }
  }

  async import(importWoodStockDtoList: ImportWoodStockDto[]) {
    for (const item of importWoodStockDtoList) {
      // stock
      await this.importStock(item);
      // location
      await this.importStockLocation(item);
    }

    return {
      status: 'success',
    };
  }
}
