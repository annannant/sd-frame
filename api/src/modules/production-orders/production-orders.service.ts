import { Injectable } from '@nestjs/common';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { UpdateProductionOrderDto } from './dto/update-production-order.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ProductionOrder } from './entities/production-order.entity';
import { Between, DataSource, EntityManager, Repository } from 'typeorm';
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
import {
  CUTTING_INPROGRESS,
  DRAFT,
  WAIT_FOR_CUTTING,
} from '@/common/constants/current-status.constant';
import { WoodStock } from '../wood-stocks/entities/wood-stock.entity';
import { groupBy, sum, orderBy, omit, pick, clone } from 'lodash';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
import ImproveCoreAlgorithm from '@/algorithm/coreV2';
import { ProductionPlan } from '../production-plans/entities/production-plan.entity';
import { ProductionPlanSuggestItem } from '../production-plan-suggest-items/entities/production-plan-suggest-item.entity';
import { ProductionPlanWood } from '../production-plan-woods/entities/production-plan-wood.entity';
import { ProductionPlanWoodItem } from '../production-plan-wood-items/entities/production-plan-wood-item.entity';
import { ProductionWoodSummary } from '../production-wood-summary/entities/production-wood-summary.entity';
@Injectable()
export class ProductionOrdersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ProductionOrder)
    private productionOrdersRepository: Repository<ProductionOrder>,
    @InjectRepository(ProductionOrderItem)
    private productionOrderItemsRepository: Repository<ProductionOrderItem>,
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
    @InjectRepository(WoodStock)
    private woodStocksRepository: Repository<WoodStock>,
    @InjectRepository(WoodStockLocation)
    private woodStockLocationsRepository: Repository<WoodStockLocation>,
    @InjectRepository(WoodItemStock)
    private woodItemStocksRepository: Repository<WoodItemStock>,
    @InjectRepository(StandardFrameStock)
    private standardFrameStocksRepository: Repository<StandardFrameStock>,

    @InjectRepository(ProductionPlan)
    private productionPlansRepository: Repository<ProductionPlan>,

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
      // const woodItemStocks = flatten(
      //   (woodItemStockLot[lot] ?? []).map((val: WoodItemStock) => {
      //     return Array(val.qty).fill({
      //       ...val,
      //       actualQty: val.qty,
      //       qty: 1,
      //     });
      //   }),
      // );
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
          type: 'full',
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
    const remainingWoodItem = [...listWoodStock.map((item) => item.wood)];
    const listWoodStockLocations = [];

    let woodItemStocks = [...woodItemStocksList];

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
          type: 'part',
        });

        // delete
        woodItemStocks = [
          ...woodItemStocks.filter((item) => item.id !== found.id),
        ];
      }
    }

    // group by location
    const res = {};
    for (const item of listWoodStockLocations) {
      const { woodLength, locationId } = item;
      const key = `${woodLength}|${locationId}`;
      if (!res[key]) {
        res[key] = item;
      } else {
        res[key] = {
          ...res[key],
          usedQty: res[key]?.usedQty + item.usedQty,
        };
      }
    }
    const result = Object.values(res);
    return result;
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

    const summaryWood = orderBy(
      [
        ...listWoodLocations,
        ...orderBy(listWoodStockLocations, 'woodLength', 'asc'),
      ],
      ['woodLength'],
      ['asc'],
    );

    const countWood = listWoodFull?.length;
    const isEnough = countWood <= woodStock.totalRemaningStock;

    return {
      isEnough,
      summaryWood: summaryWood,
    };
  }

  // async createPlan(
  //   id: number,
  //   createProductionOrderPlanDto: CreateProductionOrderPlanDto,
  // ) {
  //   // const str = `{"plans":[{"no":1,"wood":97.5,"list":[32.5,32.5,32.5]},{"no":2,"wood":105.5,"list":[32.5,22.5,22.5,22.5]},{"no":3,"wood":22,"list":[18.5]},{"no":4,"wood":120,"list":[22.5,22.5,22.5,17.5,17.5,17.5]},{"no":5,"wood":120,"list":[31.5,22.5,18.5,18.5,14.5,14.5]},{"no":6,"wood":120,"list":[18.5,14.5,14.5,14.5,14.5,14.5,14.5,14.5]},{"no":7,"wood":14,"list":[12.5]},{"no":8,"wood":120,"list":[17.5,17.5,14.5,14.5,14.5,14.5,14.5,12.5]},{"no":9,"wood":120,"list":[31.5,17.5,12.5,12.5,12.5,12.5,10.5,10.5]},{"no":10,"wood":120,"list":[14.19,10.77,10.77,10.77,10.5,10.5,10.5,10.5,10.5,10.5,10.5]},{"no":11,"wood":120,"list":[14.19,10.77,10.77,10.77,10.5,10.5,10.5,10.5,10.5,10.5,10.5]},{"no":12,"wood":120,"list":[10.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,8.5,8.5,8.5]},{"no":13,"wood":120,"list":[10.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,8.5,8.5,8.5]},{"no":14,"wood":120,"list":[12.5,10.5,10.5,10.5,10.5,10.5,10.5,10.5,8.5,8.5,8.5,8.5]},{"no":15,"wood":120,"list":[12.5,12.5,12.5,12.5,10.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5]},{"no":16,"wood":120,"list":[22.5,12.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5,8.5]},{"no":17,"wood":120,"list":[12.5,12.5,12.5,12.5,12.5,12.5,8.5,8.5,8.5,6.5,6.5,6.5]},{"no":18,"wood":120,"list":[12.5,12.5,12.5,12.5,12.5,12.5,12.5,6.5,6.5,6.5,6.5,6.5]},{"no":19,"wood":120,"list":[12.5,12.5,12.5,12.5,12.5,12.5,12.5,6.5,6.5,6.5,6.5,6.5]},{"no":20,"wood":120,"list":[7.5,7.5,9.5,9.5,12.5,12.5,12.5,12.5,12.5,8.5,8.5,6.5]},{"no":21,"wood":120,"list":[14.19,14.19,14.19,14.19,12.5]}],"suggest":[{"no":1,"size":"5x7","qty":1,"list":[7.5,7.5,9.5,9.5],"info":{"standardFrameId":21,"woodId":4,"size":"5x7","width":5,"height":7,"woodWidth":1,"qty":1,"dimensionW":7.5,"dimensionH":9.5,"woodList":[7.5,7.5,9.5,9.5],"totalLength":34,"orderNo":1,"set":1,"cuttingName":"h1","cutting":9.5,"key":"uuidv4","combinations":[[],[7.5],[7.5,7.5],[9.5],[7.5,9.5],[7.5,7.5,9.5],[9.5,9.5],[7.5,9.5,9.5],[7.5,7.5,9.5,9.5]]}}]}`;
  //   // return JSON.parse(str);
  //   const productionOrderId = id;
  //   const { sparePart } = createProductionOrderPlanDto;
  //   const queryOrders =
  //     this.productionOrdersRepository.createQueryBuilder('pod');
  //   const data = await queryOrders
  //     .leftJoinAndSelect('pod.productionOrderItems', 'productionOrderItems')
  //     .leftJoinAndSelect('productionOrderItems.standardFrame', 'standardFrame')
  //     .leftJoinAndSelect('pod.wood', 'wood')
  //     .leftJoinAndSelect('wood.woodType', 'woodType')
  //     .leftJoinAndSelect('wood.attribute', 'attribute')
  //     .leftJoinAndSelect('wood.woodStocks', 'woodStocks')
  //     .leftJoinAndSelect('wood.woodItemStocks', 'woodItemStocks')
  //     .leftJoinAndSelect('woodStocks.woodStockLocations', 'woodStockLocations')
  //     .leftJoinAndSelect('woodStockLocations.location', 'location')
  //     .leftJoinAndSelect('woodItemStocks.location', 'woodItemStockLocation')
  //     .where('pod.id = :id', { id: productionOrderId })
  //     .getOne();

  //   const woodLength = data?.wood?.woodType?.length;
  //   const minLength = await this.getMinLength(
  //     data.wood.woodType.width,
  //     sparePart,
  //   );
  //   const core = new CoreAlgorithm(
  //     parser(woodLength),
  //     parser(minLength),
  //     parser(sparePart),
  //   );
  //   core.test(0);
  //   const formatter = await this.formatItems(
  //     data.productionOrderItems,
  //     data.wood.woodType.width,
  //   );
  //   const numbers = await core.totalCutting(formatter);
  //   let filterLot = await this.filterWoodLot(data, numbers);
  //   if (filterLot.length === 0) {
  //     filterLot = [
  //       {
  //         temporary: true,
  //         woodItemStocksNumbers: [],
  //       },
  //     ];
  //   }

  //   for (const woodStock of filterLot) {
  //     const { woodItemStocksNumbers } = woodStock ?? {};
  //     const stocks = await this.getStdOrderList(data.woodId);
  //     const stdOrderList = await core.totalStdList(stocks);
  //     const { pattern, zeroPattern, suggestPattern } = await core.core(
  //       numbers,
  //       woodItemStocksNumbers,
  //       stdOrderList,
  //       'desc',
  //     );
  //     core.printResult(pattern, zeroPattern, suggestPattern);
  //     const { response, responseSuggest } = core.prepareResponse(
  //       pattern,
  //       zeroPattern,
  //       suggestPattern,
  //     );

  //     // sum
  //     // const { isEnough } = await this.checkEnoughWoodStock(response, woodStock);
  //     const { summaryWood, isEnough } = await this.summaryUsedWood(
  //       response,
  //       woodStock,
  //       woodLength,
  //     );
  //     if (isEnough || woodStock.temporary) {
  //       return {
  //         plans: response,
  //         suggest: responseSuggest,
  //         summaryWood: summaryWood,
  //         minLength,
  //         woodLength,
  //         isWoodOutStock: !!summaryWood.find((item) => item.isOutStock),
  //         woodStock: omit(woodStock, [
  //           'totalRemaningStock',
  //           'totalRemaningStockLength',
  //           'woodItemStocksNumbers',
  //         ]),
  //       };
  //     }
  //   }
  // }

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
    console.log('data:', data);

    return data;
  }

  formatResponse(response: any) {
    const formetted = orderBy(response, 'wood', 'asc').map((item: any) => {
      return {
        ...item,
        list: item.list.sort((a, b) => b - a),
      };
    });
    return formetted;
  }

  async getPlan(
    id: number,
    createProductionOrderPlanDto: CreateProductionOrderPlanDto,
  ) {
    const productionOrderId = id;
    const { sparePart } = createProductionOrderPlanDto;
    let queryOrders = this.productionOrdersRepository.createQueryBuilder('pod');
    queryOrders = queryOrders
      .leftJoinAndSelect('pod.productionOrderItems', 'productionOrderItems')
      .leftJoinAndSelect('productionOrderItems.standardFrame', 'standardFrame')
      .leftJoinAndSelect('pod.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .leftJoinAndSelect('wood.attribute', 'attribute')
      .leftJoinAndSelect('wood.woodStocks', 'woodStocks')
      .leftJoinAndSelect('wood.woodItemStocks', 'woodItemStocks', 'used = 0')
      .leftJoinAndMapMany(
        'woodStocks.woodStockLocations',
        WoodStockLocation,
        'woodStockLocations',
        'woodStocks.wood_id=woodStockLocations.wood_id AND woodStocks.lot=woodStockLocations.lot',
      )
      .leftJoinAndSelect('woodStockLocations.location', 'location')
      .leftJoinAndSelect('woodItemStocks.location', 'woodItemStockLocation')
      .where('pod.id = :id', { id: productionOrderId });
    // const sql = queryOrders.getSql();

    const data = await queryOrders.getOne();
    const woodLength = data?.wood?.woodType?.length;
    const minLength = await this.getMinLength(
      data.wood.woodType.width,
      sparePart,
    );

    const core1 = new CoreAlgorithm(
      parser(woodLength),
      parser(minLength),
      parser(sparePart),
    );
    const formatter = await this.formatItems(
      data.productionOrderItems,
      data.wood.woodType.width,
    );
    const numbers = await core1.totalCutting(formatter);
    const orderStd = await this.getStdOrderList(data.woodId);

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
      const { woodItemStocksNumbers: woodItemStocks } = woodStock ?? {};
      const remainingList = [...numbers];
      const core = new ImproveCoreAlgorithm(
        woodLength,
        minLength,
        sparePart,
        data.wood.woodType.width,
      );
      core.setRemainingList([...remainingList]);
      core.setWoodItemStockList([...woodItemStocks]);
      core.setStandardListByOrders(
        [...orderStd].map((item) => {
          return item;
        }),
      );
      core.findPattern();
      const { response, responseSuggest } = core.prepareResponseV2();
      const { summaryWood, isEnough } = await this.summaryUsedWood(
        response,
        woodStock,
        woodLength,
      );

      if (isEnough || woodStock.temporary) {
        return {
          plans: this.formatResponse(response),
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
          woodLot: summaryWood?.[0]?.lot,
          wood: pick(data?.wood, ['id', 'code', 'name', 'description']),
        };
      }
    }

    return {};
  }

  async plan(
    id: number,
    createProductionOrderPlanDto: CreateProductionOrderPlanDto,
  ) {
    const response = await this.getPlan(id, createProductionOrderPlanDto);
    return pick(response, [
      'plans',
      'suggest',
      'summaryWood',
      'minLength',
      'woodLength',
      'isWoodOutStock',
      'woodStock',
      'woodLot',
    ]);
  }

  async createPlanSuggestItem(
    manager: EntityManager,
    productionPlanId: number,
    data: any,
  ) {
    const createItems = data?.suggest.map((item: any) => {
      const data = plainToInstance(
        ProductionPlanSuggestItem,
        {
          ...item,
          name: item?.size,
          productionPlanId,
        },
        {
          strategy: 'excludeAll',
        },
      );
      return manager.save(data);
    });

    await Promise.all(createItems);
  }

  async createPlanWoods(
    manager: EntityManager,
    productionPlanId: number,
    data: any,
  ) {
    try {
      console.log('data?.plans:', data?.plans);
      for (const plan of data?.plans) {
        // create plan wood
        const created = await manager.save(
          plainToInstance(
            ProductionPlanWood,
            {
              productionPlanId,
              woodItemStockId: null,
              itemType: plan.woodType,
              length: plan.wood,
            },
            { strategy: 'excludeAll' },
          ),
        );
        console.log('created:', created);

        // create plan wood item
        for (const list of plan?.list ?? []) {
          await manager.save(
            plainToInstance(
              ProductionPlanWoodItem,
              {
                productionPlanWoodId: created.id,
                productionPlanId,
                length: list,
                type: 'normal',
                cuttingStatus: 'pending',
              },
              { strategy: 'excludeAll' },
            ),
          );
        }

        if (plan?.remaining) {
          await manager.save(
            plainToInstance(
              ProductionPlanWoodItem,
              {
                productionPlanWoodId: created.id,
                productionPlanId,
                length: plan?.remaining,
                type: plan?.remaining >= data?.minLength ? 'keep' : 'wasted',
                cuttingStatus: 'pending',
              },
              { strategy: 'excludeAll' },
            ),
          );
        }

        // remaining
        console.log('plan:', plan);
      }
    } catch (err) {
      console.log('err:', err);
    }
  }

  async createWoodSummary(
    manager: EntityManager,
    productionPlanId: number,
    data: any,
  ) {
    try {
      for (const wood of data?.summaryWood) {
        console.log('wood:', wood);
        await manager.save(
          plainToInstance(
            ProductionWoodSummary,
            {
              productionPlanId,
              woodType: wood.type,
              length: wood.woodLength,
              totalQty: wood.usedQty,
              totalWithdraw: null,
              woodId: wood?.woodId, //
              lot: wood.lot, //
              locationId: wood?.location?.id, //
              // locationName: wood?.location?.name, //
            },
            { strategy: 'excludeAll' },
          ),
        );
      }
    } catch (err) {
      console.log('err:', err);
    }
  }

  async holdWoodStock(
    manager: EntityManager,
    productionPlanId: number,
    data: any,
  ) {
    try {
      for (const wood of data?.summaryWood) {
        switch (wood.type) {
          case 'full':
            const stockLocation = await manager.findOneBy(WoodStockLocation, {
              woodId: wood?.woodId,
              lot: wood?.lot,
              locationId: wood?.location?.id,
            });
            stockLocation.used = stockLocation.used + wood.usedQty;
            await manager.save(stockLocation);

            const stock = await manager.findOneBy(WoodStock, {
              woodId: wood?.woodId,
              lot: wood?.lot,
            });
            stock.totalUsed = stock.totalUsed + wood.usedQty;
            await manager.save(stock);
            break;
          case 'part':
            for (let index = 0; index < wood.usedQty; index++) {
              const itemStock = await manager.findOneBy(WoodItemStock, {
                woodId: wood?.woodId,
                lot: wood?.lot,
                used: 0,
                woodLength: parser(wood?.woodLength),
              });
              itemStock.used = 1;
              await manager.save(itemStock);
            }
            break;
        }
      }
    } catch (err) {
      console.log('err:', err);
    }
  }

  async holdStandardFrameStock(
    manager: EntityManager,
    productionPlanId: number,
    data: any,
  ) {
    try {
      for (const std of data?.suggest) {
        const standardFrame = await manager.findOneBy(StandardFrame, {
          width: parser(std?.width),
          height: parser(std?.height),
        });
        const standardFrameStock = await manager.findOneBy(StandardFrameStock, {
          woodId: std?.woodId,
          standardFrameId: standardFrame.id,
        });
        standardFrameStock.inprogressStock = std?.qty ?? 0;
        await manager.save(standardFrameStock);
      }
    } catch (err) {
      console.log('err:', err);
    }
  }

  async unholdWoodStock(manager: EntityManager, productionPlanId: number) {
    try {
      const woods = await manager.findBy(ProductionWoodSummary, {
        productionPlanId,
      });

      for (const wood of woods) {
        switch (wood.woodType) {
          case 'full':
            const stockLocation = await manager.findOneBy(WoodStockLocation, {
              woodId: wood?.woodId,
              lot: wood?.lot,
              locationId: wood?.locationId,
            });
            stockLocation.used = stockLocation.used - wood.totalQty;
            await manager.save(stockLocation);
            const stock = await manager.findOneBy(WoodStock, {
              woodId: wood?.woodId,
              lot: wood?.lot,
            });
            stock.totalUsed = stock.totalUsed - wood.totalQty;
            await manager.save(stock);
            break;
          case 'part':
            for (let index = 0; index < wood.totalQty; index++) {
              console.log('index:', index);
              const itemStock = await manager.findOneBy(WoodItemStock, {
                woodId: wood?.woodId,
                lot: wood?.lot,
                used: Between(1, 1),
                woodLength: parser(wood?.length),
              });
              itemStock.used = 0;
              await manager.save(itemStock);
            }
            break;
        }
      }
    } catch (err) {
      console.log('err:', err);
    }
  }

  async unholdStandardFrameStock(
    manager: EntityManager,
    productionPlanId: number,
  ) {
    try {
      const suggest = await manager.findBy(ProductionPlanSuggestItem, {
        productionPlanId,
      });
      const order = await manager.findOneBy(ProductionOrder, {
        productionPlanId,
      });

      for (const std of suggest) {
        const standardFrame = await manager.findOneBy(StandardFrame, {
          width: parser(std?.width),
          height: parser(std?.height),
        });
        const standardFrameStock = await manager.findOneBy(StandardFrameStock, {
          woodId: order?.woodId,
          standardFrameId: standardFrame.id,
        });
        standardFrameStock.inprogressStock =
          (standardFrameStock.inprogressStock ?? 0) - std?.qty;
        await manager.save(standardFrameStock);
      }
    } catch (err) {
      console.log('err:', err);
    }
  }

  async createPlanV2(
    id: number,
    createProductionOrderPlanDto: CreateProductionOrderPlanDto,
  ) {
    const data = await this.getPlan(id, createProductionOrderPlanDto);
    if (data?.isWoodOutStock == true) {
      return {
        status: 'error',
        message: 'wood out of stock',
      };
    }

    const order = await this.productionOrdersRepository.findOneBy({ id });
    if (order.status !== WAIT_FOR_CUTTING) {
      return {
        status: 'error',
        message: 'status is invalid',
      };
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // queryRunner
      const productionOrderId = id;
      const { sparePart } = createProductionOrderPlanDto;

      const plan = plainToInstance(
        ProductionPlan,
        {
          woodLot: data?.woodLot,
          sparePart,
        },
        { strategy: 'excludeAll' },
      );
      const created = await queryRunner.manager.save(plan);
      const productionPlanId = created.id;

      if (data?.suggest?.length > 0) {
        await this.createPlanSuggestItem(
          queryRunner.manager,
          productionPlanId,
          data,
        );
      }

      await this.createPlanWoods(queryRunner.manager, productionPlanId, data);
      await this.createWoodSummary(queryRunner.manager, productionPlanId, data);
      await this.holdWoodStock(queryRunner.manager, productionPlanId, data);
      await this.holdStandardFrameStock(
        queryRunner.manager,
        productionPlanId,
        data,
      );
      await queryRunner.manager.update(
        ProductionOrder,
        { id: productionOrderId },
        { status: CUTTING_INPROGRESS, productionPlanId },
      );

      // if (true) {
      //   throw new Error('test rollback');
      // }
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log('err:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return data;
  }

  async cancelPlan(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // queryRunner
      const productionOrderId = id;
      const productionOrder = await queryRunner.manager.findOneBy(
        ProductionOrder,
        {
          id: productionOrderId,
        },
      );
      if (productionOrder.status !== CUTTING_INPROGRESS) {
        return {
          status: 'error',
          message: 'status not in progress',
        };
      }
      const productionPlanId = clone(productionOrder.productionPlanId);

      // unhold wood stock
      await this.unholdWoodStock(queryRunner.manager, productionPlanId);
      await this.unholdStandardFrameStock(
        queryRunner.manager,
        productionPlanId,
      );
      // unhold standard frame

      await queryRunner.manager.delete(ProductionPlan, {
        id: productionPlanId,
      });
      await queryRunner.manager.delete(ProductionPlanSuggestItem, {
        productionPlanId,
      });
      await queryRunner.manager.delete(ProductionPlanWood, {
        productionPlanId,
      });
      await queryRunner.manager.delete(ProductionPlanWoodItem, {
        productionPlanId,
      });
      await queryRunner.manager.delete(ProductionWoodSummary, {
        productionPlanId,
      });

      productionOrder.status = WAIT_FOR_CUTTING;
      productionOrder.productionPlanId = null;
      await queryRunner.manager.save(productionOrder);

      // if (true) {
      //   throw new Error('test rollback');
      // }
      await queryRunner.commitTransaction();
      return {
        status: 'success',
      };
    } catch (err) {
      console.log('err:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
              ? parser(item.reorderPoint) -
                (parser(item.stock) + parser(item.inprogressStock))
              : 0,
        };
      })
      .filter((item) => item.qty > 0);
    return res;
  }
}
