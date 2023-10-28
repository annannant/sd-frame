import { Injectable } from '@nestjs/common';
import { CreateWoodDto } from './dto/create-wood.dto';
import { UpdateWoodDto } from './dto/update-wood.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wood } from './entities/wood.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WoodsService {
  constructor(
    @InjectRepository(Wood)
    private woodsRepository: Repository<Wood>,
  ) {}

  create(createWoodDto: CreateWoodDto) {
    return this.woodsRepository.save(createWoodDto);
  }

  findAll(): Promise<Wood[]> {
    return this.woodsRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Wood | null> {
    return this.woodsRepository.findOneBy({ id });
  }

  update(id: number, updateWoodDto: UpdateWoodDto) {
    return this.woodsRepository.update(id, updateWoodDto);
  }

  remove(id: number) {
    return this.woodsRepository.delete(id);
  }
}
