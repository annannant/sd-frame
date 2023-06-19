const { cloneDeep } = require("lodash");
const PrepareCutting = require("./helper/prepare-cutting");

const stocks = [
  { size: "12x15", woodWidth: 1, qty: 5 },
  { size: "10x15", woodWidth: 1, qty: 12 },
  { size: "8.24x11.69", woodWidth: 1, qty: 2 },
  { size: "8x10", woodWidth: 1, qty: 1 },
  { size: "6x8", woodWidth: 1, qty: 5 },
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
