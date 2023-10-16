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
const ORDER_BY = "desc"; // asc
const { numbers } = require("./number");
const { stdOrderList, stocks } = require("./suggest-stock");
const { woodStock } = require("./number-wood-stock");
const { totalCutting } = require("./list-order");
console.log("woodStock:", woodStock);

function findCombinations(numbers, remainWoodStock, copyStdOrderList) {
  const combinations = [[]];

  let lowest = 99999999;
  let lowestUsedWood = null;

  const remainList = [];

  const selectedCombinations = [];

  // std
  const sortedStdOrderList = [...copyStdOrderList];
  const totalStd = totalCutting(false, sortedStdOrderList);

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
          i,
          j,
          from_stock: wood !== woodLength,
          wood,
          pattern: pattern,
          sum: sum(current),
          remaning: afterUseWood,
          use_stock_first: false,
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

        if (data.from_stock && afterUseWood > 0 && afterUseWood <= minLength) {
          return {
            ...data,
            use_stock_first: true,
          };
        }

        if (afterUseWood === 0) {
console.log('afterUseWood:', afterUseWood)
          return data;
        }

        if (afterUseWood > 0) {
          const found = findPartMatchWithStd(data, totalStd, sortedStdOrderList);
          if (found) {
            return {
              ...data,
              stdPart: found.remaining,
            };
          }
          // remainList.push(data)
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
          ";",
          JSON.stringify(combinations)
        );
      }
    }
  }

  // console.log("lowestUsedWood:", lowestUsedWood);

  // console.log(' lowestUsedWood remainList:', remainList)
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

function findPartMatchWithStd(data, totalStd, sortedStdOrderList) {
  const remaining = data.remaning;
  const found = totalStd.find((item) => item == remaining);
  if (!found) {
    return undefined;
  }
  return {
    remaining,
  };
}

async function go(numbers, woodStock, suggestFlag = false, ordering = "desc") {
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(woodStock);
  let copyStdOrderList = cloneDeep(stdOrderList);

  // console.log('copyNumber:', copyNumber)
  // console.log('remainWoodStock:', remainWoodStock)

  let remainingCopyNumber = [];

  let keptList = [];
  let wastedList = [];
  let pattern = [];
  let zeroPattern = [];


  while (copyNumber.length) {
    // เรียง
    let ordered = sortBy(copyNumber);
    if (ordering === "desc") {
      ordered = sortBy(copyNumber).reverse();
    }

    // find combination
    const selected = findCombinations(ordered, remainWoodStock, copyStdOrderList);
    pattern.push(selected);
    if (
      !selected.use_stock_first &&
      selected.remaning !== 0 &&
      copyNumber.length > 0 &&
      copyStdOrderList.length > 0
    ) {

      remainingCopyNumber = [...remainingCopyNumber, ...selected.pattern.split(',').map(parseFloat)];

      //
      if (selected.remaning >= minLength) {
        keptList.push(selected.remaning);
      } else {
        wastedList.push(selected.remaning);
      }
    } else {
      zeroPattern.push(selected);
    }

    if (selected.from_stock || selected.use_stock_first) {
      const removedWood = removeSelectedWoodFromStock(
        remainWoodStock,
        selected
      );
      remainWoodStock = [...removedWood];
    }

    // pop list from copy of number'
    const { copyNumber: poped } = removeSelectedPatternFromList(
      copyNumber,
      selected
    );
    // console.log("poped:", poped.length);

    copyNumber = [...poped];
    // console.log('[...poped]:', JSON.stringify([...poped]))
  }

  // console.log('useStd:', useStd.map((item) => console.log(item.woodList.join(','))))
  let suggestPattern;
  if (remainingCopyNumber.length) {
    // console.log('=========>suggest')
    suggestPattern = await suggest(
      remainingCopyNumber,
      remainWoodStock,
      ordering
    );
  }

  return {
    keptList,
    wastedList,
    kept: sum(keptList),
    wasted: sum(wastedList),
    pattern,
    zeroPattern,
    remainWoodStock,
    suggestPattern
  };
}
const suggest = async (numbers, wood, ordering) => {
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(wood);
  let copyStdOrderList = cloneDeep(stdOrderList);

  let remainingCopyNumber = [];
  let remainingCopyWood = [];

  let keptList = [];
  let wastedList = [];
  let pattern = [];
  let zeroPattern = [];

  let useStd = []

  while (copyNumber.length) {
    // เรียง
    let ordered = sortBy(copyNumber);
    if (ordering === "desc") {
      ordered = sortBy(copyNumber).reverse();
    }

    // find combination
    const selected = findCombinations(ordered, remainWoodStock, copyStdOrderList);
    pattern.push(selected);
    if (
      !selected.use_stock_first &&
      selected.remaning !== 0 &&
      copyNumber.length > 0 &&
      copyStdOrderList.length > 0
    ) {
      // TO DO: this
      if (selected.stdPart) {
        for (const itemStd of copyStdOrderList) {
          if (
            [itemStd.dimensionW, itemStd.dimensionH].includes(selected.stdPart)
          ) {
            copyNumber = [...copyNumber, ...itemStd.woodList];
            itemStd.qty--;
            useStd.push(itemStd);
          }
        }
      } else {
        pattern.push(selected);
      }

      // //
      // if (selected.remaning >= minLength) {
      //   keptList.push(selected.remaning);
      // } else {
      //   wastedList.push(selected.remaning);
      // }
    } else {
      pattern.push(selected);
      zeroPattern.push(selected);
    }

    if (selected.from_stock || selected.use_stock_first) {
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
    copyNumber = [...poped];
  }

  return {
    stdList: useStd,
    pattern,
  }
}

const suggestV2 = async (numbers, wood) => {
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(wood);
  const res = await go(copyNumber, remainWoodStock, false, 'desc', true) 
}

function printResult(allPattern, zeroPattern, suggestPattern) {
  console.log("==================== PRINT RESULT");
  // console.log('suggestPattern:', suggestPattern)

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
