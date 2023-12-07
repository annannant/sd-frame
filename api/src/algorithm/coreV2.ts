import { parser } from '@/common/helpers/number';

const { sum, join, keyBy, orderBy, flatten, maxBy } = require('lodash');

class ImproveCoreAlgorithm {
  woodLength;
  minLength;
  sparePart;
  faceWidth;

  standardList = [];
  remainingList = [];
  remainigWoodItemStockList = [];
  finalResult = [];

  printAlgo;

  constructor(woodLength, minLength, sparePart, faceWidth) {
    this.woodLength = woodLength;
    this.minLength = minLength;
    this.sparePart = sparePart;
    this.faceWidth = faceWidth;
    this.printAlgo = false;
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
    let ordered = [...this.remainingList].sort((a, b) => b - a);

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
    const combinationsKey = { '': true };

    const tempList = [];
    for (let i = 0; i < list.length; i++) {
      if (this.printAlgo) {
        console.log('----', i + 1, ';', list[i]);
      }
      const value = list[i];
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const combination = currentCombinations[j];
        const currentPattern = [...combination, value];
        const sumPattern = sum(currentPattern);
        const keyPattern = currentPattern.join('|');

        // if duplicate, skip
        const isDuplicate = combinationsKey[keyPattern];
        if (isDuplicate) {
          if (this.printAlgo) {
            console.log(
              j + 1,
              ';',
              JSON.stringify(currentCombinations[j]),
              ';',
              JSON.stringify(currentPattern),
              '** dup',
            );
          }
          continue;
        }

        combinations = [...combinations, currentPattern];
        combinationsKey[keyPattern] = true; // for checking duplicate

        // isMoreThanWoodLength
        if (sumPattern > this.woodLength) {
          if (this.printAlgo) {
            console.log(
              j + 1,
              ';',
              JSON.stringify(currentCombinations[j]),
              ';',
              JSON.stringify(currentPattern),
              '** > 120',
            );
          }
          continue;
        }

        //
        const woods = [...woodItemStocks, 120];
        if (this.printAlgo) {
          // console.log(j + 1, ';', currentCombinations[j], ';', currentPattern);
          console.log(
            j + 1,
            ';',
            JSON.stringify(currentCombinations[j]),
            ';',
            JSON.stringify(currentPattern),
            ';',
            sumPattern,
          );
        }
        for (let k = 0; k < woods.length; k++) {
          const wood = woods[k];
          const remaining = wood - sumPattern;
          // if (this.printAlgo) {
          //   console.log(
          //     ';',
          //     ';',
          //     ';',
          //     k + 1,
          //     ';',
          //     wood,
          //     ';',
          //     sumPattern,
          //     ';',
          //     remaining,
          //     // `${wood}-${sumPattern}`,
          //     // ';',
          //     // remaining,
          //   );
          // }
          const temp = {
            pattern: currentPattern.join(','),
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

        // if (this.printAlgo) {
        //   console.log(
        //     ';',
        //     ';',
        //     ';',
        //     ';',
        //     ';',
        //     ';',
        //     ';',
        //     JSON.stringify(combinations),
        //   );
        // }
      }
    }

    const minRemaningList = orderBy(tempList, ['remaining'], ['asc']);
    return minRemaningList[0];
  }

  findCombinationStd(list, expectedRemaining, zeroOnly = true) {
    let combinations = [[]];
    const combinationsKey = { '': true };

    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const combination = currentCombinations[j];
        const currentPattern = [...combination, value];
        const sumPattern = sum(currentPattern);
        const keyPattern = currentPattern.join('|');

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
          pattern: currentPattern.join(','),
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

        if (zeroOnly) {
          continue;
        }

        if (remaining >= 0 && remaining <= this.minLength) {
          return temp;
        }
      }
    }

    // return tempList;
    return false;
  }

  findCombinationStd2(list, expectedRemaining) {
    let combinations = [[]];
    const combinationsKey = { '': true };

    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const combination = currentCombinations[j];
        const currentPattern = [...combination, value];
        const sumPattern = sum(currentPattern);
        const keyPattern = currentPattern.join('|');

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
          pattern: currentPattern.join(','),
          pattern_list: currentPattern,
          sum: sumPattern,
          remaining,
        };

        if (remaining === 0) {
          return temp;
        }
      }
    }
    console.log('combinations:', combinations);

    return false;
  }

  findPatternStd(remaining, zeroOnly = true) {
    if (this.standardList.length === 0) {
      return false;
    }

    const items = orderBy(this.standardList, ['w', 'h'], ['asc']);
    let maxQty = maxBy(items, 'qty').qty;
    if (maxQty > 5) {
      maxQty = 5;
    }
    for (let index = 0; index < +maxQty; index++) {
      const currentQty = index + 1;
      for (const std of items) {
        if (+std.qty < currentQty) {
          continue;
        }

        const list = flatten(Array(currentQty).fill(std.wood_list));
        // always return remaining = 0
        const selected: any = this.findCombinationStd(
          list,
          remaining,
          zeroOnly,
        );
        if (selected) {
          const usedPatternList = [];
          let remainingPatternList = [...list];
          for (const iterator of selected.pattern_list) {
            const indexPattern = remainingPatternList.indexOf(iterator);
            if (indexPattern >= 0) {
              usedPatternList.push(iterator);
            }
            remainingPatternList.splice(indexPattern, 1);
            remainingPatternList = [...remainingPatternList];
          }

          return {
            ...selected,
            remaining_pattern_list: remainingPatternList,
            used_pattern_list: usedPatternList,
            pattern_wood_list: list,
            std: {
              ...std,
              qty: currentQty,
            },
          };
        }
      }
    }
  }
  checkPatternHasMainList(currentPattern, numbers, suggestNumbers) {
    for (const item of currentPattern) {
      const found = numbers.includes(item);
      if (found) {
        return true;
      }
    }
    return false;
  }

  filterPattern(currentPattern, numbers, suggestNumbers) {
    // console.log("::::::::::");
    // console.log("currentPattern:", currentPattern);
    // console.log("numbers:", numbers);
    // console.log("suggestNumbers:", suggestNumbers);

    const numbersPattern = [];
    const suggestNumbersPattern = [];
    for (const item of currentPattern) {
      const index = numbers.indexOf(item);
      if (index > -1) {
        numbersPattern.push(item);
        numbers.splice(index, 1);
        numbers = [...numbers];
        continue;
      }

      const indexSuggest = suggestNumbers.indexOf(item);
      if (indexSuggest > -1) {
        suggestNumbersPattern.push(item);
        suggestNumbers.splice(index, 1);
        suggestNumbers = [...suggestNumbers];
        continue;
      }
    }
    console.log('numbersPattern:', numbersPattern);
    console.log('suggestNumbersPattern:', suggestNumbersPattern);

    return {
      numbersPattern,
      suggestNumbersPattern,
    };
  }

  findCombinationRemaningPattern(
    numbers,
    suggestNumbers,
    woodItemStocksList = [],
    zeroOnly = true,
  ) {
    const list = [...numbers, ...suggestNumbers];

    const woodItemStocks = [...woodItemStocksList];
    let combinations = [[]];
    const combinationsKey = { '': true };

    // all zero
    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const combination = currentCombinations[j];
        const currentPattern = [...combination, value];

        // // check isFromAllSuggestions
        const isHasMainItem = this.checkPatternHasMainList(
          currentPattern,
          numbers,
          suggestNumbers,
        );

        if (!isHasMainItem) {
          continue;
        }

        const sumPattern = sum(currentPattern);
        const keyPattern = currentPattern.join('|');

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

        const woods = [...woodItemStocks, 120];
        console.log('woods:', woods);
        for (let k = 0; k < woods.length; k++) {
          const wood = woods[k];
          const remaining = parser(wood) - parser(sumPattern);
          console.log('remaining:', wood, sumPattern, remaining);
          // console.log("remaining:", wood, "-", sumPattern, "=", remaining);
          const temp = {
            main_pattern: currentPattern.join(','),
            main_pattern_list: currentPattern,
            // main_suggest_pattern: currentPattern.join(","),
            // main_suggest_pattern_list: currentPattern,
            pattern: currentPattern.join(','),
            pattern_list: currentPattern,
            wood,
            sum: sumPattern,
            remaining,
            form_stock: woodItemStocks.includes(wood),
          };

          if (remaining === 0) {
            // const { numbersPattern, suggestNumbersPattern } =
            //   this.filterPattern(currentPattern, numbers, suggestNumbers);
            return temp;
          }

          if (remaining >= 0) {
            // find pattern from std
            // always return remaining = 0
            const res = this.findPatternStd(remaining, zeroOnly);
            console.log('res:', res);
            if (res) {
              const pattern = [...temp.main_pattern_list, ...res.pattern_list];
              return {
                main_pattern: temp.main_pattern,
                main_pattern_list: temp.main_pattern_list,
                remaining_pattern_list: res.remaining_pattern_list,
                used_pattern_list: res.used_pattern_list,
                pattern: pattern.join(','),
                pattern_list: pattern,
                wood: temp.wood,
                sum: temp.sum + res.sum,
                remaining: res.remaining,
                form_stock: temp.form_stock,
                std: res.std,
              };
            }
          }
        }
      }
    }

    // with remaining
    // const minRemaningList = orderBy(tempList, ["remaining"], ["asc"]);
    // console.log("minRemaningList:", JSON.stringify(minRemaningList));
    // return minRemaningList[0];
    // return tempList;
    return undefined;
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

  removeSelectedPatternFromRemainingList(numbers, patternList) {
    for (const iterator of patternList) {
      const deletIndex = numbers.indexOf(+iterator);
      if (deletIndex > -1) {
        numbers.splice(deletIndex, 1);
        numbers = [...numbers];
      }
    }

    return numbers;
  }

  removeSelectedPatternFromRemainingListStd(numbers, patternList) {
    return patternList;
  }

  removeSelectedPatternFromStdList(selectedStd) {
    for (const iterator of this.standardList) {
      if (iterator.w === selectedStd.w && iterator.h === selectedStd.h) {
        iterator.qty = iterator.qty - selectedStd.qty;
      }
    }
  }

  findZeroPattern() {
    let numbers = [...this.remainingList].sort((a, b) => b - a);
    let remainingList = [];

    // zero pattern
    while (numbers.length > 0) {
      const selected = this.findCombination(
        numbers,
        this.remainigWoodItemStockList,
      );

      if (selected.remaining == 0) {
        this.finalResult.push(selected);
        this.removeWoodItemStock(selected);
        const newNumbers = this.removeSelectedPatternFromRemainingList(
          numbers,
          selected?.pattern_list ?? [],
        );
        numbers = [...newNumbers];
        console.log('numbers:', numbers);
        continue;
      }
      remainingList = [...numbers];
      return remainingList;
    }

    return remainingList;
  }

  seperatePatternByList(patternList, mainList, suggestList) {
    console.log('====================================');
    console.log('suggestList:', suggestList);
    console.log('mainList:', mainList);

    const mainPatternList = [...mainList];
    const suggestPatternList = [...suggestList];

    for (const iterator of patternList) {
      const indexMainPattern = mainPatternList.indexOf(iterator);
      if (indexMainPattern > -1) {
        mainPatternList.splice(indexMainPattern, 1);
        continue;
      }
      const indexSuggestPattern = suggestList.indexOf(iterator);
      if (indexSuggestPattern > -1) {
        suggestPatternList.splice(indexSuggestPattern, 1);
        continue;
      }
    }

    console.log('mainPatternList:', mainPatternList);
    console.log('suggestPatternList:', suggestPatternList);

    return {
      remainingMain: mainPatternList,
      remainingSuggest: suggestPatternList,
    };
  }
  findRemaningPatternWithRemainingStd(remainingList, suggestList) {
    let numbers = [...remainingList].sort((a, b) => b - a);
    let suggestNumbers = [...suggestList].sort((a, b) => b - a);
    while (numbers.length > 0) {
      console.log('start numbers:', numbers);
      console.log('start suggestNumbers:', suggestNumbers);
      const selected = this.findCombination(
        [...numbers, ...suggestNumbers],
        this.remainigWoodItemStockList,
      );
      if (selected.remaining == 0) {
        console.log('selected.remaining == 0:', selected.remaining == 0);
        const { remainingMain, remainingSuggest } = this.seperatePatternByList(
          selected?.pattern_list ?? [],
          numbers,
          suggestNumbers,
        );
        this.finalResult.push(selected);
        this.removeWoodItemStock(selected);
        numbers = [...remainingMain];
        suggestNumbers = [...remainingSuggest];
        continue;
      } else {
        console.log('selected:', selected);
        const { remainingMain, remainingSuggest } = this.seperatePatternByList(
          selected?.pattern_list ?? [],
          numbers,
          suggestNumbers,
        );
        this.finalResult.push(selected);
        this.removeWoodItemStock(selected);
        numbers = [...remainingMain];
        suggestNumbers = [...remainingSuggest];
        continue;
      }
    }

    if (suggestNumbers.length > 0) {
      const selected = this.findCombination(
        [...suggestNumbers],
        this.remainigWoodItemStockList,
      );
      const { remainingSuggest } = this.seperatePatternByList(
        selected?.pattern_list ?? [],
        [],
        suggestNumbers,
      );
      this.finalResult.push(selected);
      this.removeWoodItemStock(selected);
      suggestNumbers = [...remainingSuggest];
    }

    console.log('final:', this.finalResult);
    console.log('suggestNumbers:', suggestNumbers);
    console.log('woods:', this.remainigWoodItemStockList);
    for (const final of this.finalResult) {
      // console.log("final:", final);
      console.log(final.wood, ';', final.pattern);
      // console.log(final.std?.width, final.std?.hight, "=", final.std?.qty);
    }

    for (const final of this.finalResult) {
      if (final.std) {
        console.log(final.std?.width, final.std?.hight, '=', final.std?.qty);
      }
    }
    this.prepareResponseV2();
  }

  findRemaningPatternWithZeroStd(
    remainingList,
    suggestList = [],
    zeroOnly = true,
  ) {
    let numbers = [...remainingList].sort((a, b) => b - a);
    let suggestNumbers = [...suggestList].sort((a, b) => b - a);

    // zero pattern
    // const zeroOnly = true;
    while (numbers.length > 0) {
      console.log('start numbers:', numbers);
      console.log('start suggestNumbers:', suggestNumbers);
      if (suggestNumbers.length > 0) {
        const selected = this.findCombination(
          [...numbers, ...suggestNumbers],
          this.remainigWoodItemStockList,
        );

        if (selected.remaining == 0) {
          console.log('selected.remaining == 0:', selected.remaining == 0);
          const { remainingMain, remainingSuggest } =
            this.seperatePatternByList(
              selected?.pattern_list ?? [],
              numbers,
              suggestNumbers,
            );

          this.finalResult.push(selected);
          this.removeWoodItemStock(selected);
          numbers = [...remainingMain];
          suggestNumbers = [...remainingSuggest];
          continue;
        }
        console.log('selected.remaining not 0:', selected.remaining);
      }

      const selected: any = this.findCombinationRemaningPattern(
        numbers,
        suggestNumbers,
        this.remainigWoodItemStockList,
        zeroOnly,
      );

      if (selected?.remaining !== 0) {
        numbers = [...numbers];
        break;
      }

      if (selected?.remaining == 0) {
        this.finalResult.push(selected); // from patttern
        this.removeWoodItemStock(selected); // from patttern

        const newNumbers = this.removeSelectedPatternFromRemainingList(
          numbers,
          selected?.main_pattern_list ?? [],
        );
        const newSuggestNumbers =
          this.removeSelectedPatternFromRemainingListStd(
            suggestNumbers,
            selected?.remaining_pattern_list ?? [],
          );

        // remove from std list
        this.removeSelectedPatternFromStdList(selected.std);

        numbers = [...newNumbers].sort((a, b) => b - a);
        suggestNumbers = [...newSuggestNumbers].sort((a, b) => b - a);
        console.log('::::::::::');
        continue;
      }
    }

    if (numbers.length > 0) {
      console.log('xxxxxxxxx no more zero patter xxxxxxxxx');
      console.log(numbers);
      console.log(suggestNumbers);
      if ((zeroOnly = false)) {
        return;
      }
      this.findRemaningPatternWithRemainingStd(numbers, suggestNumbers);
    }

    // console.log(numbers);
    // return temp;
  }

  findPattern() {
    const remainingList = this.findZeroPattern();
    if (remainingList.length > 0) {
      // this.findRemaningPatternWithZeroStd(remainingList);
      this.findRemaningPattern(remainingList);
    }
  }

  checkAllIsStd(ori) {
    const final = [...this.finalResult];
    for (const iterator of final) {
      if (iterator.main_pattern_list) {
        for (const main of iterator.main_pattern_list) {
          const index = ori.indexOf(main);
          if (index >= 0) {
            ori.splice(index, 1);
          }
        }
      } else {
        for (const main of iterator.pattern_list) {
          const index = ori.indexOf(main);
          if (index >= 0) {
            ori.splice(index, 1);
          }
        }
      }
      // console.log('iterator:', iterator);
    }

    return ori.length === 0;
  }

  findRemaningPattern(remainingList) {
    const ori = [...remainingList];
    let numbers = [...remainingList].sort((a, b) => b - a);
    while (numbers.length > 0) {
      const selected = this.findCombination(
        [...numbers],
        this.remainigWoodItemStockList,
      );
      // console.log('selected:', selected.remaining);
      // check numbers -> ว่า มีแต่ std รึป่าว
      const IsAllStd = this.checkAllIsStd(ori);

      // หา pattern ที่รวมกับ std แล้วเศษน้อยกว่า selected.remaining
      const selectedstd = this.findCombinationRemaningPattern2(
        selected.remaining ?? 0,
        numbers,
        this.remainigWoodItemStockList,
      );

      // console.log('selectedstd:', selectedstd);

      // return;
      if (selectedstd && !IsAllStd) {
        // console.log('selectedstd:', selectedstd);
        this.finalResult.push(selectedstd);
        this.removeWoodItemStock(selectedstd);
        const newNumbers = this.removeSelectedPatternFromRemainingList(
          numbers,
          selectedstd?.main_pattern_list ?? [],
        );
        // console.log(
        //   'selectedstd?.remaining_pattern_list:',
        //   selectedstd?.remaining_pattern_list,
        // );
        numbers = [
          ...newNumbers,
          ...(selectedstd?.remaining_pattern_list ?? []),
        ];
      } else {
        // เลือก selected.remaining
        // console.log('selected:', selected);
        this.finalResult.push(selected);
        this.removeWoodItemStock(selected);
        const newNumbers = this.removeSelectedPatternFromRemainingList(
          numbers,
          selected?.pattern_list ?? [],
        );
        numbers = [...newNumbers];
        continue;
      }
    }
    console.log('ori:', ori);
  }

  findCombinationRemaningPattern2(candidate, numbers, woodItemStocksList) {
    const list = [...numbers];
    const woodItemStocks = [...woodItemStocksList];

    let combinations = [[]];
    const combinationsKey = { '': true };
    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const combination = currentCombinations[j];
        const currentPattern = [...combination, value];
        const sumPattern = sum(currentPattern);
        const keyPattern = currentPattern.join('|');
        const isDuplicate = combinationsKey[keyPattern];
        if (isDuplicate) {
          continue;
        }
        if (sumPattern > this.woodLength) {
          continue;
        }

        const woods = [...woodItemStocks, 120];
        for (let k = 0; k < woods.length; k++) {
          const wood = woods[k];
          const remaining = parser(wood) - parser(sumPattern);
          if (remaining < 0) {
            continue;
          }

          if (parser(sumPattern) < parser(wood / 2)) {
            console.log(
              'parser(sumPattern):',
              parser(sumPattern),
              ':',
              parser(wood / 2),
            );
            continue;
          }

          console.log(
            'remaining:',
            remaining,
            candidate,
            sumPattern,
            JSON.stringify(currentPattern),
          );
          // // หาเศษ จาก std
          const match = this.findRemaningPatternWithCombinationStd(
            remaining,
            candidate,
          );
          if (!match) {
            continue;
          }

          // หา
          console.log(JSON.stringify(currentPattern));
          // console.log('match:', match);
          const pattern = [...match.used_pattern_list, ...currentPattern];
          return {
            ...match,
            main_pattern: currentPattern.join(','),
            main_pattern_list: currentPattern,
            pattern: pattern.join(','),
            pattern_list: pattern,
            wood,
            sum: sum(pattern),
            remaining: match.remaining,
            form_stock: woodItemStocks.includes(wood),
          };
        }

        combinations = [...combinations, currentPattern];
        combinationsKey[keyPattern] = true; // for checking duplicate
      }
    }

    return undefined;
  }

  findRemainingList(all, used) {
    const remainingList = [];
    for (const iterator of all) {
      const index = used.indexOf(iterator);
      if (index < 0) {
        remainingList.push(iterator);
      }
    }
    return remainingList;
  }

  findRemaningPatternWithCombinationStd(expectedRemaining, candidate) {
    if (this.standardList.length === 0) {
      return false;
    }
    const MAX_QTY = 5;

    const items = orderBy(this.standardList, ['w', 'h'], ['asc']);
    let maxQty = maxBy(items, 'qty').qty;
    if (maxQty > MAX_QTY) {
      maxQty = MAX_QTY;
    }
    // console.log('maxQty:', maxQty);
    for (let index = 0; index < +maxQty; index++) {
      const currentQty = index + 1;
      for (const std of items) {
        if (+std.qty < currentQty) {
          continue;
        }
        const list = flatten(Array(currentQty).fill(std.wood_list));

        let combinations = [[]];
        const combinationsKey = { '': true };
        for (let i = 0; i < list.length; i++) {
          const value = list[i];
          const currentCombinations = [...combinations];
          for (let j = 0; j < currentCombinations.length; j++) {
            const combination = currentCombinations[j];
            const currentPattern = [...combination, value];
            const sumPattern = sum(currentPattern);
            const keyPattern = currentPattern.join('|');
            const isDuplicate = combinationsKey[keyPattern];
            if (isDuplicate) {
              continue;
            }
            if (sumPattern > this.woodLength) {
              continue;
            }

            const remaining = expectedRemaining - sumPattern;

            if (remaining < 0) {
              continue;
            }

            if (remaining < candidate) {
              const temp = {
                used_pattern: currentPattern.join(','),
                used_pattern_list: currentPattern,
                remaining_pattern_list: this.findRemainingList(
                  list,
                  currentPattern,
                ),
                pattern_wood_list: list,
                sum: sumPattern,
                remaining,
                std: {
                  ...std,
                  qty: currentQty,
                },
              };

              // ลบออกจาก std list
              this.removeSelectedPatternFromStdList(temp.std);
              return temp;
            }

            combinations = [...combinations, currentPattern];
            combinationsKey[keyPattern] = true; // for checking duplicate
          }
        }
      }
    }
  }

  findProductionWoodList(frames) {
    const result = [];
    for (const item of frames) {
      item.hight = item.height ?? item.hight;
      const w = item.width + this.faceWidth * 2 + this.sparePart * 2;
      const h = item.hight + this.faceWidth * 2 + this.sparePart * 2;
      const value = {
        ...item,
        w,
        h,
        // hight: item?.height ?? item?.hight,
        wood_list: [w, w, h, h],
      };
      result.push(value);
    }

    return result;
  }

  prepareResponseV2() {
    const response = [];
    const responseSuggest = [];
    for (const item of this.finalResult) {
      response.push({
        wood: item.wood,
        woodFromStock: item.form_stock,
        woodType:
          parser(item.wood) === parser(this.woodLength) ? 'full' : 'part',
        list: item.pattern_list,
        remaining: item.remaining,
        std: item.std,
      });

      if (item.std) {
        const found = responseSuggest.find(
          (val) =>
            val.size === `${item.std?.width}x${item.std?.hight}` &&
            val.qty > item.std.qty,
        );
        if (!found) {
          responseSuggest.push({
            // wood: item.std?.qty,
            ...item.std,
            size: `${item.std?.width}x${item.std?.hight}`,
            qty: item.std.qty,
            // list: item.pattern_list,
            // info: item.std,
            // remaining: item.remaining,
            woodType:
              parser(item.wood) === parser(this.woodLength) ? 'full' : 'part',
          });
        }
      }
    }

    return {
      response,
      responseSuggest,
    };
  }
}

export default ImproveCoreAlgorithm;
