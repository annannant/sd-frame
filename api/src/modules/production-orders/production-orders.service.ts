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
import { WoodItemStock } from '../wood-item-stocks/entities/wood-item-stock.entity';
import { StandardFrameStock } from '../standard_frame_stocks/entities/standard_frame_stock.entity';
import { generateOrderNo } from '@/common/helpers/generator';
import { DRAFT } from '@/common/constants/current-status.constant';

@Injectable()
export class ProductionOrdersService {
  constructor(
    @InjectRepository(ProductionOrder)
    private productionOrdersRepository: Repository<ProductionOrder>,
    @InjectRepository(ProductionOrderItem)
    private productionOrderItemsRepository: Repository<ProductionOrderItem>,
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
    @InjectRepository(WoodItemStock)
    private woodItemStocksRepository: Repository<WoodItemStock>,
    @InjectRepository(StandardFrameStock)
    private standardFrameStocksRepository: Repository<StandardFrameStock>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(createProductionOrderDto: CreateProductionOrderDto) {
    const isSaveDraft = createProductionOrderDto.status === DRAFT;
    const orderNo = isSaveDraft ? null : generateOrderNo();
    const created = await this.productionOrdersRepository.save(
      plainToInstance(ProductionOrder, {
        ...createProductionOrderDto,
        orderNo,
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
    // const str = `{"plans":[{"no":1,"wood":97.5,"list":[32.5,32.5,32.5]},{"no":2,"wood":105.5,"list":[32.5,22.5,22.5,22.5]},{"no":3,"wood":22,"list":[18.5]},{"no":4,"wood":120,"list":[22.5,22.5,22.5,17.5,17.5,17.5]},{"no":5,"wood":120,"list":[31.5,22.5,18.5,18.5,14.5,14.5]},{"no":6,"wood":120,"list":[18.5,14.5,14.5,14.5,14.5,14.5,14.5,14.5]},{"no":7,"wood":14,"list":[12.5]},{"no":8,"wood":120,"list":[17.5,17.5,14.5,14.5,14.5,14.5,14.5,12.5]},{"no":9,"wood":120,"list":[31.5,17.5,12.5,12.5,12.5,12.5,10.5,10.5]},{"no":10,"wood":120,"list":[14.19,10.77,10.77,10.77,10.5,10.5,10.5,10.5,10.5,10.5,10.5]},{"no":11,"wood":120,"list":[14.19,10.77,10.77,10.77,10.5,10.5,10.5,10.5,10.5,10.5,10.5]},{"no":12,"wood":120,"list":[10.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,8.5,8.5,8.5]},{"no":13,"wood":120,"list":[10.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,8.5,8.5,8.5]},{"no":14,"wood":120,"list":[12.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,8.5,8.5,8.5,8.5]},{"no":15,"wood":120,"list":[12.5,12.5,12.5,12.5,10.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5]},{"no":16,"wood":120,"list":[22.5,12.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5]},{"no":17,"wood":120,"list":[12.5,12.5,12.5,12.5,12.5,12.5,8.5,8.5,8.5,6.5,6.5,6.5]},{"no":18,"wood":120,"list":[12.5,12.5,12.5,12.5,12.5,12.5,12.5,6.5,6.5,6.5,6.5,6.5]},{"no":19,"wood":120,"list":[12.5,12.5,12.5,12.5,12.5,12.5,12.5,6.5,6.5,6.5,6.5,6.5]},{"no":20,"wood":120,"list":[7.5,7.5,9.5,9.5,12.5,12.5,12.5,12.5,12.5,8.5,8.5,6.5]},{"no":21,"wood":120,"list":[14.19,14.19,14.19,14.19,12.5]}],"suggest":[{"no":1,"size":"5x7","qty":1,"list":[7.5,7.5,9.5,9.5],"info":{"standardFrameId":21,"woodId":4,"size":"5x7","width":5,"height":7,"woodWidth":1,"qty":1,"dimensionW":7.5,"dimensionH":9.5,"woodList":[7.5,7.5,9.5,9.5],"totalLength":34,"orderNo":1,"set":1,"cuttingName":"h1","cutting":9.5,"key":"uuidv4","combinations":[[],[7.5],[7.5,7.5],[9.5],[7.5,9.5],[7.5,7.5,9.5],[9.5,9.5],[7.5,9.5,9.5],[7.5,7.5,9.5,9.5]]}}]}`;
    // return JSON.parse(str);

    const { id: productionOrderId, sparePart } = createProductionOrderPlanDto;
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

    // const [] = await Promise.all([])
    const formatter = await this.formatItems(
      data.productionOrderItems,
      data.wood.woodType.width,
    );
    const numbers = await core.totalCutting(formatter);
    const woodStock = await this.getWoodStock(data.woodId);
    const stocks = await this.getStdOrderList(data.woodId);
    const stdOrderList = await core.totalStdList(stocks);

    const { pattern, zeroPattern, suggestPattern } = await core.core(
      numbers,
      woodStock,
      stdOrderList,
      'desc',
    );
    core.printResult(pattern, zeroPattern, suggestPattern);

    const { response, responseSuggest } = await core.prepareResponse(
      pattern,
      zeroPattern,
      suggestPattern,
    );
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
    return {
      plans: response,
      suggest: responseSuggest,
      minLength,
    };
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

  async update(id: number, updateProductionOrderDto: UpdateProductionOrderDto) {
    const isSaveDraft = updateProductionOrderDto.status === DRAFT;
    const orderNo = isSaveDraft ? null : generateOrderNo();

    const data = plainToInstance(
      ProductionOrder,
      {
        ...updateProductionOrderDto,
        orderNo,
      },
      { strategy: 'excludeAll' },
    );

    await this.productionOrdersRepository.update(id, data);
    const items = updateProductionOrderDto?.orderItems?.map(
      (item: CreateProductionOrderItemDto) => {
        return plainToInstance(ProductionOrderItem, {
          ...item,
          productionOrderId: id,
        });
      },
    );
    await this.productionOrderItemsRepository.delete({ productionOrderId: id });
    await this.productionOrderItemsRepository.save(items);
    return {
      status: 'success',
    };
  }

  async remove(id: number) {
    await this.productionOrderItemsRepository.delete({ productionOrderId: id });
    return await this.productionOrdersRepository.delete(id);
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

  async getWoodStock(woodId: number) {
    const data = await this.woodItemStocksRepository.findBy({
      woodId: woodId,
    });
    const res = data.map((item) => parser(item.woodLength));
    return res;
  }

  async getStdOrderList(woodId: number) {
    const data = await this.standardFrameStocksRepository
      .createQueryBuilder('std')
      .leftJoinAndSelect('std.standardFrame', 'standardFrame')
      .leftJoinAndSelect('std.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .where('std.wood_id = :woodId', { woodId })
      .getMany();

    const res = data
      .map((item) => {
        return {
          standardFrameId: item.standardFrameId,
          woodId: item.woodId,
          // size: item.standardFrame.name,
          size: `${parser(item.standardFrame.width)}x${parser(
            item.standardFrame.height,
          )}`,
          width: parser(item.standardFrame.width),
          height: parser(item.standardFrame.height),
          woodWidth: parser(item.wood.woodType.width),
          qty:
            item.reorderPoint && item.reorderPoint > 0
              ? parser(item.reorderPoint) - parser(item.stock)
              : 0,
        };
      })
      .filter((item) => item.qty > 0);
    return res;
  }
}
