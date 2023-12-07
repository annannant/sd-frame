const { sum, sortBy, cloneDeep, sumBy, orderBy, groupBy } = require('lodash');
const printAlgo = false;

class CoreAlgorithm {
  woodLength: number;
  minLength: number;
  sparePart: number;
  summaryTotalCutting = [];

  constructor(woodLength, minLength, sparePart) {
    this.woodLength = woodLength;
    this.minLength = minLength;
    this.sparePart = sparePart;
  }

  scale(number) {
    console.log('number:', number);
    console.log('woodLength:', this.woodLength);
    console.log('minLength:', this.minLength);
    console.log('sparePart:', this.sparePart);
  }

  test(params) {
    this.scale(params + 1);
  }
  prepare = (orders) => {
    const formatted = [];
    const summary = [];
    for (const [index, item] of orders.entries()) {
      let width = item.width;
      let height = item.height;
      if (item.width == undefined && item.height == undefined) {
        const splitSize = item.size
          .split('x')
          .map((v) => Number(v.trim()))
          .sort((a, b) => Number(a) - Number(b));
        const [w, h] = splitSize;
        width = w;
        height = h;
      }

      const dimensionW = parseFloat(
        (width + item.woodWidth * 2 + this.sparePart * 2).toFixed(2),
      );
      const dimensionH = parseFloat(
        (height + item.woodWidth * 2 + this.sparePart * 2).toFixed(2),
      );

      const orderNo = index + 1;
      const convert = {
        ...item,
        orderNo,
        width,
        height,
        dimensionW,
        dimensionH,
      };

      summary.push({
        ...convert,
        dimensionWQty: convert.qty * 2,
        dimensionHQty: convert.qty * 2,
        size: `${convert.width}x${convert.height}`,
      });

      // split qty
      for (let idx = 0; idx < item.qty; idx++) {
        const set = idx + 1;
        for (let ihx = 0; ihx < 2; ihx++) {
          formatted.push({
            ...convert,
            set,
            cuttingName: `h${ihx + 1}`,
            cutting: dimensionH,
          });
        }
        for (let iwx = 0; iwx < 2; iwx++) {
          formatted.push({
            ...convert,
            set,
            cuttingName: `w${iwx + 1}`,
            cutting: dimensionW,
          });
        }
      }
    }

    this.summaryTotalCutting = summary;

    const ordered = orderBy(formatted, ['height'], 'desc').map((item) => ({
      ...item,
      key: 'uuidv4',
      // (),
    }));
    return ordered;
  };

  totalCutting = (list, print = false) => {
    const ordered = this.prepare(list);
    const cutting = ordered.map((item) => {
      return item.cutting;
    });
    // console.log("ordered:", cutting);
    // return
    if (print) {
      // for print
      const grouped = groupBy(ordered, 'size');
      const res = [];
      for (const key of Object.keys(grouped)) {
        const item = grouped[key].map((item) => {
          return item.cutting;
        });
        res.push({
          name: key,
          qty: grouped[key][0].qty,
          value: item,
        });
      }

      res.forEach((element) => {
        element.value.forEach((val, index) => {
          const name =
            index === 0 ? `${element.name} ; ${element.qty} ; ` : ';;';
          console.log(name, val, ',');
        });
      });
    }

    console.log(sum(cutting));
    return cutting;
  };

  totalStdList = (stocks) => {
    const copySuggest = cloneDeep(stocks).map((item) => {
      const ordered = this.prepare([
        {
          ...item,
          // qty: 1,
        },
      ]);

      const { dimensionW, dimensionH } = ordered[0];

      return {
        ...item,
        dimensionW,
        dimensionH,
        woodList: [dimensionW, dimensionW, dimensionH, dimensionH],
        totalLength: dimensionW * 2 + dimensionH * 2,
        ...ordered[0],
      };
    });

    const sorting = orderBy(copySuggest, ['width', 'height'], ['desc']);
    return sorting;
    // return copySuggest;
  };

  // ----------------- START: ALGO -----------------
  findCombinations(
    numbers,
    remainWoodStock,
    copyStdOrderList,
    sumWoodRemaingSuggest = 0,
    sumWoodRemaingNonzero = 0,
  ) {
    // console.log('sumWoodRemaingNonzero:', sumWoodRemaingNonzero)
    // console.log('sumWoodRemaingSuggest:', sumWoodRemaingSuggest)
    const combinations = [[]];

    let lowest = 99999999;
    let lowestUsedWood = null;

    let lowestStd = 99999999;
    let lowestUsedWoodStd = null;

    for (let i = 0; i < numbers.length; i++) {
      if (printAlgo) {
        console.log('----', i + 1, ';', numbers[i]);
      }

      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const current = [...currentCombinations[j], numbers[i]];

        // chec duplicate pattern
        const found = currentCombinations
          .map((item) => item.join('|'))
          .find((item) => item === current.join('|'));
        if (found) {
          if (printAlgo) {
            console.log(
              j + 1,
              ';',
              currentCombinations[j],
              ';',
              current,
              '** dup',
            );
          }
          continue;
        }

        // if more than 120
        const sumvalue = sum(current);
        if (sumvalue > this.woodLength) {
          if (printAlgo) {
            console.log(
              j + 1,
              ';',
              currentCombinations[j],
              ';',
              current,
              '** > 120',
            );
          }

          continue;
        }

        // // if patter is std all
        // if (copyStdOrderList.length) {
        //   const hasOrginal = checkPatternHasNumbers(originalNumbers, current)
        //   if (!hasOrginal) {
        //     continue
        //   }
        // }

        // check remaining stock
        const pattern = current.join(',');
        const woods = [...remainWoodStock, this.woodLength];
        if (printAlgo) {
          console.log(j + 1, ';', currentCombinations[j], ';', current);
        }
        // console.log('-----------------> wood')

        // START - WOOD
        for (let r = 0; r < woods.length; r++) {
          const wood = woods[r];
          const afterUseWood = wood - sumvalue;
          const data = {
            i,
            j,
            from_stock: wood !== this.woodLength,
            wood,
            pattern: pattern,
            sum: sum(current),
            remaning: afterUseWood,
            use_stock_first: false,
          };
          if (printAlgo) {
            console.log(
              ';',
              ';',
              ';',
              r + 1,
              ';',
              wood,
              ';',
              sumvalue,
              ';',
              `${wood}-${sumvalue}`,
              ';',
              afterUseWood,
            );
          }

          if (
            data.from_stock &&
            afterUseWood > 0 &&
            afterUseWood <= this.minLength
          ) {
            return {
              ...data,
              use_stock_first: true,
            };
          }

          if (afterUseWood === 0) {
            return data;
          }

          if (afterUseWood > 0 && copyStdOrderList.length) {
            // if (afterUseWood > 0 && copyStdOrderList.length && afterUseWood <= maxWoodItemStd &&  (maxWoodItemStd - afterUseWood <= this.minLength)) {
            const find = this.compareWithStd(data, copyStdOrderList);

            const ok =
              sumWoodRemaingSuggest + find?.after_cut <= sumWoodRemaingNonzero;
            if (find && ok) {
              const newPattern = [
                ...find.pattern,
                ...data.pattern.split(',').map((val) => +val),
              ];
              const newData = {
                ...data,
                std: { ...find },
                original_pattern: data.pattern,
                pattern: newPattern.join(','),
                sum: sum(newPattern),
                remaning: find.after_cut,
                remain_pattern: find.remain_pattern,
                use_std_wood: true,
              };
              if (find?.after_cut === 0) {
                return {
                  use_std_wood: true,
                  ...newData,
                };
              }
              // if (find?.after_cut < lowestStd) {
              //   lowestStd = find?.after_cut;
              //   console.log('newData:', newData)
              //   lowestUsedWoodStd = newData;
              // }
              if (find?.after_cut < lowest) {
                lowest = find?.after_cut;
                lowestUsedWood = newData;
              }
            }
          }

          if (afterUseWood > 0 && afterUseWood < lowest) {
            lowest = afterUseWood;
            lowestUsedWood = data;
          }
        }

        // END - WOOD
        //
        // console.log("remainWoodStock:", remainWoodStock);
        // console.log("sumvalue:", current, sumvalue);
        // console.log('current:', current)
        // console.log('combinations:', combinations)
        combinations.push(current);
        if (printAlgo) {
          // console.log(
          //   ";",
          //   ";",
          //   ";",
          //   ";",
          //   ";",
          //   ";",
          //   ";",
          //   ";",
          //   ";",
          //   JSON.stringify(combinations)
          // );
        }
      }
    }

    // console.log("lowestUsedWood:", lowestUsedWood);

    // console.log(' lowestUsedWood remainList:', remainList)
    // console.log('lowestUsedWoodStd:', lowestUsedWoodStd)

    // if (lowestUsedWoodStd) {
    //   return {
    //     use_std_wood: true,
    //     ...lowestUsedWoodStd,
    //   };
    // }

    return lowestUsedWood;
    //   console.log('lowestUsedWood:', lowestUsedWood)
    // console.log('selectedCombinations:', selectedCombinations)
  }

  removeSelectedPatternFromList(copyNumber, selected) {
    // ===================== START: DELETE WITH MULTI =================
    // const selectedArray = selected.pattern.split(",");

    // const group = {};
    // for (const iterator of selectedArray) {
    //   if (!group[iterator]) group[iterator] = [];
    //   group[iterator].push(iterator);
    // }

    // // check จำนวน
    // for (const iterator of Object.keys(group)) {
    //   const found = copyNumber.filter((number) => number == iterator).length;
    //   if (found < group[iterator].length) {
    //     return {
    //       copyNumber,
    //       multiply: 1
    //     };
    //   }
    // }

    // // delete
    // if (!selected.from_stock) {
    //   console.log("", selected.pattern);
    // }

    // for (const iterator of selectedArray) {
    //   let deletIndex = copyNumber.indexOf(+iterator);
    //   if (deletIndex > -1) {
    //     copyNumber.splice(deletIndex, 1);
    //   }
    // }

    // if (selected.from_stock) {
    //   return {
    //     copyNumber,
    //     multiply: 1
    //   };
    // }

    // return removeSelectedPatternFromList(copyNumber, selected);
    // ===================== END: DELETE WITH MULTI =================

    let selectedArray = selected.pattern.split(',');
    if (selected?.use_std_wood) {
      selectedArray = selected.original_pattern.split(',');
    }

    // delete
    if (!selected.from_stock) {
      console.log('', selected.pattern);
    }

    for (const iterator of selectedArray) {
      let deletIndex = copyNumber.indexOf(+iterator);
      if (deletIndex > -1) {
        copyNumber.splice(deletIndex, 1);
      }
    }

    return {
      copyNumber: [...copyNumber, ...(selected?.remain_pattern ?? [])],
      multiply: 1,
    };
  }

  removeSelectedWoodFromStock(remainWoodStock, selected) {
    console.log('', selected.pattern, ',:wood,', selected.wood);
    const deletIndex = remainWoodStock.indexOf(+selected.wood);
    if (deletIndex > -1) {
      remainWoodStock.splice(deletIndex, 1);
      if (+selected.remain > 0) {
        remainWoodStock.push(+selected.remain);
      }
    }
    return remainWoodStock;
  }

  getCombination(list) {
    const combinations = [[]];
    for (let i = 0; i < list.length; i++) {
      const currentCombinations = [...combinations];
      for (let j = 0; j < currentCombinations.length; j++) {
        const current = [...currentCombinations[j], list[i]];
        // check duplicate pattern
        const found = currentCombinations
          .map((item) => item.join('|'))
          .find((item) => item === current.join('|'));
        if (found) {
          continue;
        }
        const sumvalue = sum(current);
        if (sumvalue > this.woodLength) {
          continue;
        }

        const pattern = current.join(',');
        combinations.push(current);
      }
    }

    return combinations;
  }

  getRemainingPattern(pattern, woodList) {
    const woodListCopy = [...woodList];
    for (const iterator of pattern) {
      const index = woodListCopy.indexOf(+iterator);
      if (index >= 0) {
        woodListCopy.splice(index, 1);
      }
    }

    return woodListCopy;
  }

  compareWithStd(data, copyStdOrderList) {
    // console.log('============ strt compare with std ============')
    const remaining = data.remaning;
    const minValue = 999999;
    let selected = undefined;
    for (const std of copyStdOrderList) {
      const combinationList = this.getCombination(std.woodList);
      std.combinations = combinationList;
      for (const pattern of combinationList) {
        const total = sum(pattern);
        if (total == 0) {
          continue;
        }

        const remain = remaining - total;
        // console.log(
        //   pattern,
        //   ";",
        //   total,
        //   ";",
        //   remain,
        //   ";",
        //   remain < 0 || remain >= minLength ? "" : "** selected"
        // );

        if (remain < 0 || remain >= this.minLength) {
          continue;
        }

        // if (remain != 0) {
        //   continue;
        // }
        if (remain < minValue) {
          selected = {
            ...std,
            after_cut: remain,
            main_wood: remaining,
            pattern,
            remain_pattern: this.getRemainingPattern(pattern, std.woodList),
          };
        }
      }
    }

    // console.log('============ end compare with std ============')
    return selected;

    // console.log('selected:', selected)

    //   const sdtList = copyStdOrderList.map((val) => {
    //     const combinations = getCombination(val.woodList)
    //     return {
    //       ...val,
    //       combinations
    //     };
    //   });

    //   const filter = sdtList.reduce((preve, std) => {
    //     let remaingList = []
    //     for (const pattern of std.combinations) {
    //       const total = sum(pattern)
    //       if (total == 0) {
    //         continue
    //       }

    //       const remain = total - remaining;
    //       // console.log(pattern, ';', total, ';', remain)
    //       if (remain < 0 || remain >= this.minLength) {
    //         continue
    //       }

    //       remaingList.push({
    //         after_cut: remain,
    //         // val: val,
    //         main_wood: remaining,
    //         pattern,
    //       })
    //     }

    //     const ordered = orderBy(remaingList, "after_cut", "asc");
    //     if (!ordered[0]) {
    //       return preve
    //     }
    //     return [
    //       ...preve,
    //       {
    //         ...std,
    //         ...ordered[0],
    //       }
    //     ]
    //   }, [])

    //   const selected2 = orderBy(filter, 'after_cut', 'asc')
    //   return selected2[0]

    // const filltered = uniq(stdList).reduce((prev, val) => {
    //   const remain = val - remaining;
    //   if (remain < 0 || remain >= this.minLength) {
    //     return prev;
    //   }
    //   return [
    //     ...prev,
    //     {
    //       after_cut: remain,
    //       val: val,
    //       wood: remaining,
    //     },
    //   ];
    // }, []);
    // const ordered = orderBy(filltered, "after_cut", "asc");
    // return ordered[0];
  }
  core = async (numbers, woodStock, stdOrderList, ordering = 'desc') => {
    console.log('stdOrderList:', stdOrderList);
    let copyNumber = cloneDeep(numbers);
    let remainWoodStock = cloneDeep(woodStock);
    let copyStdOrderList = cloneDeep(stdOrderList);

    // console.log('copyNumber:', copyNumber)
    // console.log('remainWoodStock:', remainWoodStock)

    let remainingCopyNumber = [];
    let remainingCopyWood = [];

    let keptList = [];
    let wastedList = [];
    let pattern = [];
    let nonZeroPattern = [];
    let zeroPattern = [];
    while (copyNumber.length) {
      // เรียง
      let ordered = sortBy(copyNumber);
      if (ordering === 'desc') {
        ordered = sortBy(copyNumber).reverse();
      }

      // find combination
      const selected = this.findCombinations(
        ordered,
        remainWoodStock,
        [],
        0,
        0,
      );
      // copyNumber = []
      pattern.push(selected);
      if (
        !selected.use_stock_first &&
        selected.remaning !== 0 &&
        copyNumber.length > 0 &&
        stdOrderList.length > 0
      ) {
        //
        if (!remainingCopyNumber.length) {
          remainingCopyNumber = [...copyNumber];
        }

        // if (!remainingCopyWood.length) {
        //   remainingCopyWood = [...remainWoodStock];
        // }

        //
        if (selected.remaning >= this.minLength) {
          keptList.push(selected.remaning);
        } else {
          wastedList.push(selected.remaning);
        }
        nonZeroPattern.push(selected);
      } else {
        zeroPattern.push(selected);
      }

      if (selected.from_stock || selected.use_stock_first) {
        const removedWood = this.removeSelectedWoodFromStock(
          remainWoodStock,
          selected,
        );
        remainWoodStock = [...removedWood];
      }

      // pop list from copy of number
      const { copyNumber: poped } = this.removeSelectedPatternFromList(
        copyNumber,
        selected,
      );
      // console.log("poped:", poped.length);

      copyNumber = [...poped];
      // console.log('[...poped]:', JSON.stringify([...poped]))
    }

    // START - test standard
    // console.log('keptList:', keptList)
    // console.log('wastedList:', wastedList)
    // console.log('xx copyNumber:', remainingCopyNumber)
    // console.log('xx remainingCopyWood:', remainingCopyWood)

    // test
    // remainingCopyNumber = [...copyNumber]

    let suggestPattern;
    if (remainingCopyNumber.length) {
      console.log('==================== start suggest ====================');
      // console.log(
      //   "sum remainingCopyNumber:",
      //   sum(remainingCopyNumber) + sumBy(zeroPattern, "sum")
      // );
      const sumWoodRemaingNonzero = sumBy(
        nonZeroPattern.filter((item) => item.remaning < this.minLength),
        'remaning',
      );

      console.log('remainingCopyNumber:', remainingCopyNumber);
      console.log('remainWoodStock:', remainWoodStock);
      suggestPattern = await this.suggestV2(
        remainingCopyNumber,
        remainWoodStock,
        sumWoodRemaingNonzero,
        stdOrderList,
      );

      const sumWoodRemaingSuggest = sumBy(
        suggestPattern.pattern.filter((item) => item.remaning < this.minLength),
        'remaning',
      );
      console.log('sumWoodRemaingSuggest:', sumWoodRemaingSuggest);
      console.log('sumWoodRemaingNonzero:', sumWoodRemaingNonzero);

      if (sumWoodRemaingSuggest > sumWoodRemaingNonzero) {
        suggestPattern = null;
      }
    }

    return {
      keptList,
      wastedList,
      kept: sum(keptList),
      wasted: sum(wastedList),
      pattern,
      zeroPattern,
      suggestPattern,
      remainWoodStock,
    };
  };
  findUseStd = (copyStdOrderList, data) => {
    let find = null;
    for (const item of copyStdOrderList) {
      const found = item.size == data.std.size;
      if (!found || find) {
        continue;
      }
      item.qty -= 1;
      find = { ...item };
    }

    return {
      newCopyStdOrderList: [...copyStdOrderList],
      // try_pattern: find.woodList,
      stdSelected: {
        ...find,
        qty: 1,
      },
      // copy_std_order_list: copyStdOrderList,
    };
  };

  suggestV2 = async (
    numbers,
    woodStock,
    sumWoodRemaingNonzero,
    stdOrderList,
    ordering = 'desc',
  ) => {
    let copyNumber = cloneDeep(numbers);
    let remainWoodStock = cloneDeep(woodStock);
    let copyStdOrderList = cloneDeep(stdOrderList);

    // console.log('remainWoodStock:', remainWoodStock)
    // console.log('copyStdOrderList:', )

    let keptList = [];
    let wastedList = [];
    let pattern = [];
    let zeroPattern = [];
    let stdSelectedList = [];

    let sumWoodRemaingSuggest = 0;
    console.log('sumWoodRemaingNonzero:', sumWoodRemaingNonzero);

    while (copyNumber.length) {
      // เรียง
      let ordered = sortBy(copyNumber);
      if (ordering === 'desc') {
        ordered = sortBy(copyNumber).reverse();
      }

      const tryCopyStdOrderList = copyStdOrderList.filter((val) => val.qty > 0);

      // // compare orginal vs std
      const selected = this.findCombinations(
        ordered,
        remainWoodStock,
        tryCopyStdOrderList,
        sumWoodRemaingSuggest,
        sumWoodRemaingNonzero,
      );
      pattern.push(selected);
      //
      sumWoodRemaingSuggest += selected.remaning ?? 0;
      // console.log('xxsumWoodRemaingSuggest:', sumWoodRemaingSuggest)
      if (selected?.use_std_wood) {
        // remove qty from std
        const { newCopyStdOrderList, stdSelected } = this.findUseStd(
          copyStdOrderList,
          selected,
        );
        copyStdOrderList = [...newCopyStdOrderList];

        // if remaing pattern push to number

        // console.log('selected:', selected)
        // // add list of std to copy number
        // // remove from std list
        // const {
        //   try_pattern: tryPattern,
        //   copy_std_order_list: newStd,
        //   std_selected: stdSelected,
        // } = findUseStd(copyStdOrderList, selected?.std);

        // // pattern
        // // console.log('selected:', selected)

        // tryPatternList = [...tryPatternList, ...tryPattern]
        // copyNumber = [...copyNumber, ...tryPattern];
        // copyStdOrderList = [...newStd];
        stdSelectedList.push(stdSelected);
        // continue;
      }

      if (
        !selected.use_stock_first &&
        selected.remaning !== 0 &&
        copyNumber.length > 0 &&
        // stdOrderList.length > 0
        copyStdOrderList.length > 0
      ) {
        //
        if (selected.remaning >= this.minLength) {
          keptList.push(selected.remaning);
        } else {
          wastedList.push(selected.remaning);
        }
      } else {
        zeroPattern.push(selected);
      }

      if (selected.from_stock || selected.use_stock_first) {
        const removedWood = this.removeSelectedWoodFromStock(
          remainWoodStock,
          selected,
        );
        remainWoodStock = [...removedWood];
      }

      // pop list from copy of number
      const { copyNumber: poped } = this.removeSelectedPatternFromList(
        copyNumber,
        selected,
      );
      // console.log("poped:", poped.length);

      // if (selected?.use_std_wood && selected.remain_pattern.length) {
      //   copyNumber = [...selected.remain_pattern]
      // }

      copyNumber = [...poped];
    }

    return {
      pattern,
      stdList: stdSelectedList,
    };
  };

  printResult(allPattern, zeroPattern, suggestPattern) {
    console.log('==================== result ====================');

    if (suggestPattern) {
      let sumStd = 0;
      let sumZero = 0;
      let sumSuggest = 0;

      if (zeroPattern) {
        for (const item of zeroPattern) {
          const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
          console.log(item.pattern, wood);
          sumZero += sum(item.pattern.split(',').map((val) => +val));
        }
      }

      console.log('==================== suggest ====================');
      for (const item of suggestPattern.pattern) {
        const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
        console.log(item.pattern, wood);
        sumSuggest += sum(item.pattern.split(',').map((val) => +val));
      }
      console.log('==================== STD LIST ====================');
      for (const iterator of suggestPattern.stdList) {
        sumStd += sum(iterator.woodList);
        console.log(
          '',
          iterator.size,
          ',',
          iterator.qty,
          ',',
          iterator.woodList,
          ',',
          sum(iterator.woodList),
        );
      }

      console.log('sum: ', sumZero + sumSuggest - sumStd);
      console.log('sumStd:', sumStd);
      console.log('sumSuggest:', sumSuggest);
      console.log('sumZero:', sumZero);
    } else {
      if (allPattern) {
        for (const item of allPattern) {
          const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
          console.log(item.pattern, wood);
        }
      }
    }
  }

  prepareResponse(allPattern, zeroPattern, suggestPattern) {
    const response = [];
    const responseSuggest = [];
    let no = 1;
    let noStd = 1;
    if (suggestPattern) {
      let sumStd = 0;
      let sumZero = 0;
      let sumSuggest = 0;

      if (zeroPattern) {
        for (const item of zeroPattern) {
          const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
          console.log(item.pattern, wood);
          sumZero += sum(item.pattern.split(',').map((val) => +val));
          const responseWood = item.from_stock ? item.wood : this.woodLength;
          const responseList = item.pattern.split(',').map((val) => +val);
          response.push({
            no,
            wood: responseWood,
            woodFromStock: !!item.from_stock,
            list: responseList,
            remaining: responseWood - sum(responseList),
          });
          no++;
        }
      }

      console.log('==================== suggest ====================');
      for (const item of suggestPattern.pattern) {
        const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
        console.log(item.pattern, wood);
        sumSuggest += sum(item.pattern.split(',').map((val) => +val));

        const responseWood = item.from_stock ? item.wood : this.woodLength;
        const responseList = item.pattern.split(',').map((val) => +val);
        response.push({
          no,
          wood: responseWood,
          woodFromStock: !!item.from_stock,
          list: responseList,
          remaining: responseWood - sum(responseList),
        });
        no++;
      }
      console.log('==================== STD LIST ====================');
      for (const iterator of suggestPattern.stdList) {
        sumStd += sum(iterator.woodList);
        console.log(
          '',
          iterator.size,
          ',',
          iterator.qty,
          ',',
          iterator.woodList,
          ',',
          sum(iterator.woodList),
        );

        const responseWood = iterator.from_stock
          ? iterator.wood
          : this.woodLength;
        const responseList = iterator.woodList;

        responseSuggest.push({
          no: noStd,
          wood: responseWood,
          size: iterator.size,
          qty: iterator.qty,
          list: responseList,
          info: iterator,
          remaining: responseWood - sum(responseList),
        });
        noStd++;
      }

      console.log('sum: ', sumZero + sumSuggest - sumStd);
      console.log('sumStd:', sumStd);
      console.log('sumSuggest:', sumSuggest);
      console.log('sumZero:', sumZero);
    } else {
      if (allPattern) {
        for (const item of allPattern) {
          const wood = item.from_stock ? `, :wood , ${item.wood}` : '';
          console.log(item.pattern, wood);
          response.push({
            no,
            wood: item.from_stock ? item.wood : this.woodLength,
            woodFromStock: !!item.from_stock,
            list: item.pattern.split(',').map((val) => +val),
          });
          no++;
        }
      }
    }

    return {
      response,
      responseSuggest,
    };
  }
}

// class CoreAlgorithm {
//   woodLength: number;
//   minLength: number;
//   sparePart: number;

//   constructor(n: number, m: number, s: number) {
//     this.woodLength = n;
//     this.minLength = m;
//     this.sparePart = s;
//   }

//   scale(n: number, m: number, s: number): void {
//     this.woodLength = n;
//     this.minLength = m;
//     this.sparePart = s;
//   }

//   cutting() {
//     console.log('this.woodLength:', this.woodLength);
//     console.log('this.minLength:', this.minLength);
//     console.log('this.sparePart:', this.sparePart);
//     return this.woodLength - this.minLength - this.sparePart;
//   }
// }

export default CoreAlgorithm;
