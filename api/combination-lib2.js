const {
  sum,
  uniq,
  sortBy,
  orderBy,
  groupBy,
  slice,
  flatten,
} = require("lodash");

function findCombinations(numbers) {
console.log('numbers:', numbers.length)
  const combinations = [];

  function generateCombinations(currentCombination, start) {
    combinations.push(currentCombination);
    for (let i = start; i < numbers.length; i++) {
      generateCombinations(currentCombination.concat(numbers[i]), i + 1);
    }
  }

  generateCombinations([], 0);
  console.log('combinations:', combinations)
  console.log('combinations:', combinations.length)
  return combinations;
}

// Example usage:
// 2 ^ numbers.length
const numbers = [1, 2, 3, 4, 5]; 
// const numbers = [
// 31		,
// 31		,
// 22.5		,
// 22.5		,
// 26.5		,
// 26.5		,
// 14.5		,
// 14.5		,
// 26.5		,
// 26.5		,
// 14.5		,
// 14.5		,
// 26.5		,
// 26.5		,
// 14.5		,
// 14.5		,
// 26.5		,
// 26.5		,
// 15.5		,
// 15.5		,
// 26.5		,
// 26.5		,
// 15.5		,
// 15.5		,
// 26.5		,
// 26.5		,
// 15.5		,
// 15.5		,
// 23.5		,
// 23.5		,
// 17.5		,
// 17.5		,
// 23.5		,
// 23.5		,
// 17.5		,
// 17.5		,
// 23.5		,
// 23.5		,
// 17.5		,
// 17.5		,
// 20.5		,
// 20.5		,
// 14.5		,
// 14.5		,
// 20.5		,
// 20.5		,
// 14.5		,
// 14.5		,
// 20.5		,
// 20.5		,
// 14.5		,
// 14.5		,
// 19.5		,
// 19.5		,
// 14.5		,
// 14.5		,
// 18.5		,
// 18.5		,
// 14.5		,
// 14.5		,
// 14.5		,
// 14.5		,
// 12.5		,
// 12.5		,
// 14.5		,
// 14.5		,
// 12.5		,
// 12.5		,
// 14.5		,
// 14.5		,
// 12.5		,
// 12.5		,
// 10.5		,
// 10.5		,
// 8.5		,
// 8.5		,
// 10.5		,
// 10.5		,
// 8.5		,
// 8.5		,
// 10.5		,
// 10.5		,
// 8.5		,
// 8.5		,
// 10.5		,
// 10.5		,
// 8.5		,
// 8.5		,
// 10.5		,
// 10.5		,
// 8.5		,
// 8.5		,
// 9.5		,
// 9.5		,
// 8.5		,
// 8.5		,
// 9.5		,
// 9.5		,
// 8.5		,
// 8.5		,
// 9.5		,
// 9.5		,
// 8.5		,
// 8.5		,
// ];

// const sliced = filterForCombination(numbers)
const woodLength = 68.81;
const result = findCombinations(numbers);
// const values = result.filter((item) => {
//   const summary = sum(item);
//   return summary <= woodLength;
// });
// const filterd = uniq(values.map((item) => sortBy(item).join(",")));
result.forEach((element) => {
  console.log(element.join(','));
});

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
