import { Injectable } from '@nestjs/common';
import { CreateWoodStockLocationDto } from './dto/create-wood-stock-location.dto';
import { UpdateWoodStockLocationDto } from './dto/update-wood-stock-location.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { WoodStockLocation } from './entities/wood-stock-location.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class WoodStockLocationsService {
  constructor(
    @InjectRepository(WoodStockLocation)
    private woodStockLocationsRepository: Repository<WoodStockLocation>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

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

  async findByWoods(id: number) {
    console.log('id:', id);
    const data = await this.woodStockLocationsRepository
      .createQueryBuilder('st')
      .leftJoinAndSelect('st.wood', 'wood')
      .leftJoinAndSelect('st.location', 'location')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .where('st.woodId = :id', { id })
      .getMany();

    return data;
    // `This action returns a #${id} woodStockLocation`;
  }
}
