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

const { numbers } = require("./number");
const { woodStock } = require("./number-wood-stock");
console.log("woodStock:", woodStock);
function intersect(patternList, numbers) {
  const sortedNumbers = sortBy(numbers);
  return sortBy(patternList).filter((val) => sortedNumbers.includes(val));
}

const uniqueArray = (list) => {
  return Array.from(new Set(list.map(JSON.stringify)), JSON.parse);
};

function findCombinations(numbers, stdList, remainWoodStock) {
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

      const woods = [...remainWoodStock, woodLength]
        .map((wood) => {
          const remainWood = parseFloat(wood - sumValue);
          return {
            from_stock: wood !== woodLength,
            wood,
            remain: remainWood,
          };
        })
        .filter((val) => val.remain >= 0);

      // const remain = parseFloat((woodLength - sumValue));
      const findZero = sortBy(woods).find((val) => val.remain === 0);
      // const remain = parseFloat((woodLength - sumValue));
      if (findZero?.remain === 0) {
        return {
          // wood: wood,
          // remain: remain,
          ...findZero,
          pattern: pattern,
        };
      }

      const findMin = orderBy(woods, "remain", "asc")[0];
      if (findMin?.remain < lowest) {
        lowest = findMin?.remain;

        selectedCombinations.push({
          // suggest_list: suggestList,
          ...findMin,
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
  let remainWoodStock = cloneDeep(woodStock);

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
      // if (debug) console.log("suggest_list:", list.join(","));
      const sliced = filterForCombination(numberTest);

      // // ASC
      // const slicedFormatter = sortBy(flatten(sliced))

      // // DESC
      // const slicedFormatter = sortBy(flatten(sliced)).reverse();

      // qty asc
      const slicedFormatter = orderNumberByGroup(flatten(sliced))
      
      // // qty desc
      // const slicedFormatter = orderNumberByGroup(flatten(sliced), 'desc')

      const result = findCombinations(slicedFormatter, list, remainWoodStock);
      // console.log('result:', result.join(','))
      lowestRemainList.push(result);
      if (debug)
        console.log("======================= end =======================");
    }

    const selected = orderBy(lowestRemainList, "remain", "asc")[0];
    if (selected.from_stock) {
      const deletIndex = remainWoodStock.indexOf(+selected.wood);
      if (deletIndex > -1) {
        remainWoodStock.splice(deletIndex, 1);
      }
    }

    const selectedArray = selected.pattern.split(",");
    for (const iterator of selectedArray) {
      let deletIndex = copyNumber.indexOf(+iterator);
      if (deletIndex > -1) {
        copyNumber.splice(deletIndex, 1);
      }
    }
    console.log(selected.pattern, ";", selected.wood);
  }
}

go();
