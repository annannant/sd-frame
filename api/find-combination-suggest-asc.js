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
} = require("lodash");
const debug = false;
const woodLength = 120;
const minLength = 6.5;

const { numbers } = require("./number");
const { stdOrderList } = require("./suggest-stock");

function intersect(patternList, numbers) {
  const sortedNumbers = sortBy(numbers);
  return sortBy(patternList).filter((val) => sortedNumbers.includes(val));
}

const uniqueArray = (list) => {
  return Array.from(new Set(list.map(JSON.stringify)), JSON.parse);
};

function findCombinations(numbers, stdList) {
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

      const remain = parseFloat(woodLength - sumValue);
      if (remain === 0) {
        // check pattern ว่ามี list ของ order หรือไม่ (filter out เฉพาะ list ที่มีแค่ suggest)
        // console.log('current:', current)
        return {
          remain: remain,
          pattern: pattern,
        };
      }

      if (remain < lowest) {
        // lowest = remain;
        selectedCombinations.push({
          // suggest_list: suggestList,
          remain: remain,
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
  let copyNumber = cloneDeep(numbers);
  let listHasRemain = [];

  while (copyNumber.length) {
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

      const result = findCombinations(slicedFormatter, list);
      // console.log('result:', result.join(','))
      lowestRemainList.push(result);
      if (debug)
        console.log("======================= end =======================");
    }

    // console.log('lowestRemainList:', lowestRemainList)
    const selected = orderBy(lowestRemainList, "remain", "asc")[0];
    if (selected.remain > 0) {
      listHasRemain = cloneDeep(copyNumber);
      copyNumber = [];
      continue;
    }

    // console.log('selected:', selected.remain)
    const selectedArray = selected.pattern.split(",");
    for (const iterator of selectedArray) {
      let deletIndex = copyNumber.indexOf(+iterator);
      if (deletIndex > -1) {
        copyNumber.splice(deletIndex, 1);
      }
    }
    console.log(selected.pattern);
  }

  if (listHasRemain.length > 0) {
    goNext(listHasRemain);
  }
}

async function findSuggestionStd(listRemain, stdOrderList) {
  console.log("====>findSuggestionStd");
  const stdList = orderBy(stdOrderList, ["height", "width"], ["asc", "asc"]);

  let noneZeroRemain = [];
  // ตามจำนวน

  const remainInfo = [];

  // qty
  for (const [index, std] of stdList.entries()) {
    for (let i = 0; i < std.qty; i++) {
      const qty = i + 1;
      console.log("qty================:", std.size, qty);
      const cutting = [
        std.dimensionW,
        std.dimensionW,
        std.dimensionH,
        std.dimensionH,
      ];
      const testingList = Array.from({ length: qty }, (val) => cutting);

      let copyNumber = cloneDeep(listRemain);
      let copyTestingList = cloneDeep(flatten(testingList));

      console.log("copyNumber:", copyNumber.length);
      console.log("copyTestingList:", copyTestingList);

      const keepList = [];
      const wastedList = [];
      const pattern = [];
      
      while (copyTestingList.length || copyNumber.length) {
        const numberTest = [...copyNumber, ...flatten(copyTestingList)];
        // if (debug) console.log("suggest_list:", testingList.join(","));
        const sliced = filterForCombination(numberTest);

        // ASC
        const slicedFormatter = sortBy(flatten(sliced));

        // // DESC
        // const slicedFormatter = sortBy(flatten(sliced)).reverse();
        // console.log('slicedFormatter:', slicedFormatter)
        const result = findCombinations(slicedFormatter, testingList);
       
        // split used wood
        const selected = result;
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
            console.log("std item:", iterator);
            copyTestingList.splice(deletTestingIndex, 1);
          }
        }

        // reduce qty
        // stdList[index].qty = stdList[index].qty - qty;
        console.log(selected.pattern);
        pattern.push(selected.pattern)
        const sumSelected = sum(
          selected.pattern.split(",").map((item) => +item)
        );
        const selectedRemain = woodLength - sumSelected;
        if (selectedRemain >= minLength) {
          // keep
          keepList.push(selectedRemain);
        } else {
          // wasted
          wastedList.push(selectedRemain);
        }

        // console.log("copyNumber:", copyNumber.join(","));
        // console.log("============>");
      }

      remainInfo.push({
        size: std.size,
        qty: qty,
        pattern,
        keepList: keepList,
        wastedList: wastedList,
      });

      if (keepList.length === 0) {
        // console.log("keepList:", keepList);
        return;
      }
      console.log(std.size, qty);
    }
  }


  // cross
  console.log('remainInfo:', remainInfo)

  for (const [index, std] of stdList.entries()) {
    for (const [indexCorss, stdCross] of stdList.entries()) {
      // const qty = i + 1;
      console.log("cros================:", std.size, stdCross.size,);
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
      const testingList = [...cutting, ...cuttingCross]
      let copyNumber = cloneDeep(listRemain);
      let copyTestingList = cloneDeep(flatten(testingList));

      console.log("copyNumber:", copyNumber.length);
      console.log("copyTestingList:", copyTestingList);

      const keepList = [];
      const wastedList = [];
      const pattern = [];

      while (copyTestingList.length || copyNumber.length) {
        const numberTest = [...copyNumber, ...flatten(copyTestingList)];
        // if (debug) console.log("suggest_list:", testingList.join(","));
        const sliced = filterForCombination(numberTest);

        // ASC
        const slicedFormatter = sortBy(flatten(sliced));

        // // DESC
        // const slicedFormatter = sortBy(flatten(sliced)).reverse();
        // console.log('slicedFormatter:', slicedFormatter)
        const result = findCombinations(slicedFormatter, testingList);
       
        // split used wood
        const selected = result;
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
            console.log("std item:", iterator);
            copyTestingList.splice(deletTestingIndex, 1);
          }
        }

        // reduce qty
        // stdList[index].qty = stdList[index].qty - qty;
        console.log(selected.pattern);
        pattern.push(selected.pattern)
        const sumSelected = sum(
          selected.pattern.split(",").map((item) => +item)
        );
        const selectedRemain = woodLength - sumSelected;
        if (selectedRemain >= minLength) {
          // keep
          keepList.push(selectedRemain);
        } else {
          // wasted
          wastedList.push(selectedRemain);
        }

        // console.log("copyNumber:", copyNumber.join(","));
        // console.log("============>");
      }

      remainInfo.push({
        size: std.size,
        crossSize: stdCross.size,
        pattern,
        // qty: qty,
        keepList: keepList,
        wastedList: wastedList,
      });

      if (keepList.length === 0) {
        console.log("keepList is 0:", keepList);
        return;
      }
      console.log(std.size, stdCross.size,);
    }
  }
  console.log('remainInfo:', remainInfo)

  // console.log('copyNumber:', copyNumber.join("  "))
  // console.log(copyNumber.join(","));
  // console.log('stdList:', stdList)

  // const combinations = [[]];
  // for (let i = 0; i < numbers.length; i++) {
  //   const currentCombinations = [...combinations]; // Create a copy of existing combinations
  //   for (let j = 0; j < currentCombinations.length; j++) {
  //     combinations.push([...currentCombinations[j], numbers[i]]);
  //   }
  // }
}

async function goNext(listRemain) {
  // console.log("====>goNext");

  // console.log("standardList:", standardList);

  findSuggestionStd(listRemain, stdOrderList);
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  // }

  // let copyNumber = cloneDeep(listRemain);
  // while (copyNumber.length) {
  //   for (const [index, list] of standardList.entries()) {
  //     const listStdNumber = [
  //       list.dimensionW,
  //       list.dimensionW,
  //       list.dimensionH,
  //       list.dimensionH,
  //     ];

  //     const numberTest = [...copyNumber, ...listStdNumber];
  //     // if (debug) console.log("suggest_list:", list.join(","));
  //     const sliced = filterForCombination(numberTest);

  //     // ASC
  //     // const slicedFormatter = sortBy(flatten(sliced))

  //     // DESC
  //     const slicedFormatter = sortBy(flatten(sliced)).reverse();

  //     const result = findCombinations(slicedFormatter, list);
  //     if (debug)
  //       console.log("======================= end =======================");

  //     // console.log('lowestRemainList:', lowestRemainList)
  //     // minimum remain
  //     const selected = result;
  //     if (selected.remain === 0) {
  //       // log suggest
  //       console.log("selected:", list.size, list.dimensionW, list.dimensionH);

  //       // split used wood
  //       const selectedArray = selected.pattern.split(",");
  //       for (const iterator of selectedArray) {
  //         let deletIndex = copyNumber.indexOf(+iterator);
  //         if (deletIndex > -1) {
  //           copyNumber.splice(deletIndex, 1);
  //         }
  //       }
  //       console.log(selected.pattern);
  //     }

  //     // if last index
  //     if (index === standardList.length - 1) {
  //       console.log("copyNumber:", copyNumber);
  //       copyNumber = [];
  //     }
  //   }
  // }
}

go();
