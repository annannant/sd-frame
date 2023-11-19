import { Injectable } from '@nestjs/common';
import { CreateStandardFrameStockDto } from './dto/create-standard-frame-stocks.dto';
import { UpdateStandardFrameStockDto } from './dto/update-standard-frame-stocks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardFrame } from '../standard-frames/entities/standard-frame.entity';
import { Repository } from 'typeorm';
import { StandardFrameStock } from './entities/standard-frame-stocks.entity';
import { sumBy } from 'lodash';
import { DeleteStandardFrameStockDto } from './dto/delete-standard-frame-stocks.dto';

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

  findAll() {
    return `This action returns all standardFrameStocks`;
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

  async findAllByStandardFrames() {
    const data = await this.standardFramesRepository
      .createQueryBuilder('sf')
      .leftJoinAndSelect('sf.standardFrameStocks', 'standardFrameStocks')
      .leftJoinAndSelect('standardFrameStocks.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .getMany();
    const response = data.map((item: StandardFrame) => {
      return {
        ...item,
        totalStock: sumBy(item?.standardFrameStocks, 'stock'),
      };
    });
    return response;
  }

  async findAllByStandardFrameId(id: number) {
    const data = await this.standardFrameStocksRepository
      .createQueryBuilder('st')
      .leftJoinAndSelect('st.standardFrame', 'standardFrame')
      .leftJoinAndSelect('st.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .where('st.standardFrameId = :id', { id })
      .getMany();

    return data;
  }
}
