const { cloneDeep } = require("lodash");
const PrepareCutting = require("./helper/prepare-cutting");

const stocks = [
  // {size: '5x7',woodWidth: 1,qty: 1,},
  {size: '15x21',woodWidth: 1,qty: 12,},
  // {size: '15x21',woodWidth: 1,qty: 5,},
  { size: "8x10", woodWidth: 1, qty: 5 },
  { size: "6x8", woodWidth: 1, qty: 1 },
];

const test = () => {
  const copySuggest = cloneDeep(stocks).map((item) => {
    const ordered = PrepareCutting.prepare([
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
      totalLength: (dimensionW *  2) + (dimensionH * 2),
      ...ordered[0],
    };
  });
  return copySuggest;
};

const stdOrderList = test();

module.exports = { stdOrderList, stocks };
