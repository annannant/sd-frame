import { ProductionOrderItem } from '@/modules/production-order-items/entities/production-order-item.entity';
import { parser } from './number';
import { countBy } from 'lodash';

export const formatItems = (
  orderItems: ProductionOrderItem[],
  woodWidth: number,
) => {
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
};

export const getRemainingList = (allList, cutList) => {
  const remainingList = [];
  for (const item of cutList) {
    const index = allList.indexOf(item);
    if (index > -1) {
      allList.splice(index, 1);
    } else {
      remainingList.push(item);
    }
  }

  const numbers = allList.sort((a, b) => b - a);
  return {
    numbers,
    successStd: remainingList,
  };
};

export function findProductionWoodList(frames, faceWidth, sparePart) {
  const result = [];
  for (const item of frames) {
    item.hight = item.height ?? item.hight;
    const w = item.width + faceWidth * 2 + sparePart * 2;
    const h = item.hight + faceWidth * 2 + sparePart * 2;
    const value = {
      ...item,
      w,
      h,
      // hight: item?.height ?? item?.hight,
      wood_list: [w, w, h, h],
    };
    result.push(value);
  }

  return result;
}
