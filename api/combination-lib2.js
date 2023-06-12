const { sum, uniq, sortBy, orderBy, groupBy, slice, flatten } = require("lodash");

function findCombinations(numbers) {
  const combinations = [];

  function generateCombinations(currentCombination, start) {
    combinations.push(currentCombination);
    for (let i = start; i < numbers.length; i++) {
      generateCombinations(currentCombination.concat(numbers[i]), i + 1);
    }
  }

  generateCombinations([], 0);
  return combinations;
}


// Example usage:
const numbers = [1, 2, 3, 4, 5];
// const numbers = [
//   14.5	,
// 14.5	,
// 12.5	,
// 12.5	,
// 10.5	,
// 10.5	,
// 10.5	,
// 10.5	,
// 10.5	,
// 10.5	,
// 9.5	,
// 9.5	,
// 8.5	,
// 8.5	,
// 8.5	,
// 8.5	,
// 7.5	,
// 7.5	,
// 6.5	,
// 6.5	,
// ];

// const sliced = filterForCombination(numbers)
const woodLength = 68.81
const result = findCombinations(numbers);
const values = result.filter((item) => {
  const summary = sum(item);
  return summary <= woodLength;
});
const filterd = uniq(values.map((item) => sortBy(item).join(",")));
filterd.forEach((element) => {
  console.log(element);
});

// // select
const selected = filterd.map((item) => {
  const summary = sum(item.split(",").map((val) => +val));
  return {
    pattern: item,
    summary: summary,
  };
});
console.log("selected:", orderBy(selected, ["summary"], ["desc"]));

// console.log('result:', result.filter(item => item.length))
// console.log('result:', uniq(values.map((item) => sortBy(item).join(''))))
// const formatted = result.filter((item) => sum(item) >= 120);
// console.log(result.length, formatted.length);
