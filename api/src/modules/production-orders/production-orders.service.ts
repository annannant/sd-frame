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

import CoreAlgorithm from '@/algorithm/core';
import { StandardFrame } from '../standard-frames/entities/standard-frame.entity';
import { parser } from '@/common/helpers/number';

@Injectable()
export class ProductionOrdersService {
  constructor(
    @InjectRepository(ProductionOrder)
    private productionOrdersRepository: Repository<ProductionOrder>,
    @InjectRepository(ProductionOrderItem)
    private productionOrderItemsRepository: Repository<ProductionOrderItem>,
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
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
    const { productionOrderId, sparePart } = createProductionOrderPlanDto;
    const queryOrders =
      this.productionOrdersRepository.createQueryBuilder('pod');
    const data = await queryOrders
      .leftJoinAndSelect('pod.productionOrderItems', 'productionOrderItems')
      .leftJoinAndSelect('productionOrderItems.standardFrame', 'standardFrame')
      .leftJoinAndSelect('pod.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .where('pod.id = :id', { id: productionOrderId })
      .getOne();

    const woodLength = data?.wood?.woodType?.length;
    const minLength = await this.getMinLength(
      data.wood.woodType.width,
      sparePart,
    );
    const core = new CoreAlgorithm(
      parser(woodLength),
      parser(minLength),
      parser(sparePart),
    );
    core.test(0);

    const formatter = await this.formatItems(
      data.productionOrderItems,
      data.wood.woodType.width,
    );
    const numbers = core.totalCutting(formatter);
    console.log('numbers:', numbers);

    // const data = await algorithm(numbers, [], [], 'desc');
    // console.log('data:', data);
    // console.log('pattern:', pattern);
    // const { pattern, zeroPattern, suggestPattern } = await go(
    //   [],
    //   [],
    //   [],
    //   'desc',
    // );
    // console.log('pattern:', pattern);
    // console.log('zeroPattern:', zeroPattern);
    // console.log('suggestPattern:', suggestPattern);

    // console.log('createProductionOrderPlanDto:');
    return data;
  }

  async formatItems(orderItems: ProductionOrderItem[], woodWidth: number) {
    const formatted = orderItems.map((item: ProductionOrderItem) => {
      return {
        // ...item,
        width: parser(item.width),
        height: parser(item.height),
        woodWidth: parser(woodWidth),
        qty: parser(item.qty),
      };
    });
    console.log('formatted:', formatted);

    return formatted;
  }

  async getMinLength(face: number, sparePart: number) {
    // min frame standard
    const frameList = await this.standardFramesRepository.findBy({
      isActive: true,
    });
    let minWood: number = 999999999;
    for (const frame of frameList) {
      if (parser(frame.width) < parser(minWood)) {
        minWood = parser(frame.width);
      }
      if (parser(frame.height) < parser(minWood)) {
        minWood = parser(frame.height);
      }
    }
    const sum = (parser(face) + parser(sparePart)) * 2;
    const result = minWood + sum;
    return result;
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
