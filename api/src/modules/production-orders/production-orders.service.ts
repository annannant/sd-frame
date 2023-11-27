import { BadRequestException, Injectable } from '@nestjs/common';
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
import { StandardFrameStock } from '../standard-frame-stocks/entities/standard-frame-stocks.entity';
import { generateOrderNo } from '@/common/helpers/generator';
import { DRAFT } from '@/common/constants/current-status.constant';
import { WoodStock } from '../wood-stocks/entities/wood-stock.entity';
import { groupBy, sum, orderBy, omit, flatten } from 'lodash';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
@Injectable()
export class ProductionOrdersService {
  constructor(
    @InjectRepository(ProductionOrder)
    private productionOrdersRepository: Repository<ProductionOrder>,
    @InjectRepository(ProductionOrderItem)
    private productionOrderItemsRepository: Repository<ProductionOrderItem>,
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
    @InjectRepository(WoodStock)
    private woodStocksRepository: Repository<WoodStock>,
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

  async filterWoodLot(data: ProductionOrder, numbers: number[]) {
    const result = [];
    const woodLength = data?.wood?.woodType?.length;
    const woodStocks = orderBy(data?.wood?.woodStocks, 'totalStock', 'asc');
    const sumNumbers = sum(numbers);
    const woodItemStockLot = groupBy(data?.wood?.woodItemStocks, 'lot');

    for (const woodStock of woodStocks) {
      const { lot, totalStock, totalUsed } = woodStock ?? {};
      const totalRemaningStock = (totalStock ?? 0) - (totalUsed ?? 0);
      const totalRemaningStockLength = totalRemaningStock * woodLength;

      const woodItemStocks = woodItemStockLot[lot] ?? [];
      const totalWoodItem = woodItemStocks.map((item: WoodItemStock) =>
        parser(item.woodLength),
      );
      const sumTotalWoodItemLength = sum(totalWoodItem);

      const totalWoodToUse = sumNumbers;
      const totalWoodInLot = totalRemaningStockLength + sumTotalWoodItemLength;
      console.log('totalWoodInLot:', totalWoodToUse, '--', totalWoodInLot);
      if (totalWoodToUse > totalWoodInLot) {
        console.log('not enough wood');
        continue;
      }
      result.push({
        ...woodStock,
        totalRemaningStock: totalRemaningStock,
        totalRemaningStockLength: totalRemaningStockLength,
        woodItemStocksNumbers: woodItemStocks.map((item) =>
          parser(item.woodLength),
        ),
        woodItemStocks: woodItemStocks,
      });
    }
    return result;
  }

  checkEnoughWoodStock(response: any, woodStock: any) {
    const countWoodResponse = response.filter((item) => !item.woodFromStock);
    const listWoodStock = response
      .filter((item) => item.woodFromStock)
      .map((item) => item.wood);

    const countWood = countWoodResponse.length;
    if (countWood > woodStock.totalRemaningStock) {
      return {
        isEnough: false,
        countWood: 0,
        listWoodStock: [],
      };
    }

    return {
      isEnough: true,
      countWood: countWood,
      listWoodStock,
    };
  }

  selectedLocationFullWood(
    totalUsedWoodQty: number,
    woodStockLocations: WoodStockLocation[],
    woodLength: number,
  ) {
    const response = [];
    let remaining = totalUsedWoodQty;
    for (const woodStockLocation of woodStockLocations) {
      if (remaining > 0) {
        const qty = woodStockLocation?.stock ?? 0;
        const used = qty > remaining ? remaining : qty;
        if (used <= 0) {
          continue;
        }

        const newWoodStockLocation = {
          ...woodStockLocation,
          usedQty: used,
          woodLength: parser(woodLength),
          woodFromStock: false,
          isOutStock: false,
        };
        response.push(newWoodStockLocation);
        remaining -= used;
      }
    }

    if (remaining > 0) {
      response.push({
        woodLength: parser(woodLength),
        usedQty: remaining,
        woodFromStock: false,
        isOutStock: true,
      });
    }

    return response;
  }

  selectedLocationItemWood(listWoodStock: any, woodItemStocksList: any) {
    // woodStock.woodItemStocks
    let woodItemStocks = [...woodItemStocksList];
    const remainingWoodItem = [...listWoodStock.map((item) => item.wood)];
    const listWoodStockLocations = [];
    for (const woodStokItem of remainingWoodItem) {
      const found = woodItemStocks.find(
        (val) => parser(val.woodLength) == parser(woodStokItem),
      );
      if (found) {
        // add wood
        listWoodStockLocations.push({
          ...found,
          usedQty: 1,
          woodFromStock: true,
          woodLength: parser(found?.woodLength),
        });
        // delete
        woodItemStocks = [
          ...woodItemStocks.filter((item) => item.id !== found.id),
        ];
      }
    }

    return listWoodStockLocations;
  }

  summaryUsedWood(response: any, woodStock: any, woodLength: number) {
    const listWoodFull = response.filter((item) => !item.woodFromStock);
    const listWoodStock = response.filter((item) => item.woodFromStock);

    const countWoodFull = listWoodFull.length;
    // const countWoodStock = listWoodStock.length;
    const listWoodLocations = this.selectedLocationFullWood(
      countWoodFull,
      woodStock?.woodStockLocations ?? [],
      woodLength,
    );
    const listWoodStockLocations = this.selectedLocationItemWood(
      listWoodStock,
      woodStock?.woodItemStocks ?? [],
    );

    const summaryWood = [
      ...listWoodLocations,
      ...orderBy(listWoodStockLocations, 'woodLength', 'desc'),
    ];
    const countWood = listWoodFull?.length;
    const isEnough = countWood <= woodStock.totalRemaningStock;

    return {
      isEnough,
      summaryWood: summaryWood,
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
      .leftJoinAndSelect('wood.woodStocks', 'woodStocks')
      .leftJoinAndSelect('wood.woodItemStocks', 'woodItemStocks')
      .leftJoinAndSelect('woodStocks.woodStockLocations', 'woodStockLocations')
      .leftJoinAndSelect('woodStockLocations.location', 'location')
      .leftJoinAndSelect('woodItemStocks.location', 'woodItemStockLocation')
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
    const numbers = await core.totalCutting(formatter);
    // sum(numbers);
    // return;
    let filterLot = await this.filterWoodLot(data, numbers);
    if (filterLot.length === 0) {
      filterLot = [
        {
          temporary: true,
          woodItemStocksNumbers: [],
        },
      ];
    }

    for (const woodStock of filterLot) {
      const { woodItemStocksNumbers } = woodStock ?? {};
      const stocks = await this.getStdOrderList(data.woodId);
      const stdOrderList = await core.totalStdList(stocks);
      const { pattern, zeroPattern, suggestPattern } = await core.core(
        numbers,
        woodItemStocksNumbers,
        stdOrderList,
        'desc',
      );
      core.printResult(pattern, zeroPattern, suggestPattern);
      const { response, responseSuggest } = core.prepareResponse(
        pattern,
        zeroPattern,
        suggestPattern,
      );

      // sum
      // const { isEnough } = await this.checkEnoughWoodStock(response, woodStock);
      const { summaryWood, isEnough } = await this.summaryUsedWood(
        response,
        woodStock,
        woodLength,
      );
      if (isEnough || woodStock.temporary) {
        return {
          plans: response,
          suggest: responseSuggest,
          summaryWood: summaryWood,
          minLength,
          woodLength,
          isWoodOutStock: !!summaryWood.find((item) => item.isOutStock),
          woodStock: omit(woodStock, [
            'totalRemaningStock',
            'totalRemaningStockLength',
            'woodItemStocksNumbers',
          ]),
        };
      }
    }
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

  async getWoodItemStock(woodId: number) {
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
          size: `${parser(item.standardFrame?.width)}x${parser(
            item.standardFrame?.height,
          )}`,
          width: parser(item.standardFrame?.width),
          height: parser(item.standardFrame?.height),
          woodWidth: parser(item.wood?.woodType?.width),
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
