const {
  sum,
  uniq,
  sortBy,
  orderBy,
  groupBy,
  slice,
  flatten,
  maxBy,
} = require("lodash");
const woodLength = 120;

function findCombinations(numbers) {
  let lowest = maxBy(numbers);
  let lowestList = [lowest];
  const combinations = [];
  const combinationLowest = [];
  let combinationKeys = {};
  function generateCombinations(currentCombination, end) {
    combinations.push(currentCombination);
    combinationKeys = {
      ...combinationKeys,
      [sortBy(currentCombination).join(",")]: 1,
    };

    for (let i = end; i > 0; i--) {
      const combindCurrent = currentCombination.concat(numbers[i - 1]);

      // check  duplication
      const found = combinationKeys[sortBy(combindCurrent).join(",")];
      if (found) {
        continue;
      }

      if (sum(combindCurrent) > woodLength) {
        continue;
      }

      const remain = parseFloat((woodLength - sum(combindCurrent)).toFixed(2));
      if (remain === 0) {
        // lowest = remain;
        combinationLowest.push(combindCurrent.join(","));
        // console.log("===>", combindCurrent.join(","));
      }

      if (remain < lowest) {
        lowest = remain;
        lowestList.push(remain);
        // console.log("lowest:", lowest);
        console.log(remain, combindCurrent.join(","));
      }

      generateCombinations(combindCurrent, i - 1);
    }
  }

  generateCombinations([], numbers.length);
  console.log("lowestList:", sortBy(lowestList)[0]);
  uniq(combinationLowest).forEach((element) => {
    console.log(element);
  });

  return combinations;
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
const numbers = [
  27.5	,
27.5	,
26.5	,
26.5	,
26.5	,
26.5	,
14.5	,
14.5	,
26.5	,
26.5	,
14.5	,
14.5	,
25.5	,
25.5	,
14.5	,
14.5	,
22.5	,
22.5	,
22.5	,
22.5	,
14.5	,
14.5	,
12.5	,
12.5	,
14.5	,
14.5	,
12.5	,
12.5	,
14.5	,
14.5	,
12.5	,
12.5	,
14.19	,
14.19	,
10.77	,
10.77	,
14.19	,
14.19	,
10.77	,
10.77	,
14.19	,
14.19	,
10.77	,
10.77	,
14.19	,
14.19	,
10.77	,
10.77	,
14.19	,
14.19	,
10.77	,
10.77	,
12.5	,
12.5	,
10.5	,
10.5	,
12.5	,
12.5	,
10.5	,
10.5	,
12.5	,
12.5	,
10.5	,
10.5	,
12.5	,
12.5	,
10.5	,
10.5	,
12.5	,
12.5	,
10.5	,
10.5	,
12.5	,
12.5	,
10.5	,
10.5	,
];
const sliced = filterForCombination(numbers);
const slicedFormatter = sortBy(flatten(sliced));
console.log('slicedFormatter:', slicedFormatter)
// console.log('sliced:', slicedFormatter)
const result = findCombinations(slicedFormatter);
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
