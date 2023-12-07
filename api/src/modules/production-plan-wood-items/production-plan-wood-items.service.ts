import { Injectable } from '@nestjs/common';
import { CreateProductionPlanWoodItemDto } from './dto/create-production-plan-wood-item.dto';
import { UpdateProductionPlanWoodItemDto } from './dto/update-production-plan-wood-item.dto';
import { UpdateStatusProductionPlanWoodItemDto } from './dto/update-status-production-plan-wood-item.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ProductionPlanWoodItem } from './entities/production-plan-wood-item.entity';
import { EntityManager, In, Repository } from 'typeorm';

@Injectable()
export class ProductionPlanWoodItemsService {
  constructor(
    @InjectRepository(ProductionPlanWoodItem)
    private productionPlanWoodItemsRepository: Repository<ProductionPlanWoodItem>,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  create(createProductionPlanWoodItemDto: CreateProductionPlanWoodItemDto) {
    return 'This action adds a new productionPlanWoodItem';
  }

  findAll() {
    return `This action returns all productionPlanWoodItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionPlanWoodItem`;
  }

  update(
    id: number,
    updateProductionPlanWoodItemDto: UpdateProductionPlanWoodItemDto,
  ) {
    return `This action updates a #${id} productionPlanWoodItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlanWoodItem`;
  }

  async updateStatus(
    updateStatusProductionPlanWoodItemDto: UpdateStatusProductionPlanWoodItemDto,
  ) {
    const { cuttingStatus, ids } = updateStatusProductionPlanWoodItemDto;
    await this.productionPlanWoodItemsRepository.update(
      {
        id: In(ids),
      },
      {
        cuttingStatus: cuttingStatus,
      },
    );

    return updateStatusProductionPlanWoodItemDto;
  }
}
