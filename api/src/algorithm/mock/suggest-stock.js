const { cloneDeep, orderBy } = require('lodash');
const PrepareCutting = require('../helper/prepare-cutting');
const { SPARE_PARTS } = require('./config');

const stocks = [
  // {size: '8x10',woodWidth: 1,qty: 12,},
  // {size: '6x8',woodWidth: 1,qty: 5,},

  // {size: '12x15',woodWidth: 1,qty: 5,},
  // {size: '10x15',woodWidth: 1,qty: 12,},
  // {size: '8.24x11.69',woodWidth: 1,qty: 2,},
  // {size: '8x10',woodWidth: 1,qty: 1,},
  // {size: '6x8',woodWidth: 1,qty: 5,},

  { size: '5x7', woodWidth: 1, qty: 1 },
  { size: '6x8', woodWidth: 1, qty: 5 },
  { size: '8x10', woodWidth: 1, qty: 1 },
  { size: '12x15', woodWidth: 1, qty: 3 },
  { size: '15x21', woodWidth: 1, qty: 5 },

  // SELECT *, (reorder_point - stock) as qty FROM standard_frame_stock
  // INNER JOIN standard_frame ON standard_frame_stock.standard_frame_id = standard_frame.id
  // where standard_frame_stock.wood_id = 4

  // {size: '12x15',woodWidth: 1,qty: 2,},
  // {size: '10x15',woodWidth: 1,qty: 2,},
  // {size: '8.24x11.69',woodWidth: 1,qty: 2,},
  // {size: '8x10',woodWidth: 1,qty: 2,},
  // {size: '6x8',woodWidth: 1,qty: 2,},

  // // {size: '5x7',woodWidth: 1,qty: 1,},
  // {size: '15x21',woodWidth: 1,qty: 12,},
  // // {size: '15x21',woodWidth: 1,qty: 5,},
  // { size: "8x10", woodWidth: 1, qty: 5 },
  // { size: "6x8", woodWidth: 1, qty: 1 },

  // OK
  // { size: "12x15", woodWidth: 1, qty: 5 },
  // { size: "12x15", woodWidth: 1, qty: 1 },
  // { size: "10x15", woodWidth: 1, qty: 12 },
  // { size: "8.24x11.69", woodWidth: 1, qty: 2 },
  // { size: "8x10", woodWidth: 1, qty: 5 },
  // { size: "6x8", woodWidth: 1, qty: 1 },
  // { size: "10x15", woodWidth: 1, qty: 12 },
];

const test = () => {
  const copySuggest = cloneDeep(stocks).map((item) => {
    const ordered = PrepareCutting.prepare(
      [
        {
          ...item,
          // qty: 1,
        },
      ],
      SPARE_PARTS,
    );

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
  // console.log('copySuggest:', copySuggest);

  // return copySuggest;
};

const stdOrderList = test();

module.exports = { stdOrderList, stocks };
