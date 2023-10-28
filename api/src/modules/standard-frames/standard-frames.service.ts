import { Injectable } from '@nestjs/common';
import { CreateStandardFrameDto } from './dto/create-standard-frame.dto';
import { UpdateStandardFrameDto } from './dto/update-standard-frame.dto';

@Injectable()
export class StandardFramesService {
  create(createStandardFrameDto: CreateStandardFrameDto) {
    return 'This action adds a new standardFrame';
  }

  findAll() {
    return `This action returns all standardFrames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} standardFrame`;
  }

  update(id: number, updateStandardFrameDto: UpdateStandardFrameDto) {
    return `This action updates a #${id} standardFrame`;
  }

  remove(id: number) {
    return `This action removes a #${id} standardFrame`;
  }
}
