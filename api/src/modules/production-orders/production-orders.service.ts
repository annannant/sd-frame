import { Injectable } from '@nestjs/common';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { UpdateProductionOrderDto } from './dto/update-production-order.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ProductionOrder } from './entities/production-order.entity';
import { EntityManager, Repository } from 'typeorm';
import { DRAFT } from '@/common/constants/current-status.constant';
import { ProductionOrderItem } from '../production-order-items/entities/production-order-item.entity';
import { CreateProductionOrderItemDto } from '../production-order-items/dto/create-production-order-item.dto';
import { QueryProductionOrderDto } from './dto/query-production-order.dto';
import { plainToInstance } from 'class-transformer';

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
        status: DRAFT,
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

  async findAll(query: QueryProductionOrderDto) {
    const queryOrders =
      this.productionOrdersRepository.createQueryBuilder('productionOrder');
    if (query.statuses) {
      const statuses = query.statuses.split(',');
      queryOrders.where('status IN (:...statuses)', {
        statuses,
      });
    }

    const orders = await queryOrders.orderBy('id', 'ASC').getMany();
    return orders;
  }

  findOne(id: number) {
    return this.productionOrdersRepository.findOneBy({ id });
  }

  update(id: number, updateProductionOrderDto: UpdateProductionOrderDto) {
    return this.productionOrdersRepository.update(id, updateProductionOrderDto);
  }

  remove(id: number) {
    return this.productionOrdersRepository.delete(id);
  }
}
