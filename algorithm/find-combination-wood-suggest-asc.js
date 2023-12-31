const {
  sum,
  uniq,
  sortBy,
  orderBy,
  groupBy,
  slice,
  flatten,
  unionBy,
  cloneDeep,
  get,
} = require("lodash");
const debug = false;
const woodLength = 120;
const minLength = 6.5;

const { numbers } = require("./number");
const { stdOrderList } = require("./suggest-stock");
const { woodStock } = require("./number-wood-stock");
console.log("woodStock:", woodStock);
function intersect(patternList, numbers) {
  const sortedNumbers = sortBy(numbers);
  return sortBy(patternList).filter((val) => sortedNumbers.includes(val));
}

const uniqueArray = (list) => {
  return Array.from(new Set(list.map(JSON.stringify)), JSON.parse);
};

function findStdCombinations(listRemain, testingList, remainWoodStock) {
  // start
  let copyNumber = cloneDeep(listRemain);
  let copyTestingList = cloneDeep(flatten(testingList));
  let copyRemainWoodStock = cloneDeep(flatten(remainWoodStock));

  if (debug) console.log("copyNumber:", copyNumber.length);
  if (debug) console.log("copyTestingList:", copyTestingList);

  const keptList = [];
  const wastedList = [];
  const pattern = [];
  const woodStockInfo = {};

  while (copyTestingList.length || copyNumber.length) {
    const numberTest = [...copyNumber, ...flatten(copyTestingList)];
    // if (debug) console.log("suggest_list:", testingList.join(","));
    const sliced = filterForCombination(numberTest);

    // ASC
    const slicedFormatter = sortBy(flatten(sliced));

    // // DESC
    // const slicedFormatter = sortBy(flatten(sliced)).reverse();
    // console.log('slicedFormatter:', slicedFormatter)
    const result = findCombinations(
      slicedFormatter,
      testingList,
      copyRemainWoodStock
    );

    const selected = result;
    // split remaining wood
    if (selected.from_stock) {
      if (debug)
        console.log("selected.from_stock:", selected.from_stock, selected.wood);
      const deletIndex = copyRemainWoodStock.indexOf(+selected.wood);
      if (deletIndex > -1) {
        copyRemainWoodStock.splice(deletIndex, 1);
        if (+selected.remain > 0) {
          copyRemainWoodStock.push(+selected.remain);
        }
      }
    }

    // split used wood
    const selectedArray = selected.pattern.split(",");
    for (const iterator of selectedArray) {
      // delete remaing list
      let deletIndex = copyNumber.indexOf(+iterator);
      if (deletIndex > -1) {
        copyNumber.splice(deletIndex, 1);
        continue;
      }

      // delete testing list
      let deletTestingIndex = copyTestingList.indexOf(+iterator);
      if (deletTestingIndex > -1) {
        if (debug) console.log("std item:", iterator);
        copyTestingList.splice(deletTestingIndex, 1);
      }
    }

    // reduce qty
    // stdList[index].qty = stdList[index].qty - qty;
    console.log(
      selected.pattern,
      ";",
      selected.from_stock ? selected.wood : 120
    );
    pattern.push(selected.pattern);

    // wood info
    if (selected.from_stock) {
      woodStockInfo[pattern.length - 1] = selected.wood;
    }

    const sumSelected = sum(selected.pattern.split(",").map((item) => +item));

    const selectedRemain =
      (selected.from_stock ? selected.wood : woodLength) - sumSelected;
    if (!selected.from_stock) {
      if (selectedRemain >= minLength) {
        // keep
        keptList.push(selectedRemain);
      } else {
        // wasted
        wastedList.push(selectedRemain);
      }
    }

    // console.log("copyNumber:", copyNumber.join(","));
    // console.log("============>");
  }

  const mergeKept = [...keptList, ...copyRemainWoodStock];
  return {
    mergeKept,
    keptList,
    remainWoodStock: copyRemainWoodStock,
    wastedList,
    pattern,
    woodStockInfo,
  };
}

function findCombinations(numbers, stdList, remainWoodStock) {
  const combinations = [[]];
  let no = 1;
  let lowest = 9999999;
  let zeroList = {};
  const selectedCombinations = [];

  for (let i = 0; i < numbers.length; i++) {
    const currentCombinations = [...uniqueArray(combinations)]; // Create a copy of existing combinations
    // const currentCombinations = [...combinations]; // Create a copy of existing combinations
    for (let j = 0; j < currentCombinations.length; j++) {
      // const current = [...currentCombinations[j], numbers[i]]
      const current = sortBy([...currentCombinations[j], numbers[i]]).reverse();
      const pattern = current.join(",");
      const sumValue = parseFloat(sum(current).toFixed(2));
      if (sumValue > woodLength) {
        continue;
      }

      const woods = [...remainWoodStock, woodLength]
        .map((wood) => {
          const remainWood = parseFloat(wood - sumValue);
          return {
            from_stock: wood !== woodLength,
            wood,
            remain: remainWood,
          };
        })
        .filter((val) => val.remain >= 0);

      // const remain = parseFloat((woodLength - sumValue));
      const findZero = sortBy(woods).find((val) => val.remain === 0);
      // const remain = parseFloat((woodLength - sumValue));
      if (findZero?.remain === 0) {
        return {
          // wood: wood,
          // remain: remain,
          ...findZero,
          pattern: pattern,
        };
      }

      const findMin = orderBy(woods, "remain", "asc")[0];
      if (findMin?.remain < lowest) {
        lowest = findMin?.remain;

        selectedCombinations.push({
          // suggest_list: suggestList,
          ...findMin,
          pattern: pattern,
        });
      }

      combinations.push(current);
    }
  }

  const lowestRemain = orderBy(selectedCombinations, ["remain"], ["asc"])[0];
  if (debug) console.log("lowest_remain:", lowestRemain);

  // console.log('zeroList', Object.keys(zeroList).length)
  // return uniqueArray(combinations);
  // console.log('combinations:', combinations)
  return lowestRemain;
}

function filterForCombination(numbers) {
  const grouped = groupBy(numbers);
  const result = [];
  for (const key in grouped) {
    let max = 1;

    // find max
    for (let index = 0; index < grouped[key].length; index++) {
      const cal = parseFloat(key) * (index + 1);
      if (cal <= woodLength) {
        max = index + 1;
      }
    }

    // slice
    const sliced = grouped[key].slice(0, max);
    result.push(sliced);
    // console.log('max:', max, grouped[key], )
  }

  return result;
}

function orderNumberByGroup(numbers, order = "asc") {
  const grouped = [];
  const groupedKeys = groupBy(numbers);
  for (let key of Object.keys(groupedKeys)) {
    const element = groupedKeys[key];
    grouped.push({
      value: element,
      count: element.length,
    });
    // grouped['count'] = grouped[key].length
  }
  // console.log('grouped:', )
  return flatten(
    orderBy(grouped, ["count"], [order]).map(({ value }) => value)
  );
}
async function go() {
  // const params= {
  //   a: '',
  //   b: null,
  //   c: 'xxx',
  //   d: undefined
  // }

  // const hasEmpty = Object.values(params).filter((item) => !item).length
  // if (hasEmpty) {
  //   // do something
  //   return
  // }


// console.log('Object.values(a) :', 'xx')
// return


  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(woodStock);
  let listHasRemain = [];

  while (copyNumber.length) {
    // while (copyNumber.length > 306) {
    //   console.log('copyNumber.length:', copyNumber.length)
    //   copyNumber.pop()
    const standardList = [
      [],
      // [17.5, 17.5, 14.5, 14.5],
      // [17.5, 17.5, 12.5, 12.5],
      // [14.5, 14.5, 12.5, 12.5],
      // [14.5, 14.5, 10.5, 10.5],
      // [14.19, 14.19, 10.74, 10.74],
      // [12.5, 12.5, 10.5, 10.5],
      // [10.5, 10.5, 8.5, 8.5],
      // [9.5, 9.5, 7.5, 7.5],
      // [8.5, 8.5, 6.5, 6.5],
    ];

    const lowestRemainList = [];
    for (const list of standardList) {
      const numberTest = [...copyNumber, ...list];
      // if (debug) console.log("suggest_list:", list.join(","));
      const sliced = filterForCombination(numberTest);
      // ASC
      const slicedFormatter = sortBy(flatten(sliced));

      // // DESC
      // const slicedFormatter = sortBy(flatten(sliced)).reverse();

      // // // qty asc
      // // const slicedFormatter = orderNumberByGroup(flatten(sliced))

      // // qty desc
      // const slicedFormatter = orderNumberByGroup(flatten(sliced), 'desc')

      const result = findCombinations(slicedFormatter, list, remainWoodStock);
      // console.log('result:', result.join(','))
      lowestRemainList.push(result);
      if (debug)
        console.log("======================= end =======================");
    }

    const selected = orderBy(lowestRemainList, "remain", "asc")[0];
    // no 0 anymore
    if (selected.remain > 0) {
      listHasRemain = cloneDeep(copyNumber);
      copyNumber = [];
      continue;
    }

    if (selected.from_stock) {
      const deletIndex = remainWoodStock.indexOf(+selected.wood);
      if (deletIndex > -1) {
        remainWoodStock.splice(deletIndex, 1);
        if (+selected.remain > 0) {
          remainWoodStock.push(+selected.remain);
        }
      }
    }

    const selectedArray = selected.pattern.split(",");
    for (const iterator of selectedArray) {
      let deletIndex = copyNumber.indexOf(+iterator);
      if (deletIndex > -1) {
        copyNumber.splice(deletIndex, 1);
      }
    }
    console.log(selected.pattern, ";", selected.wood);
  }

  if (listHasRemain.length > 0) {
    // console.log("remainWoodStock:", remainWoodStock);
    // console.log("listHasRemain:", listHasRemain);
    goNext(listHasRemain, remainWoodStock);
  }
}

async function findSuggestionStd(listRemain, stdOrderList, remainWoodStock) {
  const stdList = orderBy(stdOrderList, ["height", "width"], ["asc", "asc"]);

  let noneZeroRemain = [];
  // ตามจำนวน

  const remainInfo = [];

  // qty
  for (const [index, std] of stdList.entries()) {
    for (let i = 0; i < std.qty; i++) {
      const qty = i + 1;
      if (debug) console.log("qty================:", std.size, qty);
      const cutting = [
        std.dimensionW,
        std.dimensionW,
        std.dimensionH,
        std.dimensionH,
      ];
      const testingList = Array.from({ length: qty }, (val) => cutting);

      const { mergeKept, wastedList, pattern, woodStockInfo } =
        findStdCombinations(
          listRemain,
          flatten(testingList),
          flatten(remainWoodStock)
        );
      // // start
      // let copyNumber = cloneDeep(listRemain);
      // let copyTestingList = cloneDeep(flatten(testingList));
      // let copyRemainWoodStock = cloneDeep(flatten(remainWoodStock));

      // if (debug) console.log("copyNumber:", copyNumber.length);
      // if (debug) console.log("copyTestingList:", copyTestingList);

      // const keptList = [];
      // const wastedList = [];
      // const pattern = [];
      // const woodStockInfo = {};

      // while (copyTestingList.length || copyNumber.length) {
      //   const numberTest = [...copyNumber, ...flatten(copyTestingList)];
      //   // if (debug) console.log("suggest_list:", testingList.join(","));
      //   const sliced = filterForCombination(numberTest);

      //   // // ASC
      //   // const slicedFormatter = sortBy(flatten(sliced));

      //   // DESC
      //   const slicedFormatter = sortBy(flatten(sliced)).reverse();
      //   // console.log('slicedFormatter:', slicedFormatter)
      //   const result = findCombinations(
      //     slicedFormatter,
      //     testingList,
      //     copyRemainWoodStock
      //   );

      //   const selected = result;
      //   // split remaining wood
      //   if (selected.from_stock) {
      //     if (debug)
      //       console.log(
      //         "selected.from_stock:",
      //         selected.from_stock,
      //         selected.wood
      //       );
      //     const deletIndex = copyRemainWoodStock.indexOf(+selected.wood);
      //     if (deletIndex > -1) {
      //       copyRemainWoodStock.splice(deletIndex, 1);
      //       if (+selected.remain > 0) {
      //         copyRemainWoodStock.push(+selected.remain);
      //       }
      //     }
      //   }

      //   // split used wood
      //   const selectedArray = selected.pattern.split(",");
      //   for (const iterator of selectedArray) {
      //     // delete remaing list
      //     let deletIndex = copyNumber.indexOf(+iterator);
      //     if (deletIndex > -1) {
      //       copyNumber.splice(deletIndex, 1);
      //       continue;
      //     }

      //     // delete testing list
      //     let deletTestingIndex = copyTestingList.indexOf(+iterator);
      //     if (deletTestingIndex > -1) {
      //       if (debug) console.log("std item:", iterator);
      //       copyTestingList.splice(deletTestingIndex, 1);
      //     }
      //   }

      //   // reduce qty
      //   // stdList[index].qty = stdList[index].qty - qty;
      //   console.log(
      //     selected.pattern,
      //     ";",
      //     selected.from_stock ? selected.wood : 120
      //   );
      //   pattern.push(selected.pattern);

      //   // wood info
      //   if (selected.from_stock) {
      //     woodStockInfo[pattern.length - 1] = selected.wood;
      //   }

      //   const sumSelected = sum(
      //     selected.pattern.split(",").map((item) => +item)
      //   );

      //   const selectedRemain =
      //     (selected.from_stock ? selected.wood : woodLength) - sumSelected;
      //   if (!selected.from_stock) {
      //     if (selectedRemain >= minLength) {
      //       // keep
      //       keptList.push(selectedRemain);
      //     } else {
      //       // wasted
      //       wastedList.push(selectedRemain);
      //     }
      //   }

      //   // console.log("copyNumber:", copyNumber.join(","));
      //   // console.log("============>");
      // }

      // const mergeKept = [...keptList, ...copyRemainWoodStock];

      remainInfo.push({
        size: std.size,
        qty: qty,
        stdPattern: testingList,
        pattern,
        keptList: mergeKept,
        countKeptList: mergeKept.length,
        totalKeptList: sum(mergeKept),

        wastedList: wastedList,
        countWastedList: wastedList.length,
        totalWastedList: sum(wastedList),
        woodStockInfo,
      });

      if (mergeKept.length === 0) {
        //
        if (debug)
          console.log("mergeKept is 0:", remainInfo[remainInfo.length - 1]);
        return;
      }
      if (debug) console.log(std.size, qty);
    }
  }

  // cross

  for (const [index, std] of stdList.entries()) {
    for (const [indexCorss, stdCross] of stdList.entries()) {
      // const qty = i + 1;
      if (debug) console.log("cros================:", std.size, stdCross.size);
      const cutting = [
        std.dimensionW,
        std.dimensionW,
        std.dimensionH,
        std.dimensionH,
      ];
      const cuttingCross = [
        stdCross.dimensionW,
        stdCross.dimensionW,
        stdCross.dimensionH,
        stdCross.dimensionH,
      ];
      const testingList = [...cutting, ...cuttingCross];
      const { mergeKept, wastedList, pattern, woodStockInfo } =
        findStdCombinations(
          listRemain,
          flatten(testingList),
          flatten(remainWoodStock)
        );
      // start
      // let copyNumber = cloneDeep(listRemain);
      // let copyTestingList = cloneDeep(flatten(testingList));
      // let copyRemainWoodStock = cloneDeep(flatten(remainWoodStock));

      // console.log("copyNumber:", copyNumber.length);
      // console.log("copyTestingList:", copyTestingList);

      // const keptList = [];
      // const wastedList = [];
      // const pattern = [];
      // const woodStockInfo = {};

      // while (copyTestingList.length || copyNumber.length) {
      //   const numberTest = [...copyNumber, ...flatten(copyTestingList)];
      //   // if (debug) console.log("suggest_list:", testingList.join(","));
      //   const sliced = filterForCombination(numberTest);

      //   // // ASC
      //   // const slicedFormatter = sortBy(flatten(sliced));

      //   // DESC
      //   const slicedFormatter = sortBy(flatten(sliced)).reverse();
      //   // console.log('slicedFormatter:', slicedFormatter)
      //   const result = findCombinations(
      //     slicedFormatter,
      //     testingList,
      //     copyRemainWoodStock
      //   );

      //   // split used wood
      //   const selected = result;
      //   // split remaining wood
      //   if (selected.from_stock) {
      //     console.log(
      //       "selected.from_stock:",
      //       selected.from_stock,
      //       selected.wood
      //     );
      //     const deletIndex = copyRemainWoodStock.indexOf(+selected.wood);
      //     if (deletIndex > -1) {
      //       copyRemainWoodStock.splice(deletIndex, 1);
      //       if (+selected.remain > 0) {
      //         copyRemainWoodStock.push(+selected.remain);
      //       }
      //     }
      //   }

      //   const selectedArray = selected.pattern.split(",");
      //   for (const iterator of selectedArray) {
      //     // delete remaing list
      //     let deletIndex = copyNumber.indexOf(+iterator);
      //     if (deletIndex > -1) {
      //       copyNumber.splice(deletIndex, 1);
      //       continue;
      //     }

      //     // delete testing list
      //     let deletTestingIndex = copyTestingList.indexOf(+iterator);
      //     if (deletTestingIndex > -1) {
      //       if (debug) console.log("std item:", iterator);
      //       copyTestingList.splice(deletTestingIndex, 1);
      //     }
      //   }

      //   // reduce qty
      //   // stdList[index].qty = stdList[index].qty - qty;
      //   console.log(selected.pattern);
      //   pattern.push(selected.pattern);

      //   // wood info
      //   if (selected.from_stock) {
      //     woodStockInfo[pattern.length - 1] = selected.wood;
      //   }

      //   const sumSelected = sum(
      //     selected.pattern.split(",").map((item) => +item)
      //   );
      //   // const selectedRemain = woodLength - sumSelected;
      //   const selectedRemain =
      //     (selected.from_stock ? selected.wood : woodLength) - sumSelected;
      //   if (selectedRemain >= minLength) {
      //     // keep
      //     keptList.push(selectedRemain);
      //   } else {
      //     // wasted
      //     wastedList.push(selectedRemain);
      //   }

      //   // console.log("copyNumber:", copyNumber.join(","));
      //   // console.log("============>");
      // }

      remainInfo.push({
        size: std.size,
        crossSize: stdCross.size,
        stdPattern: cutting,
        crossStdPattern: cuttingCross,
        pattern,
        // qty: qty,
        keptList: mergeKept,
        countKeptList: mergeKept.length,
        totalKeptList: sum(mergeKept),

        wastedList: wastedList,
        countWastedList: wastedList.length,
        totalWastedList: sum(wastedList),
        woodStockInfo,
      });

      if (mergeKept.length === 0) {
        // console.log("remainInfo:", remainInfo[remainInfo.length - 1]);
        console.log("mergeKept is 0:", remainInfo[remainInfo.length - 1]);
        return;
      }
      console.log(std.size, stdCross.size);
    }
  }

  // console.log("remainInfo qty:", remainInfo);

  // selected pattern
  console.log('orderKeeplingList:', orderKeeplingList)

  const orderKeeplingList = orderBy(
    remainInfo,
    ["countKeptList", "totalKeptList", "totalWastedList"],
    ["asc", "desc", "asc"]
  );
  const selectedOrder = orderKeeplingList[0];

  console.log("Selected Pattern fron Suggest:", selectedOrder);
  if (selectedOrder.crossSize) {
    console.log('====>std list')
    console.log(selectedOrder.size)
    console.log(selectedOrder.crossSize)
    console.log(selectedOrder.stdPattern.join(','))
    console.log(selectedOrder.crossStdPattern.join(','))
  }
  console.log('====>pattern')
  selectedOrder.pattern.forEach((item, index) => {
    console.log(item, ";", get(selectedOrder.woodStockInfo, index, 120));
  });
}

async function goNext(listRemain, remainWoodStock) {
  console.log('====>goNext')
  // return
  findSuggestionStd(listRemain, stdOrderList, remainWoodStock);
}
go();
