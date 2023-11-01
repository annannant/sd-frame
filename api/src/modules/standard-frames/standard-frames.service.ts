import { Injectable } from '@nestjs/common';
import { CreateStandardFrameDto } from './dto/create-standard-frame.dto';
import { UpdateStandardFrameDto } from './dto/update-standard-frame.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StandardFrame } from './entities/standard-frame.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StandardFramesService {
  constructor(
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
  ) {}

  create(createStandardFrameDto: CreateStandardFrameDto) {
    return this.standardFramesRepository.save(createStandardFrameDto);
  }

  findAll() {
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
    return this.standardFramesRepository.update(id, updateStandardFrameDto);
  }

  remove(id: number) {
    return this.standardFramesRepository.delete(id);
  }
}
