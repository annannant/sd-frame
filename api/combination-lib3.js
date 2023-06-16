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

  for (let i = 0; i < numbers.length; i++) {
    const currentCombinations = [...combinations]; // Create a copy of existing combinations

    for (let j = 0; j < currentCombinations.length; j++) {
      combinations.push([...currentCombinations[j], numbers[i]]);
    }
  }

  return combinations;
}

const numbers = [1, 2, 3, 4, 5];
const result = findCombinations(numbers);
result.forEach((element) => {
  console.log(element.join(','));
});