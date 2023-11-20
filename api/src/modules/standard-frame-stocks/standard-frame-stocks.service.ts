import { Injectable } from '@nestjs/common';
import { CreateStandardFrameStockDto } from './dto/create-standard-frame-stocks.dto';
import { UpdateStandardFrameStockDto } from './dto/update-standard-frame-stocks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardFrame } from '../standard-frames/entities/standard-frame.entity';
import { Repository } from 'typeorm';
import { StandardFrameStock } from './entities/standard-frame-stocks.entity';
import { sumBy } from 'lodash';
import { DeleteStandardFrameStockDto } from './dto/delete-standard-frame-stocks.dto';
import { QueryStandardFrameStockDto } from './dto/query-production-order.dto';

@Injectable()
export class StandardFrameStocksService {
  constructor(
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
    @InjectRepository(StandardFrameStock)
    private standardFrameStocksRepository: Repository<StandardFrameStock>,
  ) {}

  create(createStandardFrameStockDto: CreateStandardFrameStockDto) {
    return this.standardFrameStocksRepository.save(createStandardFrameStockDto);
  }

  async findAll(query: QueryStandardFrameStockDto) {
    const data = await this.standardFrameStocksRepository
      .createQueryBuilder('st')
      .leftJoinAndSelect('st.standardFrame', 'standardFrame')
      .leftJoinAndSelect('st.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute');
    if (query?.standardFrameId) {
      data.where('st.standardFrameId = :id', { id: query?.standardFrameId });
    }
    if (query?.woodId) {
      data.where('st.woodId = :id', { id: query?.woodId });
    }

    const response = data.getMany();
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} standardFrameStock`;
  }

  update(updateStandardFrameStockDto: UpdateStandardFrameStockDto) {
    return this.standardFrameStocksRepository.update(
      {
        woodId: updateStandardFrameStockDto.woodId,
        standardFrameId: updateStandardFrameStockDto.standardFrameId,
      },
      updateStandardFrameStockDto,
    );
  }

  remove(deleteStandardFrameStockDto: DeleteStandardFrameStockDto) {
    return this.standardFrameStocksRepository.delete({
      standardFrameId: deleteStandardFrameStockDto.standardFrameId,
      woodId: deleteStandardFrameStockDto.woodId,
    });
  }

  async findAllByStandardFrames(query: QueryStandardFrameStockDto) {
    const data = await this.standardFramesRepository
      .createQueryBuilder('sf')
      .leftJoinAndSelect('sf.standardFrameStocks', 'standardFrameStocks')
      .leftJoinAndSelect('standardFrameStocks.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute');

    const result = await data.getMany();
    const response = (result ?? []).map((item: StandardFrame) => {
      const standardFrameStocks = item?.standardFrameStocks.filter(
        (val: StandardFrameStock) => {
          if (query?.woodId && query?.standardFrameId) {
            return (
              +val?.woodId === +query?.woodId &&
              +val?.standardFrameId === +query?.standardFrameId
            );
          }

          if (query?.woodId) {
            return +val?.woodId === +query?.woodId;
          }

          if (query?.standardFrameId) {
            return +val?.standardFrameId === +query?.standardFrameId;
          }

          return true;
        },
      );

      const totalReorderStock = standardFrameStocks.map((val) => {
        const reorderStock = val?.reorderPoint - val?.stock;
        return {
          ...val,
          reorderStock: reorderStock > 0 ? reorderStock : 0,
        };
      });
      console.log('totalReorderStock:', totalReorderStock);

      return {
        ...item,
        standardFrameStocks,
        totalStock: sumBy(standardFrameStocks, 'stock'),
        totalReorderStock: sumBy(totalReorderStock, 'reorderStock'),
      };
    });
    return response;
  }

  async findAllByStandardFrameId(
    id: number,
    query: QueryStandardFrameStockDto,
  ) {
    const data = this.standardFrameStocksRepository
      .createQueryBuilder('st')
      .where('st.standardFrameId = :standardFrameId', { standardFrameId: id });

    if (query?.woodId) {
      data.andWhere('st.woodId = :woodId', { woodId: +query?.woodId });
    }

    const response = await data
      .leftJoinAndSelect('st.standardFrame', 'standardFrame')
      .leftJoinAndSelect('st.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .getMany();

    return response;
  }
}
