import { Injectable } from '@nestjs/common';
import { CreateStandardFrameDto } from './dto/create-standard-frame.dto';
import { UpdateStandardFrameDto } from './dto/update-standard-frame.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardFrame } from './entities/standard-frame.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { StandardFrameStock } from '../standard-frame-stocks/entities/standard-frame-stocks.entity';

@Injectable()
export class StandardFramesService {
  constructor(
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
    @InjectRepository(StandardFrameStock)
    private standardFrameStocksRepository: Repository<StandardFrameStock>,
  ) {}

  create(createStandardFrameDto: CreateStandardFrameDto) {
    return this.standardFramesRepository.save(
      plainToInstance(
        StandardFrame,
        {
          ...createStandardFrameDto,
          unit: 'inch',
          isActive: false,
        },
        { strategy: 'excludeAll' },
      ),
    );
  }

  findAll() {
    return this.standardFramesRepository.find({
      order: {
        createdAt: 'DESC',
        width: 'ASC',
        height: 'ASC',
      },
    });
  }

  findAllActive() {
    return this.standardFramesRepository.find({
      where: {
        isActive: true,
      },
      order: {
        width: 'ASC',
        height: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.standardFramesRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateStandardFrameDto: UpdateStandardFrameDto) {
    return this.standardFramesRepository.update(
      id,
      plainToInstance(
        StandardFrame,
        {
          ...updateStandardFrameDto,
        },
        { strategy: 'excludeAll' },
      ),
    );
  }

  remove(id: number) {
    return Promise.all([
      this.standardFramesRepository.delete(id),
      this.standardFrameStocksRepository.delete({ standardFrameId: id }),
    ]);
  }

  updateActive(id: number, updateStandardFrameDto: UpdateStandardFrameDto) {
    return this.standardFramesRepository.update(id, {
      isActive: updateStandardFrameDto.isActive,
    });
  }
}
