import { Injectable } from '@nestjs/common';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductionPlan } from './entities/production-plan.entity';
import { UpdateProductionWoodSummaryDto } from '../production-wood-summary/dto/update-production-wood-summary.dto';
import { ProductionWoodSummary } from '../production-wood-summary/entities/production-wood-summary.entity';

@Injectable()
export class ProductionPlansService {
  constructor(
    @InjectRepository(ProductionPlan)
    private productionPlansRepository: Repository<ProductionPlan>,
    @InjectRepository(ProductionWoodSummary)
    private productionWoodSummaryRepository: Repository<ProductionWoodSummary>,

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
      .leftJoinAndSelect(
        'productionWoodSummary.wood',
        'productionWoodSummaryWood',
      )
      .leftJoinAndSelect(
        'productionWoodSummaryWood.woodType',
        'productionWoodSummaryWoodType',
      )
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

  async withdrawWoods(
    id: number,
    updateProductionWoodSummaryDto: UpdateProductionWoodSummaryDto[],
  ) {
    const data = updateProductionWoodSummaryDto.map(
      (val: ProductionWoodSummary) => {
        return this.productionWoodSummaryRepository.update(val.id, {
          totalWithdraw: val.totalWithdraw ?? null,
        });
      },
    );
    await Promise.all(data);
    return data;
  }

  update(id: number, updateProductionPlanDto: UpdateProductionPlanDto) {
    return `This action updates a #${id} productionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlan`;
  }
}
