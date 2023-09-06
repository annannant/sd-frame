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
  maxBy,
} = require("lodash");
const debug = false;
const printAlgo = false;
const woodLength = 120;
const minLength = 6.5;
const ORDER_BY = 'asc' // asc
const { numbers } = require("./number");
const { stdOrderList } = require("./suggest-stock");
const { woodStock } = require("./number-wood-stock");
const { totalCutting } = require("./list-order");
console.log("woodStock:", woodStock);

function findCombinations(numbers, remainWoodStock) {
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
          sum: sum(current),
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
  // ===================== START: DELETE WITH MULTI =================
  // const selectedArray = selected.pattern.split(",");

  // const group = {};
  // for (const iterator of selectedArray) {
  //   if (!group[iterator]) group[iterator] = [];
  //   group[iterator].push(iterator);
  // }

  // // check จำนวน
  // for (const iterator of Object.keys(group)) {
  //   const found = copyNumber.filter((number) => number == iterator).length;
  //   if (found < group[iterator].length) {
  //     return {
  //       copyNumber,
  //       multiply: 1
  //     };
  //   }
  // }

  // // delete
  // if (!selected.from_stock) {
  //   console.log("", selected.pattern);
  // }

  // for (const iterator of selectedArray) {
  //   let deletIndex = copyNumber.indexOf(+iterator);
  //   if (deletIndex > -1) {
  //     copyNumber.splice(deletIndex, 1);
  //   }
  // }

  // if (selected.from_stock) {
  //   return {
  //     copyNumber,
  //     multiply: 1
  //   };
  // }

  // return removeSelectedPatternFromList(copyNumber, selected);
  // ===================== END: DELETE WITH MULTI =================

  const selectedArray = selected.pattern.split(",");
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

  return {
    copyNumber,
    multiply: 1,
  };
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

function checkPattern(copyNumber, patternList) {
  for (const val of patternList) {
    const pattern = val.pattern.split(",");
    const check = pattern.map((number) => {
      return copyNumber.indexOf(+number);
    });
    const valid = check.filter((number) => number >= 0);
    if (!valid.length) {
      return false;
    }
  }
  return true;
}

async function go(numbers, woodStock, suggestFlag = false) {
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(woodStock);

  // console.log('copyNumber:', copyNumber)
  // console.log('remainWoodStock:', remainWoodStock)

  let remainingCopyNumber = [];
  let remainingCopyWood = [];

  let keptList = [];
  let wastedList = [];
  let pattern = [];
  let zeroPattern = [];
  while (copyNumber.length) {
    // เรียง
    let ordered = sortBy(copyNumber);
    if (ORDER_BY === 'desc') {
      ordered = sortBy(copyNumber).reverse();
    }

    // find combination
    const selected = findCombinations(ordered, remainWoodStock);
    pattern.push(selected);
    if (
      selected.remaning !== 0 &&
      copyNumber.length > 0 &&
      stdOrderList.length > 0
    ) {
      //
      if (!remainingCopyNumber.length) {
        remainingCopyNumber = [...copyNumber];
      }

      if (!remainingCopyWood.length) {
        remainingCopyWood = [...remainWoodStock];
      }

      //
      if (selected.remaning >= minLength) {
        keptList.push(selected.remaning);
      } else {
        wastedList.push(selected.remaning);
      }
    } else {
      zeroPattern.push(selected);
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
    const { copyNumber: poped } = removeSelectedPatternFromList(
      copyNumber,
      selected
    );
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

  let suggestPattern;
  if (remainingCopyNumber.length && suggestFlag) {
    suggestPattern = await suggest(remainingCopyNumber, remainingCopyWood);
  }

  return {
    keptList,
    wastedList,
    kept: sum(keptList),
    wasted: sum(wastedList),
    pattern,
    zeroPattern,
    suggestPattern,
    remainWoodStock,
  };
}

const suggest = async (numbers, wood) => {
  const masterNumber = [...numbers];
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(wood);

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
  // const sortedStdOrderList = stdOrderList
  const sortedStdOrderList = orderBy(stdOrderList, 'width', 'asc')
  const maxQty = maxBy(sortedStdOrderList, "qty").qty;
  let stdList = [];
  for (let qty = 1; qty <= maxQty; qty++) {
    for (const iterator of sortedStdOrderList) {
        if (qty > iterator.qty) {
          continue
        }
        stdList.push({
          ...iterator,
          qty,
          // : index + 1,
        });
    }
  }
  console.log("stdList:", JSON.stringify(stdList));

  const list = [];

  const combinations = [[]];
  for (let i = 0; i < stdList.length; i++) {
    // if (i > 6) {
    //   continue;
    // }
    const currentCombinations = [...combinations];
    for (let j = 0; j < currentCombinations.length; j++) {
      const item = { ...stdList[i] };
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

  console.log("combinations:", combinations.length);

  for (const iterator of combinations) {
    if (!iterator.length) {
      continue;
    }

    // console.log("iterator:", iterator);

    const testList = totalCutting(false, iterator);
    const {
      keptList,
      wasted,
      pattern,
      remainWoodStock: rm,
    } = await go([...copyNumber, ...testList], remainWoodStock);

    // check pattern
    const validPattern = checkPattern(copyNumber, pattern);
    if (!validPattern) {
      continue;
    }

    const itemList = {
      keptListCount: keptList.length,
      wasted,
      pattern,
      stdList: iterator,
      remainWoodStock: rm,
    };
    // check keeping list
    // console.log("wasted:", wasted);
    // console.log("kept:", keptList.length);
    console.log("rm:", rm, "keptList:", keptList);

    // if (rm.length === 0) {
    // if (keptList.length <= 1 && rm.length === 0) {
    if ((keptList.length === 0 && rm.length === 0) || (keptList.length === 0)) {
      console.log("wasted:", wasted);
      console.log("kept:", keptList.length);
      return itemList;
    }

    list.push(itemList);
  }

  const resultList = orderBy(list, [
    "remainWoodStock",
    "keptListCount",
    "wasted",
  ]);
  console.log("resultList:", JSON.stringify(resultList));
  if (!resultList.length) {
    return undefined;
  }

  return resultList[0];
};

function printResult(allPattern, zeroPattern, suggestPattern) {
  console.log("====================");

  if (suggestPattern) {
    if (zeroPattern) {
      for (const item of zeroPattern) {
        const wood = item.from_stock ? `, :wood , ${item.wood}` : "";
        console.log(item.pattern, wood);
      }
    }

    console.log("==================== suggest ====================");
    for (const item of suggestPattern.pattern) {
      const wood = item.from_stock ? `, :wood , ${item.wood}` : "";
      console.log(item.pattern, wood);
    }
    console.log("==================== STD LIST ====================");
    for (const iterator of suggestPattern.stdList) {
      console.log("", iterator.size, ",", iterator.qty);
    }
  } else {
    if (allPattern) {
      for (const item of allPattern) {
        const wood = item.from_stock ? `, :wood , ${item.wood}` : "";
        console.log(item.pattern, wood);
      }
    }
  }
}

async function execute() {
  const { pattern, zeroPattern, suggestPattern } = await go(
    numbers,
    woodStock,
    true
  );
  printResult(pattern, zeroPattern, suggestPattern);
}

execute();
