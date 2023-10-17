const { cloneDeep, orderBy, sortBy } = require("lodash");

function combinations(array) {
  const results = [];

  function generateCombinations(currentCombination, remainingElements) {
    if (remainingElements.length === 0) {
      results.push(currentCombination);
      return;
    }

    for (let i = 0; i < remainingElements.length; i++) {
      const updatedCombination = [...currentCombination, remainingElements[i]];
      const updatedRemainingElements = [
        ...remainingElements.slice(0, i),
        ...remainingElements.slice(i + 1),
      ];
      generateCombinations(updatedCombination, updatedRemainingElements);
    }
  }

  generateCombinations([], array);
  return results;
}

const combinationTest = (array) => {
  const result = [];
  const pattern = [];
  for (let pdx = 0; pdx < array.length - 1; pdx++) {
    if (pdx != 0) {
      continue
    }
    console.log(':============>skip', pdx)
    for (let index = 0; index < array.length; index++) {
      let current = 0
      let items = [];
      for (let idx = 0; idx < array.length; idx++) {
        let rdx = undefined
        if (!items.length) {
          items.push(array[index]);
          // console.log("items:", index, idx, items);
        } else {
          const key = (idx) + index + (pdx * idx);
          // const rdx = key >= array.length ? key - (array.length) : key;
          rdx = findKey(key, array.length)
          items.push(array[rdx]);
          // console.log("items:", index, idx, pdx, 'skip key', key, rdx, items);
        }
        const patt = sortBy(items).join('')
        const found = pattern.find((pval) => pval == patt)
        result.push(items)
        pattern.push(patt)
 
        const sum = items.reduce((prev, current) => prev + current ,0)
        // if (sum <= 120) {
        //   // console.log(items.join(','), ":", sum);
        //   // console.log(items.join(','), found ? true : '');
          if (!found) {
            console.log(items.join(','));
          }
        // }
      }
    }
  }
// console.log('result:', result)

};


function findKey(key, length) {
  const result = key >= length ? key - length : key;
  if (result >= length) {
    return findKey(result, length)
  }

  return result
}

// Example usage:
// const inputArray = [14.5,14.5,14.5,14.5,22.5,22.5,22.5,22.5,25.5,25.5,26.5,26.5,26.5,26.5,27.5,27.5]
const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const result = combinationTest(inputArray);
console.log(result);
