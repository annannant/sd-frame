import { Injectable } from '@nestjs/common';
import { CreateWoodTypeDto } from './dto/create-wood-type.dto';
import { UpdateWoodTypeDto } from './dto/update-wood-type.dto';

@Injectable()
export class WoodTypesService {
  create(createWoodTypeDto: CreateWoodTypeDto) {
    return 'This action adds a new woodType';
  }

  findAll() {
    return `This action returns all woodTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} woodType`;
  }

  update(id: number, updateWoodTypeDto: UpdateWoodTypeDto) {
    return `This action updates a #${id} woodType`;
  }

  remove(id: number) {
    return `This action removes a #${id} woodType`;
  }
}
