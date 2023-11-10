import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributesRepository: Repository<Attribute>,
  ) {}

  create(createAttributeDto: CreateAttributeDto) {
    return this.attributesRepository.save(createAttributeDto);
  }

  findAll() {
    return this.attributesRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.attributesRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateAttributeDto: UpdateAttributeDto) {
    return this.attributesRepository.update(id, updateAttributeDto);
  }

  remove(id: number) {
    return this.attributesRepository.delete(id);
  }
}
