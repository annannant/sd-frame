import { Injectable } from '@nestjs/common';
import { CreateWoodStockLocationDto } from './dto/create-wood-stock-location.dto';
import { UpdateWoodStockLocationDto } from './dto/update-wood-stock-location.dto';

@Injectable()
export class WoodStockLocationsService {
  create(createWoodStockLocationDto: CreateWoodStockLocationDto) {
    return 'This action adds a new woodStockLocation';
  }

  findAll() {
    return `This action returns all woodStockLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} woodStockLocation`;
  }

  update(id: number, updateWoodStockLocationDto: UpdateWoodStockLocationDto) {
    return `This action updates a #${id} woodStockLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} woodStockLocation`;
  }
}
