const {
  sum,
  uniq,
  sortBy,
  orderBy,
  groupBy,
  slice,
  flatten,
  unionBy,
} = require("lodash");
const woodLength = 120

const uniqueArray = (list) => {
  return Array.from(new Set(list.map(JSON.stringify)), JSON.parse);
};

function findCombinations(numbers) {
  const combinations = [[]];
  let no = 1
  let lowest = 9999999
  let zeroList = {}

  for (let i = 0; i < numbers.length; i++) {
    const currentCombinations = [...uniqueArray(combinations)]; // Create a copy of existing combinations
    // const currentCombinations = [...combinations]; // Create a copy of existing combinations
    for (let j = 0; j < currentCombinations.length; j++) {

      // const current = [...currentCombinations[j], numbers[i]]
      const current = sortBy([...currentCombinations[j], numbers[i]]).reverse()
      const pattern = current.join(',')
      const sumValue = parseFloat(sum(current).toFixed(2))
      if (sumValue > woodLength) {
        continue
      }

      const remain = parseFloat((woodLength - sumValue));
      if (remain === 0) {
        if (zeroList[pattern]) {
          console.log(pattern)
          continue
        }

        zeroList = {
          ...zeroList,
          [pattern]: 1
        }
      }

      combinations.push(current);
    }
  }
  console.log('zeroList', Object.keys(zeroList).length)
  return uniqueArray(combinations);
}

// function findCombinations(numbers) {
//   let item = {}
//   const combinations = [];

//   function generateCombinations(currentCombination, start) {
//     combinations.push(currentCombination);
//     for (let i = start; i < numbers.length; i++) {
//       // console.log('numbers[i]:', numbers[i])

//       // if (item[numbers[i]]) {
//       //   continue
//       // }

//       // item = {
//       //   ...item,
//       //   [numbers[i]]: 1
//       // }
//       generateCombinations(currentCombination.concat(numbers[i]), i + 1);
//     }
//   }

//   generateCombinations([], 0);
//   console.log('combinations:', combinations)
//   console.log('combinations:', combinations.length)
//   return combinations;
// }

// function findCombinations(numbers) {
//   const combinations = [];

//   function generateCombinations(currentCombination, start) {
//     combinations.push(currentCombination);
//     for (let i = start; i > 0; i--) {
//       generateCombinations(currentCombination.concat(numbers[i - 1]), i - 1);
//     }
//   }

//   generateCombinations([], numbers.length);
//   return combinations;
// }

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
  }
  return flatten(result);
}

// Example usage:
// 2 ^ numbers.length
// const numbers = [1, 2, 3, 4, 5];
const numbers = [
  31	,
31	,
22.5	,
22.5	,
26.5	,
26.5	,
15.5	,
15.5	,
26.5	,
26.5	,
15.5	,
15.5	,
26.5	,
26.5	,
15.5	,
15.5	,
26.5	,
26.5	,
15.5	,
15.5	,
26.5	,
26.5	,
15.5	,
15.5	,
17.5	,
17.5	,
14.5	,
14.5	,
17.5	,
17.5	,
14.5	,
14.5	,
17.5	,
17.5	,
14.5	,
14.5	,
17.5	,
17.5	,
14.5	,
14.5	,
17.5	,
17.5	,
14.5	,
14.5	,
17.5	,
17.5	,
14.5	,
14.5	,
];

// const sliced = filterForCombination(numbers)
// const woodLength = 68.81;
// const values = filterForCombination(numbers);

// // console.log('values:', uniq(values))
// const result = findCombinations(uniq(values));

// const grouped = []
// const groupedKeys = groupBy(numbers)
// for(let key of Object.keys(groupedKeys)) {
//   const element = groupedKeys[key]
//   grouped.push({
//     value: element,
//     count: element.length
//   })
//   // grouped['count'] = grouped[key].length
// }
// console.log('grouped:', flatten(orderBy(grouped, ['count'], ['desc']).map(({value}) => value)))

// const result = findCombinations(numbers);
// const mapped = result.map((item) => {
//   // console.log(sortBy(item).reverse().join())
//   return sortBy(item).reverse().join();
// });
// console.log("mapped:", mapped.length, uniq(mapped).length);

// result.forEach((element) => {
//   console.log(element.join(','));
// });

// console.log('result:', result)

// const values = result.filter((item) => {
//   const summary = sum(item);
//   return summary <= woodLength;
// });
// const filterd = uniq(values.map((item) => sortBy(item).join(",")));
// filterd.forEach((element) => {
//   console.log(element);
// });

// // // select
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
