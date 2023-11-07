import { Injectable } from '@nestjs/common';
import { CreateWoodTypeDto } from './dto/create-wood-type.dto';
import { UpdateWoodTypeDto } from './dto/update-wood-type.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { WoodType } from './entities/wood-type.entity';

@Injectable()
export class WoodTypesService {
  constructor(
    @InjectRepository(WoodType)
    private woodTypesRepository: Repository<WoodType>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  create(createWoodTypeDto: CreateWoodTypeDto) {
    return 'This action adds a new woodType';
  }

  findAll() {
    return this.woodTypesRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number) {
    return this.woodTypesRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateWoodTypeDto: UpdateWoodTypeDto) {
    return `This action updates a #${id} woodType`;
  }

  remove(id: number) {
    return `This action removes a #${id} woodType`;
  }
}
