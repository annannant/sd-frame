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

const findOriginalNumbers = (numbers, tryPatternList) => {
  let result = []
  let tryList = [...tryPatternList]
  for (const number of numbers) {
    const index =  tryList.indexOf(number)
    if (index < 0) {
      result.push(number)
    } else {
      tryList.splice(index, 1)
    }
  }
  return result
}

const checkPatternHasNumbers = (numbers, pattern) => {
  for (const item of pattern) {
    if (numbers.indexOf(item) >= 0) {
      return true;
    }
  }
  return false;
};

function findCombinations(numbers, remainWoodStock, copyStdOrderList, tryPatternList = [], sumWoodRemaingSuggest = 0, sumWoodRemaingNonzero = 0) {
// console.log('sumWoodRemaingNonzero:', sumWoodRemaingNonzero)
// console.log('sumWoodRemaingSuggest:', sumWoodRemaingSuggest)
  const combinations = [[]];

  let lowest = 99999999;
  let lowestUsedWood = null;

  let lowestStd = 99999999;
  let lowestUsedWoodStd = null;

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

      // // if patter is std all
      // if (copyStdOrderList.length) {
      //   const hasOrginal = checkPatternHasNumbers(originalNumbers, current)
      //   if (!hasOrginal) {
      //     continue
      //   }
      // }

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
          return data;
        }

        if (afterUseWood > 0 && copyStdOrderList.length) {
          // if (afterUseWood > 0 && copyStdOrderList.length && afterUseWood <= maxWoodItemStd &&  (maxWoodItemStd - afterUseWood <= minLength)) {
          const find = compareWithStd(data, copyStdOrderList);

          const ok = sumWoodRemaingSuggest + find?.after_cut <= sumWoodRemaingNonzero
          if (find && ok) {
            const newPattern = [...find.pattern, ...data.pattern.split(',').map(val => +val)]
            const newData = {
              ...data,
              std: {...find},
              original_pattern: data.pattern,
              pattern: newPattern.join(','),
              sum: sum(newPattern),
              remaning: find.after_cut,
              remain_pattern: find.remain_pattern,
              use_std_wood: true
            }
            if (find?.after_cut === 0) {
              return {
                use_std_wood: true,
                ...newData
              };
            }
            // if (find?.after_cut < lowestStd) {
            //   lowestStd = find?.after_cut;
            //   console.log('newData:', newData)
            //   lowestUsedWoodStd = newData;
            // }
            if (find?.after_cut < lowest) {
              lowest = find?.after_cut;
              lowestUsedWood = newData;
            }
          }
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
        // console.log(
        //   ";",
        //   ";",
        //   ";",
        //   ";",
        //   ";",
        //   ";",
        //   ";",
        //   ";",
        //   ";",
        //   JSON.stringify(combinations)
        // );
      }
    }
  }

  // console.log("lowestUsedWood:", lowestUsedWood);

  // console.log(' lowestUsedWood remainList:', remainList)
  // console.log('lowestUsedWoodStd:', lowestUsedWoodStd)

  // if (lowestUsedWoodStd) {
  //   return {
  //     use_std_wood: true,
  //     ...lowestUsedWoodStd,
  //   };
  // }

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
 
  let selectedArray = selected.pattern.split(",");
  if (selected?.use_std_wood) {
    selectedArray = selected.original_pattern.split(",");
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

  return {
    copyNumber: [...copyNumber, ...selected?.remain_pattern ?? []],
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

function getCombination(list) {
  const combinations = [[]];
  for (let i = 0; i < list.length; i++) {
    const currentCombinations = [...combinations];
    for (let j = 0; j < currentCombinations.length; j++) {
      const current = [...currentCombinations[j], list[i]];
      // check duplicate pattern
      const found = currentCombinations
        .map((item) => item.join("|"))
        .find((item) => item === current.join("|"));
      if (found) {
        continue;
      }
      const sumvalue = sum(current);
      if (sumvalue > woodLength) {
        continue;
      }

      const pattern = current.join(",");
      combinations.push(current);
    }
  }

  return combinations;
}

function getRemainingPattern(pattern, woodList) {
  const woodListCopy = [...woodList];
  for (const iterator of pattern) {
    const index = woodListCopy.indexOf(+iterator);
    if (index >= 0) {
      woodListCopy.splice(index, 1);
    }
  }

  return woodListCopy;
}


function compareWithStd(data, copyStdOrderList) {
// console.log('============ strt compare with std ============')
  const remaining = data.remaning;
  const minValue = 999999;
  let selected = undefined;
  for (const std of copyStdOrderList) {
    const combinationList = getCombination(std.woodList);
    std.combinations = combinationList;
    for (const pattern of combinationList) {
      const total = sum(pattern);
      if (total == 0) {
        continue;
      }
     
      const remain = remaining - total;
      // console.log(
      //   pattern,
      //   ";",
      //   total,
      //   ";",
      //   remain,
      //   ";",
      //   remain < 0 || remain >= minLength ? "" : "** selected"
      // );

      if (remain < 0 || remain >= minLength) {
        continue;
      }

      // if (remain != 0) {
      //   continue;
      // }
      if (remain < minValue) {
        selected = {
          ...std,
          after_cut: remain,
          main_wood: remaining,
          pattern,
          remain_pattern: getRemainingPattern(pattern, std.woodList),
        };
      }
    }
  }

  // console.log('============ end compare with std ============')
  return selected;

  // console.log('selected:', selected)

  //   const sdtList = copyStdOrderList.map((val) => {
  //     const combinations = getCombination(val.woodList)
  //     return {
  //       ...val,
  //       combinations
  //     };
  //   });

  //   const filter = sdtList.reduce((preve, std) => {
  //     let remaingList = []
  //     for (const pattern of std.combinations) {
  //       const total = sum(pattern)
  //       if (total == 0) {
  //         continue
  //       }

  //       const remain = total - remaining;
  //       // console.log(pattern, ';', total, ';', remain)
  //       if (remain < 0 || remain >= minLength) {
  //         continue
  //       }

  //       remaingList.push({
  //         after_cut: remain,
  //         // val: val,
  //         main_wood: remaining,
  //         pattern,
  //       })
  //     }

  //     const ordered = orderBy(remaingList, "after_cut", "asc");
  //     if (!ordered[0]) {
  //       return preve
  //     }
  //     return [
  //       ...preve,
  //       {
  //         ...std,
  //         ...ordered[0],
  //       }
  //     ]
  //   }, [])

  //   const selected2 = orderBy(filter, 'after_cut', 'asc')
  //   return selected2[0]

  // const stdList = totalCutting(false, copyStdOrderList);
  // const filltered = uniq(stdList).reduce((prev, val) => {
  //   const remain = val - remaining;
  //   if (remain < 0 || remain >= minLength) {
  //     return prev;
  //   }
  //   return [
  //     ...prev,
  //     {
  //       after_cut: remain,
  //       val: val,
  //       wood: remaining,
  //     },
  //   ];
  // }, []);
  // const ordered = orderBy(filltered, "after_cut", "asc");
  // return ordered[0];
}

async function go(numbers, woodStock, ordering = "desc") {
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(woodStock);
  let copyStdOrderList = cloneDeep(stdOrderList);

  // console.log('copyNumber:', copyNumber)
  // console.log('remainWoodStock:', remainWoodStock)

  let remainingCopyNumber = [];
  let remainingCopyWood = [];

  let keptList = [];
  let wastedList = [];
  let pattern = [];
  let nonZeroPattern = [];
  let zeroPattern = [];
  while (copyNumber.length) {
    // เรียง
    let ordered = sortBy(copyNumber);
    if (ordering === "desc") {
      ordered = sortBy(copyNumber).reverse();
    }

    // find combination
    const selected = findCombinations(
      ordered,
      remainWoodStock,
      // copyStdOrderList
      [],
      0
    );
    // copyNumber = []
    pattern.push(selected);
    if (
      !selected.use_stock_first &&
      selected.remaning !== 0 &&
      copyNumber.length > 0 &&
      stdOrderList.length > 0
    ) {
      //
      if (!remainingCopyNumber.length) {
        remainingCopyNumber = [...copyNumber];
      }

      // if (!remainingCopyWood.length) {
      //   remainingCopyWood = [...remainWoodStock];
      // }

      //
      if (selected.remaning >= minLength) {
        keptList.push(selected.remaning);
      } else {
        wastedList.push(selected.remaning);
      }
      nonZeroPattern.push(selected);
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

    // pop list from copy of number
    const { copyNumber: poped } = removeSelectedPatternFromList(
      copyNumber,
      selected
    );
    // console.log("poped:", poped.length);

    copyNumber = [...poped];
    // console.log('[...poped]:', JSON.stringify([...poped]))
  }

  // START - test standard
  // console.log('keptList:', keptList)
  // console.log('wastedList:', wastedList)
  // console.log('xx copyNumber:', remainingCopyNumber)
  // console.log('xx remainingCopyWood:', remainingCopyWood)

  // test
  // remainingCopyNumber = [...copyNumber]

  let suggestPattern;
  if (remainingCopyNumber.length) {
    console.log("==================== start suggest ====================");
    // console.log(
    //   "sum remainingCopyNumber:",
    //   sum(remainingCopyNumber) + sumBy(zeroPattern, "sum")
    // );
    const sumWoodRemaingNonzero = sumBy(nonZeroPattern.filter((item) => item.remaning < minLength), 'remaning');

    console.log('remainingCopyNumber:', remainingCopyNumber)
    console.log("remainWoodStock:", remainWoodStock);
    suggestPattern = await suggestV2(remainingCopyNumber, remainWoodStock, sumWoodRemaingNonzero);

    const sumWoodRemaingSuggest = sumBy(suggestPattern.pattern.filter((item) => item.remaning < minLength), 'remaning');
    console.log('sumWoodRemaingSuggest:', sumWoodRemaingSuggest)
    console.log('sumWoodRemaingNonzero:', sumWoodRemaingNonzero)

    if (sumWoodRemaingSuggest > sumWoodRemaingNonzero) {
      suggestPattern = null
    }
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

const findUseStd = (copyStdOrderList, data) => {
  let find = null;
  for (const item of copyStdOrderList) {
    const found = item.size == data.std.size;
    if (!found || find) {
      continue;
    }
    item.qty -= 1;
    find = { ...item };
  }

  return {
    newCopyStdOrderList: [...copyStdOrderList],
    // try_pattern: find.woodList,
    stdSelected: {
      ...find,
      qty: 1,
    },
    // copy_std_order_list: copyStdOrderList,
  };
};



const suggestV2 = async (numbers, woodStock, sumWoodRemaingNonzero, ordering = "desc") => {
  let copyNumber = cloneDeep(numbers);
  let remainWoodStock = cloneDeep(woodStock);
  let copyStdOrderList = cloneDeep(stdOrderList);

  // console.log('remainWoodStock:', remainWoodStock)
  // console.log('copyStdOrderList:', )

  let keptList = [];
  let wastedList = [];
  let pattern = [];
  let zeroPattern = [];
  let stdSelectedList = [];

  let tryPatternList = []

  let originalNumbers = cloneDeep(copyNumber)

  let sumWoodRemaingSuggest = 0
  console.log('sumWoodRemaingNonzero:', sumWoodRemaingNonzero)

  while (copyNumber.length) {
    // เรียง
    let ordered = sortBy(copyNumber);
    if (ordering === "desc") {
      ordered = sortBy(copyNumber).reverse();
    }
    
    const tryCopyStdOrderList = copyStdOrderList.filter((val) => val.qty > 0)

    // // compare orginal vs std
    const selected = findCombinations(
      ordered,
      remainWoodStock,
      tryCopyStdOrderList,
      tryPatternList,
      sumWoodRemaingSuggest,
      sumWoodRemaingNonzero
    );
    pattern.push(selected);
    // 
    sumWoodRemaingSuggest += selected.remaning ?? 0
// console.log('xxsumWoodRemaingSuggest:', sumWoodRemaingSuggest)
    if (selected?.use_std_wood) {
      // remove qty from std
     const {
      newCopyStdOrderList,
      stdSelected
      } = findUseStd(copyStdOrderList, selected);
      copyStdOrderList = [...newCopyStdOrderList];


      // if remaing pattern push to number

      // console.log('selected:', selected)
      // // add list of std to copy number
      // // remove from std list
      // const {
      //   try_pattern: tryPattern,
      //   copy_std_order_list: newStd,
      //   std_selected: stdSelected,
      // } = findUseStd(copyStdOrderList, selected?.std);

      // // pattern
      // // console.log('selected:', selected)

      // tryPatternList = [...tryPatternList, ...tryPattern]
      // copyNumber = [...copyNumber, ...tryPattern];
      // copyStdOrderList = [...newStd];
      stdSelectedList.push(stdSelected);
      // continue;
    }

    if (
      !selected.use_stock_first &&
      selected.remaning !== 0 &&
      copyNumber.length > 0 &&
      // stdOrderList.length > 0
      copyStdOrderList.length > 0
    ) {
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

    // pop list from copy of number
    const { copyNumber: poped } = removeSelectedPatternFromList(
      copyNumber,
      selected
    );
    // console.log("poped:", poped.length);

    // if (selected?.use_std_wood && selected.remain_pattern.length) {
    //   copyNumber = [...selected.remain_pattern]
    // }

    copyNumber = [...poped];
  }

  return {
    pattern,
    stdList: stdSelectedList,
  };
};

// const suggest = async (numbers, wood) => {
//   const masterNumber = [...numbers];
//   let copyNumber = cloneDeep(numbers);
//   let remainWoodStock = cloneDeep(wood);

//   // // suggest by qty
//   // for (const iterator of stdOrderList) {
//   //   // follow qty
//   //   for (let index = 0; index < iterator.qty; index++) {
//   //     const count = index + 1
//   //     console.log('count:', count)
//   //     // console.log('iterator:', iterator)
//   //     const testList = totalCutting(false, [{
//   //       ...iterator,
//   //       qty: count
//   //     }])

//   //     const { keptList, wasted} = await go([...copyNumber, ...testList], remainWoodStock)
//   //     console.log('wasted:', wasted)
//   //     console.log('kept:', keptList.length)
//   //   }
//   // }

//   // // follow cross
//   // const cross = [];
//   // for (const iterator of stdOrderList) {
//   //   cross.push({ ...iterator, qty: 1 });

//   //   const testList = totalCutting(false, cross);
//   //   const { keptList, wasted } = await go(
//   //     [...copyNumber, ...testList],
//   //     remainWoodStock
//   //   );

//   //   console.log('wasted:', wasted)
//   //   console.log('kept:', keptList.length)
//   // }

//   // console.log('stdOrderList:', stdOrderList)

//   // log
//   // pattern
//   // const sortedStdOrderList = stdOrderList
//   const sortedStdOrderList = orderBy(stdOrderList, 'width', 'asc')
//   const maxQty = maxBy(sortedStdOrderList, "qty").qty;
//   let stdList = [];
//   for (let qty = 1; qty <= maxQty; qty++) {
//     for (const iterator of sortedStdOrderList) {
//         if (qty > iterator.qty) {
//           continue
//         }
//         stdList.push({
//           ...iterator,
//           qty,
//           // : index + 1,
//         });
//     }
//   }
//   console.log("stdList:", JSON.stringify(stdList));

//   const list = [];

//   const combinations = [[]];
//   for (let i = 0; i < stdList.length; i++) {
//     // if (i > 6) {
//     //   continue;
//     // }
//     const currentCombinations = [...combinations];
//     for (let j = 0; j < currentCombinations.length; j++) {
//       const item = { ...stdList[i] };
//       // const item = pick(stdList[i], ["size", "qty"]);

//       // merge
//       const found = currentCombinations[j].filter(
//         (val) => val.size === item.size
//       );
//       if (found.length) {
//         item.qty = sumBy(found, "qty");
//       }

//       // duplicate
//       const duplicate = currentCombinations[j].find(
//         (val) => val.size === item.size && val.qty === item.qty
//       );
//       if (duplicate) {
//         continue;
//       }

//       const current = [...currentCombinations[j], item];
//       combinations.push(current);
//     }
//   }

//   // console.log("combinations:", JSON.stringify(combinations));
//   // const testcom = [[
//   //   {
//   //     "size": "8x10",
//   //     "woodWidth": 1,
//   //     "qty": 1,
//   //     "dimensionW": 10.5,
//   //     "dimensionH": 12.5,
//   //     "totalLength": 46,
//   //     "orderNo": 1,
//   //     "width": 8,
//   //     "height": 10,
//   //     "set": 1,
//   //     "cuttingName": "h1",
//   //     "cutting": 12.5,
//   //     "key": "24a5cbe7-a434-475a-a491-a211b00725bc"
//   //   },
//   //   {
//   //     "size": "6x8",
//   //     "woodWidth": 1,
//   //     "qty": 3,
//   //     "dimensionW": 8.5,
//   //     "dimensionH": 10.5,
//   //     "totalLength": 38,
//   //     "orderNo": 1,
//   //     "width": 6,
//   //     "height": 8,
//   //     "set": 1,
//   //     "cuttingName": "h1",
//   //     "cutting": 10.5,
//   //     "key": "50145f8b-400e-45a6-bc0e-7d41555e37e2"
//   //   }
//   // ]]

//   for (const iterator of combinations) {
//   // for (const iterator of testcom) {
//     if (!iterator.length) {
//       continue;
//     }

//     // console.log("iterator:", iterator);

//     const testList = totalCutting(false, iterator);
//     const {
//       keptList,
//       wasted,
//       pattern,
//       remainWoodStock: rm,
//     } = await go([...copyNumber, ...testList], remainWoodStock);

//     // check pattern
//     const validPattern = checkPattern(copyNumber, pattern);
//     if (!validPattern) {
//       continue;
//     }

//     const itemList = {
//       keptListCount: keptList.length,
//       wasted,
//       pattern,
//       stdList: iterator,
//       remainWoodStock: rm,
//     };
//     // check keeping list
//     // console.log("wasted:", wasted);
//     // console.log("kept:", keptList.length);

//     // if (rm.length === 0) {
//     // if (keptList.length <= 1 && rm.length === 0) {
//     if ((keptList.length === 0 && rm.length === 0) || (keptList.length === 0)) {
//       console.log("wasted:", wasted);
//       console.log("kept:", keptList.length);
//       return itemList;
//     }

//     list.push(itemList);
//   }

//   const resultList = orderBy(list, [
//     "remainWoodStock",
//     "keptListCount",
//     "wasted",
//   ]);
//   if (!resultList.length) {
//     return undefined;
//   }

//   return resultList[0];
// };

function printResult(allPattern, zeroPattern, suggestPattern) {
  console.log("==================== result ====================");

  if (suggestPattern) {
    let sumStd = 0
    let sumZero = 0
    let sumSuggest = 0

    if (zeroPattern) {
      for (const item of zeroPattern) {
        const wood = item.from_stock ? `, :wood , ${item.wood}` : "";
        console.log(item.pattern, wood);
        sumZero += sum(item.pattern.split(',').map(val => +val))
      }
    }

    console.log("==================== suggest ====================");
    for (const item of suggestPattern.pattern) {
      const wood = item.from_stock ? `, :wood , ${item.wood}` : "";
      console.log(item.pattern, wood);
      sumSuggest += sum(item.pattern.split(',').map(val => +val))
    }
    console.log("==================== STD LIST ====================");
    for (const iterator of suggestPattern.stdList) {
      sumStd += sum(iterator.woodList)
      console.log(
        "",
        iterator.size,
        ",",
        iterator.qty,
        ",",
        iterator.woodList,
        ",",
        sum(iterator.woodList)
      );
    }

    console.log('sum: ', sumZero + sumSuggest - sumStd)
    console.log('sumStd:', sumStd)
    console.log('sumSuggest:', sumSuggest)
    console.log('sumZero:', sumZero)
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
    "desc"
  );
  printResult(pattern, zeroPattern, suggestPattern);
}

execute();
