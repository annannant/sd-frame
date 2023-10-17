const { groupBy, keys, orderBy, cloneDeep } = require("lodash");

function log(item, remaining, wood) {
  const cal = remaining - item.cutting;
  const test = cal >= 0;

  console.log(
    "wood:",
    wood,
    "item:",
    item.orderNo,
    item.set,
    item.cuttingName,

    item.size,
    item.cutting,
    "===>",
    remaining,
    "-",
    item.cutting,
    "=",
    remaining - item.cutting,
    test ? "" : `xxx push => ${remaining}`
  );
}

function logSummary(remaining, wood, wested) {}

function findMatching(main, remainingList) {
  const list = orderBy(remainingList, 'cutting', 'desc').map(({ cutting }) => cutting)
// // console.log('list:', list)
//   for (const item of list) {
//     console.log(item.cutting);
//   }

  // ตัวอย่างการใช้งาน
  // const numbers = [10, 27.5, 26.5, 26.5, 26.5, 26.5, 14.5, 14.5, 26.5, 26.5];
  const targetSum = 120;

  const result = findCombinations2(list, targetSum);
  console.log('result:', result)
  // แสดงผลลัพธ์
  // for (const combination of result) {
  //   console.log(combination);
  // }
}

function findCombinations2(numbers, target) {
  try {
    const remains = cloneDeep(numbers)
    while (remains.length) {
      console.log('remains:', remains)
      remains.pop()
    }
    // const combinations = [];
    // const currentCombination = [];
  
    // function backtrack(index, currentSum) {
    //   if (currentSum > target) {
    //     return;
    //   }
    //   if (currentSum === target) {
    //     combinations.push([...currentCombination]);
    //     return;
    //   }
    //   if (index >= numbers.length) {
    //     return;
    //   }
  
    //   currentCombination.push(numbers[index]);
    //   backtrack(index + 1, currentSum + numbers[index]);
    //   currentCombination.pop();
    //   backtrack(index + 1, currentSum);
    // }
  
    // backtrack(0, 0);
    // return combinations;
  } catch(err) {
    // console.log('err:', err)
  }
}


function findCombinations(numbers, target) {
  try {
    const combinations = [];
    const currentCombination = [];
  
    function backtrack(index, currentSum) {
      if (currentSum > target) {
        return;
      }
      if (currentSum === target) {
        combinations.push([...currentCombination]);
        return;
      }
      if (index >= numbers.length) {
        return;
      }
  
      currentCombination.push(numbers[index]);
      backtrack(index + 1, currentSum + numbers[index]);
      currentCombination.pop();
      backtrack(index + 1, currentSum);
    }
  
    backtrack(0, 0);
    return combinations;
  } catch(err) {
    console.log('err:', err)
  }
}



module.exports = { log, findMatching, findCombinations };

