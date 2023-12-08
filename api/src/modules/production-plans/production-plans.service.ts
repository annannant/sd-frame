import { Injectable, flatten } from '@nestjs/common';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
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
import { SUCCESS } from '@/common/constants/cutting-status.constant';
import { ProductionPlanSuggestItem } from '../production-plan-suggest-items/entities/production-plan-suggest-item.entity';
import { todo } from 'node:test';
import { WoodStockLocation } from '../wood-stock-locations/entities/wood-stock-location.entity';
import { WoodItemStock } from '../wood-item-stocks/entities/wood-item-stock.entity';
import { PART } from '@/common/constants/wood-type.constant';

@Injectable()
export class ProductionPlansService {
  constructor(
    @InjectRepository(ProductionPlan)
    private productionPlansRepository: Repository<ProductionPlan>,
    @InjectRepository(ProductionWoodSummary)
    private productionWoodSummaryRepository: Repository<ProductionWoodSummary>,
    @InjectRepository(StandardFrame)
    private standardFramesRepository: Repository<StandardFrame>,
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

  getToDoNextStd(successList: number[], data: ProductionPlan) {
    const tempSuggest = [...successList];
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

    let temp = {};
    const res = findProductionWoodList(frames, faceWidth, data.sparePart);
    for (const iterator of res) {
      for (let index = 0; index < iterator.qty; index++) {
        const qty = index + 1;
        let add = false;
        for (const wood of iterator.wood_list) {
          const index = successList.indexOf(wood);
          if (index > -1) {
            successList.splice(index, 1);
            add = true;
          }
        }
        if (add) {
          temp = {
            ...temp,
            [iterator.id]: { ...iterator, qty },
          };
        }
      }
    }

    const doneList = [...tempSuggest];
    const todos: any = [...Object.values(temp)];
    for (const item of todos) {
      const list = flatten(Array(item?.qty ?? 1).fill(item?.wood_list ?? []));
      item.all_wood_list = [...list];
      for (const wood of doneList) {
        const index = list.indexOf(wood);
        if (index > -1) {
          list.splice(index, 1);
        }
      }
      item.remaining_pattern_list = list;
    }
    return {
      todos,
      nubmersToDoStd: flatten(todos.map((val) => val.remaining_pattern_list)),
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

  prepareReplanWoodInPlan(data: ProductionPlan) {
    const result = [];
    const numbers = [];
    for (const planWood of data.productionPlanWoods ?? []) {
      const used = (planWood.productionPlanWoodItems ?? []).filter(
        (val: any) => {
          val.cuttingStatus === SUCCESS;
        },
      );
      if (!used && planWood.itemType === PART) {
        result.push(planWood);
        numbers.push(parser(planWood.length));
      }
      // const items = item.productionPlanWoodItems;
      // const list = items.map((val: ProductionPlanWoodItem) => {
      //   return {
      //     ...val,
      //     length: parser(val.length),
      //   };
      // });
      // item.productionPlanWoodItems = list;
    }

    return {
      result,
      numbers,
    };
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
    const formatter = await formatItems(
      data.productionOrder.productionOrderItems,
      woodWidth,
    );
    const numbers = await core1.totalCutting(formatter);
    console.log('data?.productionPlanWoods:', data?.productionPlanWoods);
    const numberFinished = this.findWoodNumbersSuccess(
      data?.productionPlanWoods,
    );
    const { numbers: remainingNumbers, successStd } = getRemainingList(
      numbers,
      numberFinished,
    );

    // เอา to dos ไปหา stock ที่เหลือ
    const { todos, nubmersToDoStd } = this.getToDoNextStd(successStd, data);

    const { woodItemStocksNumbers } = await this.prepareReplanWoodStocks(data);
    const { numbers: woodItemsStocks } =
      await this.prepareReplanWoodInPlan(data);

    console.log('woodItemsStocksxx:', woodItemsStocks);
    console.log('woodItemStocks:', woodItemStocksNumbers);
    return [];
    // console.log('lot:', lot);

    // wood

    // const woodItemStocks = woodItemStocks;
    const remainingList = [...remainingNumbers];

    // hand
    return todos;

    // find all number of main list
    // const orderItems = data?.productionOrder?.productionOrderItems ?? [];

    // find all number of suggest
    const suggestItems = data?.productionPlanSuggestItems ?? [];

    // const woods = data?.productionPlanWoods ?? [];
    // const woods = data?.productionPlanWoods;

    // console.log('data:', data);
    // console.log('id:', id);
    return data;
  }

  createReplan(id: number) {
    console.log('id:', id);
    return 'This action adds a new productionPlan';
  }
}
