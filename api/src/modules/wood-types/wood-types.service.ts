import { Injectable } from '@nestjs/common';
import { CreateWoodTypeDto } from './dto/create-wood-type.dto';
import { UpdateWoodTypeDto } from './dto/update-wood-type.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { WoodType } from './entities/wood-type.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WoodTypesService {
  constructor(
    @InjectRepository(WoodType)
    private woodTypesRepository: Repository<WoodType>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(createWoodTypeDto: CreateWoodTypeDto) {
    await this.woodTypesRepository.save(
      plainToInstance(WoodType, {
        ...createWoodTypeDto,
      }),
    );
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
    return this.woodTypesRepository.update(id, updateWoodTypeDto);
  }

  remove(id: number) {
    return this.woodTypesRepository.delete(id);
  }

  async findAllWood(id: number) {
    return this.woodTypesRepository.findOne({
      where: {
        id: id,
      },
      relations: ['woods', 'woods.woodType', 'woods.attribute'],
    });
  }
}
