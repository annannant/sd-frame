/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, flatten } from '@nestjs/common';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { ProductionPlan } from './entities/production-plan.entity';
import { UpdateProductionWoodSummaryDto } from '../production-wood-summary/dto/update-production-wood-summary.dto';
import { ProductionWoodSummary } from '../production-wood-summary/entities/production-wood-summary.entity';
import { parser } from '@/common/helpers/number';
import { StandardFrame } from '../standard-frames/entities/standard-frame.entity';
import CoreAlgorithm from '@/algorithm/core';
import {
  findProductionWoodList,
  formatItems,
  getRemainingList,
} from '@/common/helpers/orders';
import { ProductionPlanItem } from '../production-plan-items/entities/production-plan-item.entity';
import { ProductionPlanWood } from '../production-plan-woods/entities/production-plan-wood.entity';
import { ProductionPlanWoodItem } from '../production-plan-wood-items/entities/production-plan-wood-item.entity';
import { PENDING, SUCCESS } from '@/common/constants/cutting-status.constant';
import { ProductionPlanSuggestItem } from '../production-plan-suggest-items/entities/production-plan-suggest-item.entity';
import { todo } from 'node:test';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
import { WoodItemStock } from '../wood-item-stocks/entities/wood-item-stock.entity';
import { FULL, PART } from '@/common/constants/wood-type.constant';
import { ProductionOrder } from '../production-orders/entities/production-order.entity';
import { WAIT_FOR_PREPARING } from '@/common/constants/current-status.constant';
import { mapValues, orderBy, sumBy, groupBy, omit } from 'lodash';
import { minLength } from 'class-validator';
import ImproveCoreAlgorithm from '@/algorithm/coreV2';
import { StandardFrameStock } from '../standard-frame-stocks/entities/standard-frame-stocks.entity';
import {
  KEEP,
  NORMAL,
  WASTED,
} from '@/common/constants/wood-item-type.constant';
import { plainToInstance } from 'class-transformer';
import { WoodStock } from '../wood-stocks/entities/wood-stock.entity';

@Injectable()
export class ProductionPlansService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ProductionPlan)
    private productionPlansRepository: Repository<ProductionPlan>,
    @InjectRepository(ProductionOrder)
    private productionOrdersRepository: Repository<ProductionOrder>,
    @InjectRepository(ProductionWoodSummary)
    private productionWoodSummaryRepository: Repository<ProductionWoodSummary>,
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
    @InjectRepository(StandardFrameStock)
    private standardFrameStocksRepository: Repository<StandardFrameStock>,

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
      .orderBy('productionOrderItems.id', 'ASC')
      .getOne();

    const summary = data?.productionOrder.productionOrderItems.map((item) => {
      const info = findProductionWoodList(
        [
          {
            ...item,
            width: parser(item.width),
            height: parser(item.height),
          },
        ],
        data?.productionOrder.wood.woodType.width,
        data.sparePart,
      );
      return {
        ...item,
        w: info[0]?.w,
        h: info[0]?.h,
      };
    });

    const summarySuggest = data?.productionPlanSuggestItems.map((item) => {
      const info = findProductionWoodList(
        [
          {
            ...item,
            width: parser(item.width),
            height: parser(item.height),
          },
        ],
        data?.productionOrder.wood.woodType.width,
        data.sparePart,
      );
      return {
        ...item,
        w: info[0]?.w,
        h: info[0]?.h,
      };
    });

    if (data) {
      return {
        ...data,
        minLength: 1,
        summaryOrderItems: summary,
        summarySuggestItems: summarySuggest,
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

  async finishPlan(id: number) {
    await this.productionOrdersRepository.update(
      { productionPlanId: id },
      { status: WAIT_FOR_PREPARING, updatedAt: new Date() },
    );
    return {
      status: 'success',
    };
  }

  update(id: number, updateProductionPlanDto: UpdateProductionPlanDto) {
    return `This action updates a #${id} productionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlan`;
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

  findWoodNumbersSuccess(planWoods: ProductionPlanWood[]) {
    const items = (planWoods ?? []).map(
      (val: ProductionPlanWood) => val.productionPlanWoodItems,
    );
    const flatted = flatten(items).reduce(
      (acc: number[], val: ProductionPlanWoodItem) => {
        if (val.cuttingStatus !== SUCCESS) {
          return acc;
        }
        return [...acc, parser(val.length)];
      },
      [],
    );
    return flatted;
  }

  splitProductionByQty = (productionList: any[]) => {
    const result = [];
    for (const item of productionList) {
      const { qty } = item;
      const list = flatten(
        Array(qty).fill({
          ...item,
          qty: 1,
          remaining_list: [...item.wood_list],
        }),
      );
      result.push(...list);
    }
    console.log('result:', result);

    return result;
  };

  getToDoNextStd(successList: number[], data: ProductionPlan) {
    const faceWidth = data?.productionOrder?.wood?.woodType?.width;
    const frames = data.productionPlanSuggestItems.map(
      (val: ProductionPlanSuggestItem) => {
        return {
          ...val,
          width: parser(val.width),
          height: parser(val.height),
        };
      },
    );
    // let temp = {};
    const res = findProductionWoodList(frames, faceWidth, data.sparePart);
    const result = this.splitProductionByQty(res);

    const temp = [];
    for (const frame of result) {
      const list = [...frame.remaining_list];
      for (const item of frame.wood_list) {
        const idx = successList.indexOf(item);
        if (idx > -1) {
          successList.splice(idx, 1);
          const idz = list.indexOf(item);
          if (idx > -1) {
            list.splice(idz, 1);
          }
        }
      }
      temp.push({
        ...frame,
        is_start: list.length !== frame.wood_list.length,
        remaining_list: list,
      });
    }

    const filter = temp.filter((val) => val.is_start);
    const filterNotStart = temp.filter((val) => !val.is_start);
    // const grouping: any = mapValues(groupBy(filter, 'name'), (clist) =>
    //   clist.map((car) => omit(car, 'name')),
    // );

    // const finishedValues = [];
    // for (const key of Object.keys(grouping)) {
    //   const value: any[] = grouping[key];
    //   finishedValues.push({
    //     name: key,
    //     ...value[0],
    //     qty: (value ?? []).length,
    //   });
    // }

    return {
      todoList: filter,
      numbers: flatten(filter.map((val) => val.remaining_list)),
      notTodoList: filterNotStart,
    };
  }

  async prepareReplanWoodStocks(data: ProductionPlan) {
    const lot = data?.woodLot;

    let query = this.productionPlansRepository.createQueryBuilder('plan');
    query = query
      .leftJoinAndSelect('plan.productionOrder', 'productionOrder')
      .leftJoinAndSelect('productionOrder.wood', 'wood')
      .leftJoinAndSelect(
        'wood.woodStocks',
        'woodStocks',
        'woodStocks.lot = :lot',
        { lot },
      )
      .leftJoinAndMapMany(
        'woodStocks.woodStockLocations',
        WoodStockLocation,
        'woodStockLocations',
        'woodStocks.wood_id=woodStockLocations.wood_id AND woodStocks.lot=woodStockLocations.lot',
      )
      .leftJoinAndSelect('woodStockLocations.location', 'location')
      .leftJoinAndSelect(
        'wood.woodItemStocks',
        'woodItemStocks',
        'woodItemStocks.used = 0 AND woodItemStocks.lot = :lot',
        { lot },
      )
      .where('plan.id = :id', { id: data?.id });

    const res = await query.getOne();
    const result = res?.productionOrder?.wood;
    const woodItemStocksNumbers = (result?.woodItemStocks ?? []).map(
      (item: WoodItemStock) => parser(item.woodLength),
    );
    return {
      woodItemStocksNumbers,
    };
  }

  prepareReplanWoodInPlan(data: ProductionPlan, minLength: number) {
    const result = [];
    // const minLength = data.minLength;
    for (const planWood of data.productionPlanWoods ?? []) {
      const totalLength = planWood.length;
      const usedList = (planWood.productionPlanWoodItems ?? [])
        .filter((val) => val.cuttingStatus === SUCCESS)
        .map((val) => ({ ...val, length: parser(val.length) }));
      const totalUsed = sumBy(usedList, (val) => val.length);
      const totalRemaining = totalLength - totalUsed;
      if (totalRemaining < minLength) {
        continue;
      }
      if (planWood.itemType === FULL && totalUsed === 0) {
        continue;
      }

      result.push(totalRemaining);
    }

    return result;
  }

  async getStdOrderList(woodId: number, notTodoList: any[]) {
    const data = await this.standardFrameStocksRepository
      .createQueryBuilder('std')
      .leftJoinAndSelect('std.standardFrame', 'standardFrame')
      .leftJoinAndSelect('std.wood', 'wood')
      .leftJoinAndSelect('wood.woodType', 'woodType')
      .where('std.wood_id = :woodId', { woodId })
      .getMany();

    const res = data
      .map((item: any) => {
        console.log('item:', item);
        const qty =
          item.reorderPoint && item.reorderPoint > 0
            ? parser(item.reorderPoint) -
              (parser(item.stock) + parser(item.inprogressStock))
            : 0;

        const width = parser(item.standardFrame?.width);
        const height = parser(item.standardFrame?.height);
        const planList = notTodoList.filter(
          (val: any) => val.width === width && val.height === height,
        );
        const planQty = sumBy(planList, (val) => val.qty);
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
          qty: qty + planQty,
        };
      })
      .filter((item) => item.qty > 0);

    return res;
  }

  async updatePlanWoodItems(
    manager: EntityManager,
    data: any,
    dataUpdate: any,
  ) {
    const planWoodId = dataUpdate.id;

    const existing = await manager.findBy(ProductionPlanWoodItem, {
      productionPlanId: data.id,
      productionPlanWoodId: planWoodId,
    });
    const tempItems = [...existing];
    // update plan wood items
    console.log('>>>>===== plan item=====');
    const items = dataUpdate.productionPlanWoodItems;
    console.log('items:', dataUpdate.id, dataUpdate.length, items);
    console.log('', planWoodId, items);

    for (const item2 of items) {
      if (item2.id) {
        console.log('item2.id:', item2.id);
        console.log('item2:', item2);
        const updated = await manager.update(
          ProductionPlanWoodItem,
          {
            id: item2.id,
          },
          plainToInstance(
            ProductionPlanWoodItem,
            { ...item2, productionPlanWoodId: planWoodId },
            {
              strategy: 'excludeAll',
            },
          ),
        );

        const indexById = tempItems.findIndex((item) => item.id === item2.id);
        if (indexById > -1) {
          tempItems.splice(indexById, 1);
        }
      } else {
        const savedItem = await manager.save(
          plainToInstance(
            ProductionPlanWoodItem,
            {
              ...item2,
              productionPlanWoodId: planWoodId,
              productionPlanId: data.id,
            },
            { strategy: 'excludeAll' },
          ),
        );
        console.log('savedItem:', savedItem);
      }
    }

    if (tempItems.length > 0) {
      const deleted = await manager.delete(ProductionPlanWoodItem, {
        id: In(tempItems.map((item) => item.id)),
      });
      console.log('deleted:', deleted);
    }
    console.log('tempItems:', tempItems);
  }

  async editPlanWood(manager: EntityManager, data: any, response: any) {
    console.log('============== editPlanWood ==========');
    const existing = await manager.findBy(ProductionPlanWood, {
      productionPlanId: data.id,
    });
    const tempExisting = [...existing];
    for (const val of response) {
      if (val.isFullSuccess) {
        const indexById = tempExisting.findIndex((item) => item.id === val.id);
        if (indexById > -1) {
          tempExisting.splice(indexById, 1);
        }
        continue;
      }
      if (val.id) {
        await manager.update(
          ProductionPlanWood,
          { id: val.id },
          plainToInstance(
            ProductionPlanWood,
            {
              ...val,
            },
            { strategy: 'excludeAll' },
          ),
        );
        await this.updatePlanWoodItems(manager, data, {
          ...val,
        });
        const indexById = tempExisting.findIndex((item) => item.id === val.id);
        if (indexById > -1) {
          tempExisting.splice(indexById, 1);
        }
      } else {
        const dataCreated = await manager.save(
          ProductionPlanWood,
          plainToInstance(
            ProductionPlanWood,
            {
              ...val,
            },
            { strategy: 'excludeAll' },
          ),
        );
        await this.updatePlanWoodItems(manager, data, {
          ...val,
          ...dataCreated,
        });
      }
    }

    const deleted = await manager.delete(ProductionPlanWood, {
      id: In(tempExisting.map((item) => item.id)),
    });

    const newExisting = await manager.find(ProductionPlanWood, {
      where: { productionPlanId: data.id },
      relations: ['productionPlanWoodItems'],
    });

    // // update or delete
    // for (const val of existing) {
    //   // find by id
    //   const indexById = response.findIndex((item) => item.id === val.id);
    //   if (indexById > -1) {
    //     // update plan wood
    //     const dataUpdate = response[indexById];
    //     // console.log('dataUpdate:', dataUpdate);
    //     const update = await manager.update(
    //       ProductionPlanWood,
    //       { id: val.id },
    //       plainToInstance(
    //         ProductionPlanWood,
    //         {
    //           ...omit(dataUpdate, 'productionPlanWoodItems'),
    //         },
    //         { strategy: 'excludeAll' },
    //       ),
    //     );
    //     await this.updatePlanWoodItems(manager, data, dataUpdate);

    //     // update paln wood items
    //     response.splice(indexById, 1);
    //   } else {
    //     // delete
    //     const deleted = await manager.delete(ProductionPlanWoodItem, {
    //       productionPlanId: data.id,
    //       cuttingStatus: PENDING,
    //     });
    //   }
    // }

    // // create
    // for (const val of response) {
    //   const dataCreated = await manager.save(
    //     ProductionPlanWood,
    //     plainToInstance(
    //       ProductionPlanWood,
    //       {
    //         ...omit(val, 'productionPlanWoodItems'),
    //       },
    //       { strategy: 'excludeAll' },
    //     ),
    //   );
    //   await this.updatePlanWoodItems(manager, data, { ...val, ...dataCreated });
    // }

    // const newExisting = await manager.find(ProductionPlanWood, {
    //   where: { productionPlanId: data.id },
    //   relations: ['productionPlanWoodItems'],
    //   // productionPlanId: data.id,
    // });
    // console.log('newExisting:', JSON.stringify(newExisting));
  }

  async updatePlanWoods(
    manager: EntityManager,
    data: any,
    response: any,
    minLength: any,
  ) {
    try {
      const tempResponse = [...response];
      const planWoodItems = data.productionPlanWoods.reduce(
        (acc, val: ProductionPlanWood) => {
          const isNotStart = val.productionPlanWoodItems
            .filter((item) => item.type === NORMAL)
            .every((item) => item.cuttingStatus === PENDING);
          if (isNotStart) {
            return acc;
          }
          const isFullSuccess = val.productionPlanWoodItems
            .filter((item) => item.type === NORMAL)
            .every((item) => item.cuttingStatus === SUCCESS);
          if (isFullSuccess) {
            return [
              ...acc,
              {
                ...val,
                isFullSuccess,
              },
            ];
          }
          const success = val.productionPlanWoodItems.filter(
            (item) => item.type === NORMAL && item.cuttingStatus === SUCCESS,
          );
          const totalLength = val.length;
          const sumSuccess = sumBy(success, (item) => parser(item.length));
          const totalRemaining = totalLength - sumSuccess;

          const woodIndex = tempResponse.findIndex(
            (val: any) => parser(val.wood) === parser(totalRemaining),
          );
          if (woodIndex > -1) {
            const woodData = tempResponse[woodIndex];
            tempResponse.splice(woodIndex, 1);
            const newList = woodData.list.map((item) => {
              return plainToInstance(ProductionPlanWoodItem, {
                productionPlanWoodId: val.id,
                productionPlanId: val.productionPlanId,
                length: parser(item),
                cuttingStatus: PENDING,
                type: NORMAL,
                woodInfo: woodData,
              });
            });

            const productionPlanWoodItems = [...success, ...newList];

            if (woodData.remaining > 0) {
              const remainingList = {
                productionPlanWoodId: val.id,
                productionPlanId: val.productionPlanId,
                length: parser(woodData.remaining),
                cuttingStatus: PENDING,
                type: woodData.remaining < minLength ? WASTED : KEEP,
                woodInfo: woodData,
              };
              productionPlanWoodItems.push(remainingList);
            }

            return [
              ...acc,
              {
                ...val,
                productionPlanWoodItems,
              },
            ];
          }

          return acc;
        },
        [],
      );

      let planWoodFormTemp = [];
      if (tempResponse.length > 0) {
        planWoodFormTemp = tempResponse.map((val: any) => {
          const items = val.list.map((length: any) => {
            return {
              length: length,
              cuttingStatus: PENDING,
              type: NORMAL,
            };
          });

          if (val.remaining > 0) {
            items.push({
              length: val.remaining,
              cuttingStatus: PENDING,
              type: val.remaining < minLength ? WASTED : KEEP,
            });
          }

          return plainToInstance(ProductionPlanWood, {
            productionPlanId: data.id,
            itemType: val.woodType,
            length: parser(val.wood),
            productionPlanWoodItems: items,
          });
        });
      }

      const result = [...planWoodItems, ...planWoodFormTemp].map((item) => {
        const items = item.productionPlanWoodItems.map((val) => ({
          ...val,
          length: parser(val.length),
          typeNo: val.type === NORMAL ? 1 : val.type === KEEP ? 2 : 3,
        }));

        return {
          ...item,
          length: parser(item.length),
          sum: sumBy(items, (val) => val.length),
          productionPlanWoodItems: orderBy(
            items,
            ['typeNo', 'length'],
            ['asc', 'asc'],
          ),
        };
      });
      const res = orderBy(result, 'length', 'asc');
      await this.editPlanWood(manager, data, res);
      return res;
    } catch (err) {
      console.log('err:', err);
    }
  }

  async updatePlanWoodSuggest(
    manager: EntityManager,
    data: any,
    stdNotTodoList: any[],
    response: any,
  ) {
    try {
      const list = [...data.productionPlanSuggestItems];
      for (let index = 0; index < list.length; index++) {
        const suggest = list[index];
        for (const notTodo of stdNotTodoList) {
          if (
            parser(notTodo.width) === parser(suggest.width) &&
            parser(notTodo.height) === parser(suggest.height)
          ) {
            list[index].qty = suggest.qty - notTodo.qty;
          }
        }
      }
      const updateList = list.filter((val) => val.qty > 0);
      const newList = [
        ...response
          .filter((val) => val.std)
          .map((val) => ({
            ...val.std,
            name: val.std.size,
          })),
      ];
      const grouping: any = mapValues(
        groupBy([...newList, ...updateList], 'name'),
        (clist) => clist.map((val) => val),
      );

      const finishedValues = [];
      for (const size of Object.keys(grouping)) {
        const frames = grouping[size].map((val) => ({
          ...val,
          qty: parser(val.qty),
        }));
        const value = {
          ...frames[0],
          qty: sumBy(frames, (val) => val.qty),
        };
        finishedValues.push(value);
      }

      await manager.delete(ProductionPlanSuggestItem, {
        productionPlanId: data.id,
      });

      for (const item of finishedValues) {
        await manager.save(
          plainToInstance(
            ProductionPlanSuggestItem,
            {
              ...item,
              productionPlanId: data.id,
            },
            { strategy: 'excludeAll' },
          ),
        );
      }
    } catch (err) {
      console.log('err:', err);
    }
  }

  async handleUpdatePlanWoodSummaryFull(
    manager: EntityManager,
    data: any,
    filteredFull: any,
  ) {
    const countFull = filteredFull.length;
    const foundFull = data.productionWoodSummary.find(
      (item) => item.woodType === FULL,
    );
    if (foundFull) {
      // update wood summary
      const totalHold = countFull - foundFull.totalQty;
      const full = await manager.findOneBy(ProductionWoodSummary, {
        id: foundFull.id,
      });
      full.totalQty = countFull;
      await manager.update(ProductionWoodSummary, { id: foundFull.id }, full);

      // update wood stock location
      const locationStockCriteria = {
        woodId: foundFull.woodId,
        locationId: foundFull.locationId,
        lot: foundFull.lot,
      };
      const locationStock = await manager.findOneBy(WoodStockLocation, {
        ...locationStockCriteria,
      });
      locationStock.used = locationStock.used + totalHold;
      await manager.update(
        WoodStockLocation,
        {
          ...locationStockCriteria,
        },
        plainToInstance(WoodItemStock, locationStock, {
          strategy: 'excludeAll',
        }),
      );

      // update wood summary
      const woodStockCriteria = {
        woodId: foundFull.woodId,
        lot: foundFull.lot,
      };
      const woodStock = await manager.findOneBy(WoodStock, woodStockCriteria);
      woodStock.totalUsed = woodStock.totalUsed + totalHold;
      await manager.update(
        WoodStock,
        { ...woodStockCriteria },
        plainToInstance(WoodStock, woodStock, { strategy: 'excludeAll' }),
      );
    } else {
      const location = await manager.findBy(WoodStockLocation, {
        woodId: data?.productionOrder?.woodId,
        lot: data?.woodLot,
      });
      const ordered = orderBy(location, 'remaining', 'asc').filter(
        (item: any) => item?.remaining >= countFull,
      );
      const locationId = ordered?.[0]?.locationId;
      await manager.save(
        plainToInstance(
          ProductionWoodSummary,
          {
            woodType: FULL,
            length: filteredFull[0].length,
            totalQty: countFull,
            totalWithdraw: 0,
            woodId: data?.productionOrder?.woodId,
            lot: data?.woodLot,
            locationId: locationId,
          },
          { strategy: 'excludeAll' },
        ),
      );
      // update used stock
      const locationStockCriteria2 = {
        woodId: data?.productionOrder?.woodId,
        locationId: locationId,
        lot: data?.woodLot,
      };
      const locationStock = await manager.findOneBy(WoodStockLocation, {
        ...locationStockCriteria2,
      });
      locationStock.used = locationStock.used + countFull;
      await manager.update(
        WoodStockLocation,
        { ...locationStockCriteria2 },
        plainToInstance(WoodItemStock, locationStock, {
          strategy: 'excludeAll',
        }),
      );

      // update used stock
      const woodStockCriteria2 = {
        woodId: data?.productionOrder?.woodId,
        lot: data?.woodLot,
      };
      const woodStock = await manager.findOneBy(WoodStock, {
        ...woodStockCriteria2,
      });
      woodStock.totalUsed = woodStock.totalUsed + countFull;
      await manager.update(
        WoodStock,
        { ...woodStockCriteria2 },
        plainToInstance(WoodStock, woodStock, { strategy: 'excludeAll' }),
      );
    }
  }

  async handleUpdatePlanWoodSummaryPart(
    manager: EntityManager,
    data: any,
    filteredPart: any,
  ) {
    const foundPart = data.productionWoodSummary.filter(
      (item) => item.woodType === PART,
    );
    const addList = [];
    const deleteList = [];
    for (let index = 0; index < foundPart.length; index++) {
      const element = foundPart[index];
      const partIndex = filteredPart.findIndex(
        (item) => parser(item.length) === parser(element.length),
      );
      if (partIndex > -1) {
        const partData = filteredPart[partIndex];
        filteredPart.splice(partIndex, 1);
      } else {
        deleteList.push(element.id);
        await manager.delete(ProductionWoodSummary, { id: element.id });
      }
    }
    if (filteredPart.length > 0) {
      for (const iterator of filteredPart) {
        const findItemWoodData = await manager.findOneBy(WoodItemStock, {
          woodId: data?.productionOrder?.woodId,
          lot: data?.woodLot,
          used: 0,
        });
        await manager.save(
          plainToInstance(
            ProductionWoodSummary,
            {
              productionPlanId: data?.id,
              woodType: PART,
              length: iterator.length,
              totalQty: 1,
              totalWithdraw: 0,
              woodId: data?.productionOrder?.woodId,
              lot: data?.woodLot,
              locationId: findItemWoodData?.locationId,
            },
            { strategy: 'excludeAll' },
          ),
        );
      }
    }
  }

  async updateWoodSummary(
    manager: EntityManager,
    data: any,
    resultPlanWoods: any,
  ) {
    try {
      const filteredFull = resultPlanWoods.filter(
        (item) => item.itemType === FULL,
      );
      const filteredPart = resultPlanWoods.filter(
        (item) => item.itemType === PART,
      );

      await this.handleUpdatePlanWoodSummaryFull(manager, data, filteredFull);
      await this.handleUpdatePlanWoodSummaryPart(manager, data, filteredPart);
    } catch (err) {
      console.log('err:', err);
    }
  }

  async replan(id: number) {
    let query = this.productionPlansRepository.createQueryBuilder('plan');
    query = query
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
      .where('plan.id = :id', { id });
    const data = await query.getOne();

    const sparePart = data?.sparePart;
    const woodType = data?.productionOrder?.wood?.woodType;
    const woodLength = woodType?.length;
    const woodWidth = woodType?.width;
    const minLength = await this.getMinLength(woodWidth, sparePart);

    const core1 = new CoreAlgorithm(
      parser(woodLength),
      parser(minLength),
      parser(sparePart),
    );
    const formatter = formatItems(
      data.productionOrder.productionOrderItems,
      woodWidth,
    );
    const numbers = await core1.totalCutting(formatter);
    const numberFinished = this.findWoodNumbersSuccess(
      data?.productionPlanWoods,
    );
    const { numbers: remainingNumbers, successStd } = getRemainingList(
      numbers,
      numberFinished,
    );

    // // หา todo ของ std ที่ต้องทำต่อ
    const {
      numbers: remainingNumbersStd,
      todoList: stdTodoList,
      notTodoList: stdNotTodoList,
    } = this.getToDoNextStd(successStd, data);

    const orderStd = await this.getStdOrderList(
      data.productionOrder.woodId,
      stdNotTodoList,
    );

    const { woodItemStocksNumbers } = await this.prepareReplanWoodStocks(data);
    const woodItemStocksNumbersInPlan = await this.prepareReplanWoodInPlan(
      data,
      minLength,
    );

    const core = new ImproveCoreAlgorithm(
      woodLength,
      minLength,
      sparePart,
      woodWidth,
    );
    const remainingList = [...remainingNumbers, ...remainingNumbersStd];
    const woodItemList = [
      ...woodItemStocksNumbers,
      ...woodItemStocksNumbersInPlan,
    ];

    core.setRemainingList([...remainingList]);
    core.setWoodItemStockList([...woodItemList]);
    core.setStandardListByOrders(
      [...orderStd].map((item) => {
        return item;
      }),
    );
    core.findPattern();
    const { response, responseSuggest } = core.prepareResponseV2();
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //
      // prepare wood item
      const resultPlanWoods = await this.updatePlanWoods(
        queryRunner.manager,
        data,
        response,
        minLength,
      );
      await this.updatePlanWoodSuggest(
        queryRunner.manager,
        data,
        stdNotTodoList,
        response,
      );
      await this.updateWoodSummary(queryRunner.manager, data, resultPlanWoods);
      await queryRunner.commitTransaction();
      return response;
    } catch (err) {
      console.log('err:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return response;
  }

  createReplan(id: number) {
    console.log('id:', id);
    return 'This action adds a new productionPlan';
  }
}
