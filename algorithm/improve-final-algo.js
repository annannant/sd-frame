// const { numbers } = require("./number");
// const { woodStock } = require("./number-wood-stock");
const { sum, join, keyBy, orderBy, flatten, maxBy } = require("lodash");

class ImproveCoreAlgorithm {
  woodLength;
  minLength;
  sparePart;
  faceWidth;

  standardList = [];
  remainingList = [];
  remainigWoodItemStockList = [];
  finalResult = [];

  constructor(woodLength, minLength, sparePart, faceWidth) {
    this.woodLength = woodLength;
    this.minLength = minLength;
    this.sparePart = sparePart;
    this.faceWidth = faceWidth;
  }

  setRemainingList(remainingList) {
    this.remainingList = remainingList;
  }

  setWoodItemStockList(remainigWoodItemStockList) {
    this.remainigWoodItemStockList = remainigWoodItemStockList;
  }

  setStandardListByOrders(orderStd) {
    this.standardList = this.findProductionWoodList(orderStd);
  }

  findItemFromWoodItemStock() {
    const ordered = [...this.remainingList].sort((a, b) => b - a);

    const result = [];
    const woodItemStocks = [...this.remainigWoodItemStockList];

    for (let i = 0; i < ordered.length; i++) {
      const item = ordered[i];
      const currentWoodItemStocks = [...woodItemStocks];
      for (let j = 0; j < currentWoodItemStocks.length; j++) {
        const wood = currentWoodItemStocks[j];
        const remaining = wood - item;
        if (remaining >= 0 && remaining <= this.minLength) {
          woodItemStocks.splice(j, 1);
          result.push({
            pattern: item,
            pattern_list: [item],
            wood,
            sum: item,
            remaining,
            form_stock: true,
          });
          break;
        }
      }
    }

    // remove pattern form remaining stock
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      const { pattern } = element;
      const indexPattern = ordered.indexOf(pattern);
      ordered.splice(indexPattern, 1);
      ordered = [...ordered];
    }

    this.finalResult = [...result];
    this.remainingList = [...ordered];
    this.remainigWoodItemStockList = [...woodItemStocks];
  }

  findCombination(list, woodItemStocksList) {
    const woodItemStocks = [...woodItemStocksList];
    let combinations = [[]];
    let combinationsKey = { "": true };

    let tempList = [];
    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const combination = currentCombinations[j];
        const currentPattern = [...combination, value];
        const sumPattern = sum(currentPattern);
        const keyPattern = currentPattern.join("|");

        // if duplicate, skip
        const isDuplicate = combinationsKey[keyPattern];
        if (isDuplicate) {
          continue;
        }

        combinations = [...combinations, currentPattern];
        combinationsKey[keyPattern] = true; // for checking duplicate

        // isMoreThanWoodLength
        if (sumPattern > this.woodLength) {
          continue;
        }

        //
        const woods = [...woodItemStocks, 120];
        for (let k = 0; k < woods.length; k++) {
          const wood = woods[k];
          const remaining = wood - sumPattern;
          // console.log("remaining:", wood, "-", sumPattern, "=", remaining);
          const temp = {
            pattern: currentPattern.join(","),
            pattern_list: currentPattern,
            wood,
            sum: sumPattern,
            remaining,
            form_stock: woodItemStocks.includes(wood),
          };

          if (remaining === 0) {
            return temp;
          }

          if (remaining >= 0) {
            tempList.push(temp);
          }
        }
      }
    }

    const minRemaningList = orderBy(tempList, ["remaining"], ["asc"]);
    return minRemaningList[0];
  }

  findCombinationStd(list, expectedRemaining, zeroOnly = true) {
    let combinations = [[]];
    let combinationsKey = { "": true };

    let tempList = [];
    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const combination = currentCombinations[j];
        const currentPattern = [...combination, value];
        const sumPattern = sum(currentPattern);
        const keyPattern = currentPattern.join("|");

        // if duplicate, skip
        const isDuplicate = combinationsKey[keyPattern];
        if (isDuplicate) {
          continue;
        }

        combinations = [...combinations, currentPattern];
        combinationsKey[keyPattern] = true; // for checking duplicate

        // isMoreThanWoodLength
        if (sumPattern > this.woodLength) {
          continue;
        }

        const remaining = expectedRemaining - sumPattern;
        const temp = {
          pattern: currentPattern.join(","),
          pattern_list: currentPattern,
          // wood,
          sum: sumPattern,
          remaining,
          // form_stock: false,
        };

        if (remaining === 0) {
          // console.log(
          //   "sumPattern:",
          //   sumPattern,
          //   "expectedRemaining",
          //   expectedRemaining
          // );
          return temp;
        }

        if (remaining >= 0 && remaining <= this.minLength) {
          if (!zeroOnly) {
            return temp;
          }
        }
      }
    }

    // return tempList;
    return false;
  }

  findPatternStd(remaining) {
    const items = orderBy(this.standardList, ["w", "h"], ["asc"]);
    const maxQty = maxBy(items, "qty").qty;
    for (let index = 0; index < maxQty; index++) {
      const currentQty = index + 1;
      for (const std of items) {
        if (+std.qty < currentQty) {
          continue;
        }

        const list = flatten(Array(currentQty).fill(std.wood_list));
        console.log("currentQty:", currentQty);
        const selected = this.findCombinationStd(list, remaining);
        if (selected) {
          // console.log("qty:", currentQty);
          // console.log("selected:", selected);
          let remainingPatternList = [...list];
          for (const iterator of selected.pattern_list) {
            const indexPattern = list.indexOf(iterator);
            remainingPatternList.splice(indexPattern, 1);
            remainingPatternList = [...remainingPatternList];
          }
          console.log("list:", list);
          console.log("selected.pattern_list:", selected.pattern_list);
          console.log("remainingPatternList:", remainingPatternList);

          return {
            ...selected,
            remaining_pattern_list: remainingPatternList,
            pattern_wood_list: list,
            std: {
              ...std,
              qty: currentQty,
            },
          };
        }
      }
    }
    // for (const std of items) {
    //   for (let index = 0; index < 1; index++) {
    //     const qty = index + 1;
    //     const list = flatten(Array(qty).fill(std.wood_list));
    //     const pattern = this.findCombinationStd(list, remaining);
    //     if (pattern) {
    //       console.log("qty:", qty);
    //       console.log("pattern:", pattern);
    //     }
    //   }
    // }
  }

  findCombinationRemaningPattern(list, woodItemStocksList = []) {
    const woodItemStocks = [...woodItemStocksList];
    let combinations = [[]];
    let combinationsKey = { "": true };

    // all zero
    let tempList = [];
    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const combination = currentCombinations[j];
        const currentPattern = [...combination, value];
        const sumPattern = sum(currentPattern);
        const keyPattern = currentPattern.join("|");

        // if duplicate, skip
        const isDuplicate = combinationsKey[keyPattern];
        if (isDuplicate) {
          continue;
        }

        combinations = [...combinations, currentPattern];
        combinationsKey[keyPattern] = true; // for checking duplicate

        // isMoreThanWoodLength
        if (sumPattern > this.woodLength) {
          continue;
        }

        // //
        const woods = [...woodItemStocks, 120];
        for (let k = 0; k < woods.length; k++) {
          const wood = woods[k];
          const remaining = wood - sumPattern;
          // console.log("remaining:", wood, "-", sumPattern, "=", remaining);
          const temp = {
            pattern: currentPattern.join(","),
            pattern_list: currentPattern,
            wood,
            sum: sumPattern,
            remaining,
            form_stock: woodItemStocks.includes(wood),
          };

          if (remaining === 0) {
            return temp;
          }

          if (remaining >= 0) {
            console.log("remaining:", remaining);
            // tempList.push(temp);
            const res = this.findPatternStd(remaining);
            console.log("res:", res);
            // return;
          }
        }
      }
    }

    // with remaining

    // const minRemaningList = orderBy(tempList, ["remaining"], ["asc"]);
    // console.log("minRemaningList:", JSON.stringify(minRemaningList));
    // return minRemaningList[0];
    return tempList;
  }

  removeWoodItemStock(selected) {
    const deletIndex = this.remainigWoodItemStockList.indexOf(+selected.wood);
    if (deletIndex > -1) {
      this.remainigWoodItemStockList.splice(deletIndex, 1);
      this.remainigWoodItemStockList = [...this.remainigWoodItemStockList];
      if (+selected.remain > 0) {
        this.remainigWoodItemStockList.push(+selected.remaining);
      }
    }
  }

  removeSelectedPatternFromRemainingList(numbers, selected) {
    for (const iterator of selected?.pattern_list ?? []) {
      let deletIndex = numbers.indexOf(+iterator);
      if (deletIndex > -1) {
        numbers.splice(deletIndex, 1);
        numbers = [...numbers];
      }
    }

    return numbers;
  }

  findZeroPattern() {
    let numbers = [...this.remainingList].sort((a, b) => b - a);
    let remainingList = [];

    // zero pattern
    while (numbers.length > 0) {
      const selected = this.findCombination(
        numbers,
        this.remainigWoodItemStockList
      );
      if (selected.remaining == 0) {
        this.finalResult.push(selected);

        this.removeWoodItemStock(selected);
        const newNumbers = this.removeSelectedPatternFromRemainingList(
          numbers,
          selected
        );
        numbers = [...newNumbers];
        continue;
      }

      remainingList = [...numbers];
      return remainingList;
    }

    return remainingList;
  }

  findRemaningPattern(remainingList) {
    let numbers = [...remainingList].sort((a, b) => b - a);
    let temp = [];

    // zero pattern
    while (numbers.length > 0) {
      const selected = this.findCombinationRemaningPattern(
        numbers,
        this.remainigWoodItemStockList
      );

      if (selected?.remaining == 0) {
        this.finalResult.push(selected);
        this.removeWoodItemStock(selected);
        const newNumbers = this.removeSelectedPatternFromRemainingList(
          numbers,
          selected
        );
        numbers = [...newNumbers];

        // handle if has std frame
      }

      console.log("selected:", selected);
      return;
      numbers.pop();

      // if (selected.remaining !== 0) {
      //   temp = [...numbers];
      //   return temp;
      // }

      // this.finalResult.push(selected);
      // this.removeWoodItemStock(selected);
      // const newNumbers = this.removeSelectedPatternFromRemainingList(
      //   numbers,
      //   selected
      // );
      // numbers = [...newNumbers];
      // continue;
    }

    // return temp;
  }

  findPattern() {
    const remainingList = this.findZeroPattern();
    // if (remainingList.length > 0) {
    //   this.findRemaningPattern(remainingList);
    // }
  }

  findProductionWoodList(frames) {
    const result = [];
    for (const item of frames) {
      const w = item.width + this.faceWidth * 2 + this.sparePart * 2;
      const h = item.hight + this.faceWidth * 2 + this.sparePart * 2;
      const value = {
        ...item,
        w,
        h,
        wood_list: [w, w, h, h],
      };
      result.push(value);
    }

    return result;
  }
}

async function execute() {
  const remainingList = [
    12.5, 12.5, 12.5, 12.5, 10.5, 10.5, 10.5, 10.5, 9.5, 9.5, 9.5, 9.5, 9.5,
    9.5, 9.5, 9.5, 9.5, 9.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5,
  ];
  const orderStd = [
    { width: 4, hight: 6, qty: 5 },
    { width: 5, hight: 7, qty: 1 },
    { width: 6, hight: 8, qty: 5 },
  ];

  const woodItemStock = [8, 11, 21, 15];
  const woodList = [11, 120];

  const woodLength = 120;
  const minLength = 6.5;
  const sparePart = 0.25;
  const faceWidth = 1;

  const core = new ImproveCoreAlgorithm(
    woodLength,
    minLength,
    sparePart,
    faceWidth
  );
  core.setRemainingList(remainingList);
  core.setWoodItemStockList(woodItemStock);
  core.setStandardListByOrders(orderStd);

  // เหตุผลทัี่่ไม่ filter ก่อน เพรามีโอกาส A + B = wood, ไม้ 15 = 7.5 + 7.5
  // check from wood item stock
  // core.findItemFromWoodItemStock();

  // check from wood item stock
  core.findPattern();
}

execute();
