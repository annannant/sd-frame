import { Injectable } from '@nestjs/common';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { UpdateProductionOrderDto } from './dto/update-production-order.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ProductionOrder } from './entities/production-order.entity';
import { EntityManager, Repository } from 'typeorm';
import { ProductionOrderItem } from '../production-order-items/entities/production-order-item.entity';
import { CreateProductionOrderItemDto } from '../production-order-items/dto/create-production-order-item.dto';
import { QueryProductionOrderDto } from './dto/query-production-order.dto';
import { plainToInstance } from 'class-transformer';
import { CreateProductionOrderPlanDto } from './dto/create-production-order-plan.dto';

@Injectable()
export class ProductionOrdersService {
  constructor(
    @InjectRepository(ProductionOrder)
    private productionOrdersRepository: Repository<ProductionOrder>,
    @InjectRepository(ProductionOrderItem)
    private productionOrderItemsRepository: Repository<ProductionOrderItem>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(createProductionOrderDto: CreateProductionOrderDto) {
    const created = await this.productionOrdersRepository.save(
      plainToInstance(ProductionOrder, {
        ...createProductionOrderDto,
      }),
    );

    const items = createProductionOrderDto?.orderItems?.map(
      (item: CreateProductionOrderItemDto) => {
        return plainToInstance(ProductionOrderItem, {
          ...item,
          productionOrderId: created.id,
        });
      },
    );
    await this.productionOrderItemsRepository.save(items);
    return {
      status: 'success',
    };
  }

  async createPlan(createProductionOrderPlanDto: CreateProductionOrderPlanDto) {
    const { productionOrderId } = createProductionOrderPlanDto;
    const queryOrders =
      this.productionOrdersRepository.createQueryBuilder('pod');
    const productionOrder = await queryOrders
      .leftJoinAndSelect('pod.productionOrderItems', 'productionOrderItems')
      .leftJoinAndSelect('productionOrderItems.standardFrame', 'standardFrame')
      .leftJoinAndSelect('pod.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .where('pod.id = :id', { id: productionOrderId })
      .getOne();

    // console.log('createProductionOrderPlanDto:');
    return productionOrder;
  }

  async findAll(query: QueryProductionOrderDto) {
    const queryOrders =
      this.productionOrdersRepository.createQueryBuilder('pod');
    if (query.statuses) {
      const statuses = query.statuses.split(',');
      queryOrders.where('pod.status IN (:...statuses)', {
        statuses,
      });
    }

    const orders = await queryOrders
      .leftJoinAndSelect('pod.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .orderBy('pod.id', 'ASC')
      .getMany();

    return orders;
  }

  async findOne(id: number) {
    const queryOrders =
      this.productionOrdersRepository.createQueryBuilder('pod');
    const data = await queryOrders
      .leftJoinAndSelect('pod.productionOrderItems', 'productionOrderItems')
      .leftJoinAndSelect('productionOrderItems.standardFrame', 'standardFrame')
      .leftJoinAndSelect('pod.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .where('pod.id = :id', { id })
      .getOne();

    return data;
  }

  update(id: number, updateProductionOrderDto: UpdateProductionOrderDto) {
    return this.productionOrdersRepository.update(id, updateProductionOrderDto);
  }

  remove(id: number) {
    return this.productionOrdersRepository.delete(id);
  }
}
