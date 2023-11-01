// algo final
const { sum } = require('lodash');

const { numbers } = require('./mock/number');
const {
  stdOrderList: stdOrderListInput,
  stocks,
} = require('./mock/suggest-stock');
const { woodStock } = require('./mock/number-wood-stock');
const { CoreAlgo } = require('./core');
const { WOOD_LENGTH, MIN_LENGTH, SPARE_PARTS } = require('./mock/config');
console.log('woodStock:', woodStock);
function printResult(allPattern, zeroPattern, suggestPattern) {
  console.log('==================== result ====================');

  if (suggestPattern) {
    let sumStd = 0;
    let sumZero = 0;
    let sumSuggest = 0;

    if (zeroPattern) {
      for (const item of zeroPattern) {
        const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
        console.log(item.pattern, wood);
        sumZero += sum(item.pattern.split(',').map((val) => +val));
      }
    }

    console.log('==================== suggest ====================');
    for (const item of suggestPattern.pattern) {
      const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
      console.log(item.pattern, wood);
      sumSuggest += sum(item.pattern.split(',').map((val) => +val));
    }
    console.log('==================== STD LIST ====================');
    for (const iterator of suggestPattern.stdList) {
      sumStd += sum(iterator.woodList);
      console.log(
        '',
        iterator.size,
        ',',
        iterator.qty,
        ',',
        iterator.woodList,
        ',',
        sum(iterator.woodList),
      );
    }

    console.log('sum: ', sumZero + sumSuggest - sumStd);
    console.log('sumStd:', sumStd);
    console.log('sumSuggest:', sumSuggest);
    console.log('sumZero:', sumZero);
  } else {
    if (allPattern) {
      for (const item of allPattern) {
        const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
        console.log(item.pattern, wood);
      }
    }
  }
}

async function execute() {
  // const algo = new CoreAlgo(120, MIN_LENGTH, SPARE_PARTS);
  const algo = new CoreAlgo(WOOD_LENGTH, MIN_LENGTH, SPARE_PARTS);
  console.log('stdOrderListInput:', stdOrderListInput);
  console.log('woodStock:', woodStock);
  const { pattern, zeroPattern, suggestPattern } = await algo.core(
    numbers,
    woodStock,
    stdOrderListInput,
    'desc',
  );
  printResult(pattern, zeroPattern, suggestPattern);
}

execute();
