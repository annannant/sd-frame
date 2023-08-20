// algo final
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
  pick,
  sumBy,
  size,
  chain,
} = require("lodash");
const debug = false;
const printAlgo = false;
const woodLength = 120;
const minLength = 6.5;

const { numbers } = require("./number");
const { stdOrderList } = require("./suggest-stock");
const { woodStock } = require("./number-wood-stock");
const { totalCutting } = require("./list-order");
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

    // // ASC
    // const slicedFormatter = sortBy(flatten(sliced));

    // DESC
    const slicedFormatter = sortBy(flatten(sliced));
    // console.log('slicedFormatter:', slicedFormatter)
    const result = findCombinationsTest(
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

function findCombinationsTest(numbers, stdList, remainWoodStock) {
  // const combinations = [[]];
  // let no = 1;
  // let lowest = 9999999;
  // let zeroList = {};
  // const selectedCombinations = [];
  // for (let i = 0; i < numbers.length; i++) {
  //   const currentCombinations = [...uniqueArray(combinations)]; // Create a copy of existing combinations
  //   // const currentCombinations = [...combinations]; // Create a copy of existing combinations
  //   for (let j = 0; j < currentCombinations.length; j++) {
  //     // const current = [...currentCombinations[j], numbers[i]]
  //     const current = sortBy([...currentCombinations[j], numbers[i]]).reverse();
  //     const pattern = current.join(",");
  //     const sumValue = parseFloat(sum(current).toFixed(2));
  //     if (sumValue > woodLength) {
  //       continue;
  //     }
  //     const woods = [...remainWoodStock, woodLength]
  //       .map((wood) => {
  //         const remainWood = parseFloat(wood - sumValue);
  //         return {
  //           from_stock: wood !== woodLength,
  //           wood,
  //           remain: remainWood,
  //         };
  //       })
  //       .filter((val) => val.remain >= 0);
  //     // const remain = parseFloat((woodLength - sumValue));
  //     const findZero = sortBy(woods).find((val) => val.remain === 0);
  //     // const remain = parseFloat((woodLength - sumValue));
  //     if (findZero?.remain === 0) {
  //       return {
  //         // wood: wood,
  //         // remain: remain,
  //         ...findZero,
  //         pattern: pattern,
  //       };
  //     }
  //     const findMin = orderBy(woods, "remain", "asc")[0];
  //     if (findMin?.remain < lowest) {
  //       lowest = findMin?.remain;
  //       selectedCombinations.push({
  //         // suggest_list: suggestList,
  //         ...findMin,
  //         pattern: pattern,
  //       });
  //     }
  //     combinations.push(current);
  //   }
  // }
  // const lowestRemain = orderBy(selectedCombinations, ["remain"], ["asc"])[0];
  // if (debug) console.log("lowest_remain:", lowestRemain);
  // // console.log('zeroList', Object.keys(zeroList).length)
  // // return uniqueArray(combinations);
  // // console.log('combinations:', combinations)
  // return lowestRemain;
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
      //   const slicedFormatter = sortBy(flatten(sliced));
      //   // console.log('slicedFormatter:', slicedFormatter)
      //   const result = findCombinationsTest(
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
      //   const slicedFormatter = sortBy(flatten(sliced));
      //   // console.log('slicedFormatter:', slicedFormatter)
      //   const result = findCombinationsTest(
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
      console.log("xxxxx", std.size, stdCross.size);
    }
  }

  console.log("remainInfo qty:", remainInfo);

  // selected pattern
  const orderKeeplingList = orderBy(
    remainInfo,
    ["countKeptList", "totalKeptList", "totalWastedList"],
    ["asc", "desc", "asc"]
  );
  console.log("Selected Pattern fron Suggest:", orderKeeplingList[0]);
  orderKeeplingList[0].pattern.forEach((item, index) => {
    console.log(item, ";", get(orderKeeplingList[0].woodStockInfo, index, 120));
  });
}

async function goNext(listRemain, remainWoodStock) {
  // console.log('====>goNext')
  // return
  findSuggestionStd(listRemain, stdOrderList, remainWoodStock);
}
// go();

function findCombinations(numbers, stdList, remainWoodStock) {
  const combinations = [[]];

  let lowest = 99999999;
  let lowestUsedWood = null;

  const selectedCombinations = [];

  for (let i = 0; i < numbers.length; i++) {
    if (printAlgo) {
      console.log("----", i + 1, ";", numbers[i]);
    }

    const currentCombinations = [...combinations];
    for (let j = 0; j < currentCombinations.length; j++) {
      const current = [...currentCombinations[j], numbers[i]];

      // chec duplicate pattern
      const found = currentCombinations
        .map((item) => item.join("|"))
        .find((item) => item === current.join("|"));
      if (found) {
        if (printAlgo) {
          console.log(
            j + 1,
            ";",
            currentCombinations[j],
            ";",
            current,
            "** dup"
          );
        }
        continue;
      }

      // if more than 120
      const sumvalue = sum(current);
      if (sumvalue > woodLength) {
        if (printAlgo) {
          console.log(
            j + 1,
            ";",
            currentCombinations[j],
            ";",
            current,
            "** > 120"
          );
        }

        continue;
      }

      // check remaining stock
      const pattern = current.join(",");
      const woods = [...remainWoodStock, woodLength];
      if (printAlgo) {
        console.log(j + 1, ";", currentCombinations[j], ";", current);
      }
      // console.log('-----------------> wood')

      // START - WOOD
      for (let r = 0; r < woods.length; r++) {
        const wood = woods[r];
        const afterUseWood = parseFloat(wood - sumvalue);
        const data = {
          from_stock: wood !== woodLength,
          wood,
          pattern: pattern,
          remaning: afterUseWood,
        };
        if (printAlgo) {
          console.log(
            ";",
            ";",
            ";",
            r + 1,
            ";",
            wood,
            ";",
            sumvalue,
            ";",
            `${wood}-${sumvalue}`,
            ";",
            afterUseWood
          );
        }

        if (afterUseWood === 0) {
          return data;
        }

        if (afterUseWood > 0 && afterUseWood < lowest) {
          lowest = afterUseWood;
          lowestUsedWood = data;
        }
      }
      // END - WOOD

      //
      // console.log("remainWoodStock:", remainWoodStock);
      // console.log("sumvalue:", current, sumvalue);
      // console.log('current:', current)
      // console.log('combinations:', combinations)
      combinations.push(current);
      if (printAlgo) {
        console.log(
          ";",
          ";",
          ";",
          ";",
          ";",
          ";",
          ";",
          ";",
          JSON.stringify(combinations)
        );
      }
    }
  }

  // console.log("lowestUsedWood:", lowestUsedWood);
  return lowestUsedWood;
  //   console.log('lowestUsedWood:', lowestUsedWood)
  // console.log('selectedCombinations:', selectedCombinations)
}

function removeSelectedPatternFromList(copyNumber, selected) {
  // console.log('selected:', )
  const selectedArray = selected.pattern.split(",");

  const group = {};
  for (const iterator of selectedArray) {
    if (!group[iterator]) group[iterator] = [];
    group[iterator].push(iterator);
  }

  // check จำนวน
  for (const iterator of Object.keys(group)) {
    const found = copyNumber.filter((number) => number == iterator).length;
    if (found < group[iterator].length) {
      return copyNumber;
    }
  }

  // delete
  if (!selected.from_stock) {
    console.log("", selected.pattern);
  }

  for (const iterator of selectedArray) {
    let deletIndex = copyNumber.indexOf(+iterator);
    if (deletIndex > -1) {
      copyNumber.splice(deletIndex, 1);
    }
  }

  if (selected.from_stock) {
    return copyNumber;
  }

  return removeSelectedPatternFromList(copyNumber, selected);
}

function removeSelectedWoodFromStock(remainWoodStock, selected) {
  console.log("", selected.pattern, ",:wood,", selected.wood);
  const deletIndex = remainWoodStock.indexOf(+selected.wood);
  if (deletIndex > -1) {
    remainWoodStock.splice(deletIndex, 1);
    if (+selected.remain > 0) {
      remainWoodStock.push(+selected.remain);
    }
  }
  return remainWoodStock;
}

async function go(numbers, woodStock) {
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(woodStock);

  // console.log('copyNumber:', copyNumber)
  // console.log('remainWoodStock:', remainWoodStock)

  let remainingCopyNumber = [];
  let remainingCopyWood = [];

  let keptList = [];
  let wastedList = [];
  while (copyNumber.length) {
    // เรียง
    const ordered = sortBy(copyNumber).reverse();

    // find combination
    const selected = findCombinations(ordered, [], remainWoodStock);
    if (
      selected.remaning !== 0 &&
      copyNumber.length > 0 &&
      stdOrderList.length > 0
    ) {
      if (!remainingCopyNumber.length) {
        remainingCopyNumber = [...copyNumber];
      }
      if (!remainingCopyWood.length) {
        remainingCopyWood = [...remainWoodStock];
      }

      if (selected.remaning >= minLength) {
        keptList.push(selected.remaning);
      } else {
        wastedList.push(selected.remaning);
      }
    }

    if (selected.from_stock) {
      // console.log("selected:", selected);
      const removedWood = removeSelectedWoodFromStock(
        remainWoodStock,
        selected
      );
      remainWoodStock = [...removedWood];
    }

    // pop list from copy of number
    const poped = removeSelectedPatternFromList(copyNumber, selected);
    // console.log("poped:", poped.length);

    // copyNumber = [];
    // copyNumber.pop();
    copyNumber = [...poped];
    // console.log('[...poped]:', JSON.stringify([...poped]))
  }

  // START - test standard
  // console.log('keptList:', keptList)
  // console.log('wastedList:', wastedList)
  // console.log('xx copyNumber:', remainingCopyNumber)
  // console.log('xx remainingCopyWood:', remainingCopyWood)

  return {
    keptList,
    wastedList,
    kept: sum(keptList),
    wasted: sum(wastedList),
  };
}

const suggest = async () => {
  const mockWood = [12, 12, 10];
  // const nu
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(mockWood);

  // // suggest by qty
  // for (const iterator of stdOrderList) {
  //   // follow qty
  //   for (let index = 0; index < iterator.qty; index++) {
  //     const count = index + 1
  //     console.log('count:', count)
  //     // console.log('iterator:', iterator)
  //     const testList = totalCutting(false, [{
  //       ...iterator,
  //       qty: count
  //     }])

  //     const { keptList, wasted} = await go([...copyNumber, ...testList], remainWoodStock)
  //     console.log('wasted:', wasted)
  //     console.log('kept:', keptList.length)
  //   }
  // }

  // // follow cross
  // const cross = [];
  // for (const iterator of stdOrderList) {
  //   cross.push({ ...iterator, qty: 1 });

  //   const testList = totalCutting(false, cross);
  //   const { keptList, wasted } = await go(
  //     [...copyNumber, ...testList],
  //     remainWoodStock
  //   );

  //   console.log('wasted:', wasted)
  //   console.log('kept:', keptList.length)
  // }

  // console.log('stdOrderList:', stdOrderList)

  // log
  // pattern
  const stdList = [];
  for (const iterator of stdOrderList) {
    for (let index = 0; index < iterator.qty; index++) {
      // console.log(iterator.size, ":", index + 1,)
      stdList.push({
        ...iterator,
        qty: index + 1,
      });
    }
  }

  console.log("stdList:", stdList.length);

  const combinations = [[]];
  for (let i = 0; i < stdList.length; i++) {
    if (i > 6) {
      continue;
    }
    const currentCombinations = [...combinations];
    for (let j = 0; j < currentCombinations.length; j++) {
      const item = {...stdList[i]};
      // const item = pick(stdList[i], ["size", "qty"]);

      // merge
      const found = currentCombinations[j].filter(
        (val) => val.size === item.size
      );
      if (found.length) {
        item.qty = sumBy(found, "qty");
      }

      // duplicate
      const duplicate = currentCombinations[j].find(
        (val) => val.size === item.size && val.qty === item.qty
      );
      if (duplicate) {
        continue;
      }

      const current = [...currentCombinations[j], item];
      combinations.push(current);
    }
  }

  console.log("combinations:", combinations);

  for (const iterator of combinations) {
    if (!iterator.length) {
      continue;
    }

    console.log("iterator:", iterator);
    const testList = totalCutting(false, iterator);
    const { keptList, wasted } = await go(
      [...copyNumber, ...testList],
      remainWoodStock
    );

    // check pattern
    // check keeping list
  
    console.log("wasted:", wasted);
    console.log("kept:", keptList.length);
    if (keptList.length === 0) {
      return
    }
  }
};

async function execute() {
  await suggest();
  // await go(numbers, woodStock);
}

execute();
