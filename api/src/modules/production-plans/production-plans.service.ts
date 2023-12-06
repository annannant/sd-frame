import { Injectable } from '@nestjs/common';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductionPlan } from './entities/production-plan.entity';

@Injectable()
export class ProductionPlansService {
  constructor(
    @InjectRepository(ProductionPlan)
    private productionPlansRepository: Repository<ProductionPlan>,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  create(createProductionPlanDto: CreateProductionPlanDto) {
    return 'This action adds a new productionPlan';
  }

  findAll() {
    return `This action returns all productionPlans`;
  }

  async findOne(id: number) {
    const queryOrders =
      this.productionPlansRepository.createQueryBuilder('plan');
    const data = await queryOrders
      .leftJoinAndSelect('plan.productionOrder', 'productionOrder')
      .leftJoinAndSelect('productionOrder.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect(
        'productionOrder.productionOrderItems',
        'productionOrderItems',
      )
      .leftJoinAndSelect(
        'plan.productionPlanSuggestItems',
        'productionPlanSuggestItems',
      )
      .leftJoinAndSelect('plan.productionPlanWoods', 'productionPlanWoods')
      .leftJoinAndSelect(
        'productionPlanWoods.productionPlanWoodItems',
        'productionPlanWoodItems',
      )
      .leftJoinAndSelect('plan.productionWoodSummary', 'productionWoodSummary')
      .leftJoinAndSelect('productionWoodSummary.location', 'location')
      .where('plan.id = :id', { id })
      .getOne();

    if (data) {
      return {
        ...data,
        minLength: 1,
      };
    }

    return data;
  }

  update(id: number, updateProductionPlanDto: UpdateProductionPlanDto) {
    return `This action updates a #${id} productionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlan`;
  }
}
