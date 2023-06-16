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
const woodLength = 120

const { numbers } = require("./number");
function intersect(patternList, numbers) {
  const sortedNumbers = sortBy(numbers);
  return sortBy(patternList).filter((val) => sortedNumbers.includes(val));
}

const uniqueArray = (list) => {
  return Array.from(new Set(list.map(JSON.stringify)), JSON.parse);
};

function findCombinations(numbers, stdList) {
  const combinations = [[]];
  let no = 1
  let lowest = 9999999
  let zeroList = {}
  const selectedCombinations = []

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
        // check pattern ว่ามี list ของ order หรือไม่ (filter out เฉพาะ list ที่มีแค่ suggest)
        // console.log('current:', current)
        return {
          remain: remain,
          pattern: pattern,
        }
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
  return lowestRemain
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


function orderNumberByGroup(numbers, order = 'asc') {
  const grouped = [];
  const groupedKeys = groupBy(numbers);
  for (let key of Object.keys(groupedKeys)) {
    const element = groupedKeys[key];
    grouped.push({
      value: element,
      size: +key,
      count: element.length,
    });
    // grouped['count'] = grouped[key].length
  }
  // console.log('grouped:', )
  // console.log('grouped:', orderBy(grouped, ["count", "size"], [order, order]))
  // return flatten(
  //   orderBy(grouped, ["count"], [order]).map(({ value }) => value)
  // );
  return flatten(
    orderBy(grouped, ["count"], [order]).map(({ value }) => value)
  );
}
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
      // if (debug) console.log("suggest_list:", list.join(","));
      const sliced = filterForCombination(numberTest);

      // qty desc
      const slicedFormatter = orderNumberByGroup(flatten(sliced), 'desc')
      const result = findCombinations(slicedFormatter, list);
      // console.log('result:', result.join(','))
      lowestRemainList.push(result);
      if (debug) console.log("======================= end =======================");
    }

    // await new Promise(resolve => setTimeout(resolve, 300))

    // const findLowestRemainList = lowestRemainList.map((element) => {
    //   const stdList = uniq(flatten(standardList));
    //   let calculate = stdList.map((val) => {
    //     return {
    //       wood: val,
    //       test_cutting: +parseFloat(element.remain - val).toFixed(2),
    //     };
    //   });
    //   // console.log('calculate:', element.remain, calculate)
    //   calculate = calculate.filter((val) => val.test_cutting >= 0);

    //   return {
    //     ...element,
    //     ...orderBy(calculate, ["test_cutting"], ["asc"])[0],
    //   };
    // });

    // await new Promise(resolve => setTimeout(resolve, 300))

    // const selectedFromTestCutting = orderBy(
    //   findLowestRemainList.filter((val) => val.test_cutting),
    //   ["test_cutting"],
    //   ["asc"]
    // )[0];

    // const selectedFromLowestList = orderBy(
    //   findLowestRemainList,
    //   ["remain"],
    //   ["asc"]
    // )[0];

    // let selected;
    // if (selectedFromTestCutting) {
    //   if (debug) console.log("====>selectedFromTestCutting");
    //   selected = selectedFromTestCutting;
    // } else {
    //   selected = selectedFromLowestList;
    //   if (debug) console.log("====>selectedFromLowestList");
    // }

    // if (debug) console.log("selected:", selected.remain);
    // if (debug) console.log("suggest_list:", selected.suggest_list.join(","));
    // if (debug) console.log("pattern:", selected.pattern);

    // await new Promise(resolve => setTimeout(resolve, 300))

    // console.log('lowestRemainList:', lowestRemainList)
    const selected = orderBy(lowestRemainList, 'remain', 'asc')[0]
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