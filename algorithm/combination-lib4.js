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


  // ตาม qty
  for (let i = 0; i < numbers.length; i++) {
    // console.log('numbers[i]:', numbers[i])
    // combinations.push(numbers[i])
    // for (let j = 0; j < numbers.length; j++) {
    //   if (i == j) {
    //     continue
    //   }

      
    //   console.log('numbers[i]:', numbers[i], numbers[j])
    // }

    // const currentCombinations = [...combinations]; // Create a copy of existing combinations
    // for (let j = 0; j < currentCombinations.length; j++) {
    //   combinations.push([...currentCombinations[j], numbers[i]]);
    // }
  }

  return combinations;
}

const numbers = [
  {size: '12x15',woodWidth: 1,qty: 1},
  {size: '10x15',woodWidth: 1,qty: 1},
  {size: '8.24x11.69',woodWidth: 1,qty: 1},
  {size: '8x10',woodWidth: 1,qty: 1},
  {size: '6x8',woodWidth: 1,qty: 1},

];
const result = findCombinations(numbers);
result.forEach((element) => {
  console.log(element)
  // console.log(element.join(','));
});