// เลือกเศษ 0 จากไม้ เรียงจาก มากไปน้อย
const {
  sum,
  uniq,
  sortBy,
  orderBy,
  groupBy,
  slice,
  flatten,
  maxBy,
  minBy,
  cloneDeep,
} = require("lodash");
const debug = false;
const woodLength = 120;

const { numbers } = require("./number");

function intersect(patternList, numbers) {
  const sortedNumbers = sortBy(numbers);
  return sortBy(patternList).filter((val) => sortedNumbers.includes(val));
}
function findCombinations(numbers, suggestList) {
  let lowest = 99999999999999;
  const combinations = [];
  let combinationKeys = {};

  const selectedCombinations = [];
  function generateCombinations(currentCombination, start) {
    const foundZero = selectedCombinations.find((item) => item.remain === 0)
    if (foundZero) {
      return
    }

    combinations.push(currentCombination);
    combinationKeys = {
      ...combinationKeys,
      [sortBy(currentCombination).join(",")]: 1,
    };

    for (let i = start; i < numbers.length; i++) {
      const combindCurrent = currentCombination.concat(numbers[i]);
      // console.log('combindCurrent:', combindCurrent)

      // check  duplication
      const found = combinationKeys[sortBy(combindCurrent).join(",")];
      if (found) {
        continue;
      }

      // filter combination > 120
      if (sum(combindCurrent) > woodLength) {
        continue;
      }

      // check lowetst is 0
      const remain = parseFloat((woodLength - sum(combindCurrent)).toFixed(2));
      if (remain === 0) {
        // check pattern ว่ามี list ของ order หรือไม่ (filter out เฉพาะ list ที่มีแค่ suggest)
        const hasOrder = intersect(combindCurrent, numbers);
        if (hasOrder.length <= 0) {
          continue;
        }

        const pattern = sortBy(combindCurrent).reverse().join(",");
        selectedCombinations.push({
          suggest_list: suggestList,
          remain: remain,
          pattern: pattern,
        });
        if (debug) console.log("--->", remain, ",", pattern);
        continue;
      }

      // find lowest: ผลรวมของ patter นี้ - 120
      // console.log('remain:', remain, lowest)
      if (remain < lowest) {
        lowest = remain;

        // check pattern ว่ามี list ของ order หรือไม่ (filter out เฉพาะ list ที่มีแค่ suggest)
        const hasOrder = intersect(combindCurrent, numbers);
        if (hasOrder.length <= 0) {
          continue;
        }
        const pattern = sortBy(combindCurrent).reverse().join(",");
        selectedCombinations.push({
          suggest_list: suggestList,
          remain: remain,
          pattern: pattern,
        });
        if (debug) console.log(remain, combindCurrent.join(","));
      }

      generateCombinations(combindCurrent, i + 1);
    }
  }

  generateCombinations([], 0);
  // console.log("lowest_remain:", sortBy(lowestList)[0]);

  // uniq(combinationLowest).forEach((element) => {
  //   console.log(element);
  // });
  const lowestRemain = orderBy(selectedCombinations, ["remain"], ["asc"])[0];
  if (debug) console.log("lowest_remain:", lowestRemain);

  return {
    combinations,
    lowestRemain,
  };
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
// Example usage:
// const numbers = [1, 2, 3, 4, 5];

async function go() {
  let copyNumber = cloneDeep(numbers);
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
      if (debug) console.log("suggest_list:", list.join(","));
      const sliced = filterForCombination(numberTest);
      // const slicedFormatter = sortBy(flatten(sliced)).reverse();
      // start with middle
      const sliced2 = sortBy(flatten(sliced)).reverse();
      const midex = sliced2.length / 2
      const slicedFormatter = [...sliced2.slice(midex, sliced2.length), ...sliced2.slice(0, midex - 1)]

      const { lowestRemain } = findCombinations(slicedFormatter, list);
      lowestRemainList.push(lowestRemain);
      if (debug) console.log("======================= end =======================");
    }

    await new Promise(resolve => setTimeout(resolve, 300))

    const findLowestRemainList = lowestRemainList.map((element) => {
      const stdList = uniq(flatten(standardList));
      let calculate = stdList.map((val) => {
        return {
          wood: val,
          test_cutting: +parseFloat(element.remain - val).toFixed(2),
        };
      });
      // console.log('calculate:', element.remain, calculate)
      calculate = calculate.filter((val) => val.test_cutting >= 0);

      return {
        ...element,
        ...orderBy(calculate, ["test_cutting"], ["asc"])[0],
      };
    });

    await new Promise(resolve => setTimeout(resolve, 300))

    const selectedFromTestCutting = orderBy(
      findLowestRemainList.filter((val) => val.test_cutting),
      ["test_cutting"],
      ["asc"]
    )[0];

    const selectedFromLowestList = orderBy(
      findLowestRemainList,
      ["remain"],
      ["asc"]
    )[0];

    let selected;
    if (selectedFromTestCutting) {
      if (debug) console.log("====>selectedFromTestCutting");
      selected = selectedFromTestCutting;
    } else {
      selected = selectedFromLowestList;
      if (debug) console.log("====>selectedFromLowestList");
    }

    if (debug) console.log("selected:", selected.remain);
    if (debug) console.log("suggest_list:", selected.suggest_list.join(","));
    if (debug) console.log("pattern:", selected.pattern);

    await new Promise(resolve => setTimeout(resolve, 300))

    const selectedArray = selected.pattern.split(',')
    for (const iterator of selectedArray) {
      let deletIndex = copyNumber.indexOf(+iterator);
      if (deletIndex > -1) {
        copyNumber.splice(deletIndex, 1);
      }
    }
    console.log(selected.pattern)
  }
}

go();

// const sliced = filterForCombination(numbers);
// const slicedFormatter = sortBy(flatten(sliced)).reverse();
// const result = findCombinations(slicedFormatter);

// console.log('result:', result)
// result.forEach((element) => {
//   console.log(element.join(","));
// });

// const values = result.filter((item) => {
//   const summary = sum(item);
//   return summary <= 120;
// });
// const filterd = uniq(values.map((item) => sortBy(item).join(",")));
// filterd.forEach((element) => {
//   console.log(element);
// });

// // select
// const selected = filterd.map((item) => {
//   const summary = sum(item.split(",").map((val) => +val));
//   return {
//     pattern: item,
//     summary: summary,
//   };
// });
// console.log("selected:", orderBy(selected, ["summary"], ["desc"]));

// console.log('result:', result.filter(item => item.length))
// console.log('result:', uniq(values.map((item) => sortBy(item).join(''))))
// const formatted = result.filter((item) => sum(item) >= 120);
// console.log(result.length, formatted.length);
