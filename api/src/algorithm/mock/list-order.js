const { orderBy, groupBy } = require('lodash');
const PrepareCutting = require('../helper/prepare-cutting');
const { SPARE_PARTS } = require('./config');

const orders = [
  { size: '6x8', woodWidth: 1, qty: 9 },
  { size: '4x6', woodWidth: 1, qty: 7 },
  { size: '8.27x11.69', woodWidth: 1, qty: 3 },
  { size: '8x12', woodWidth: 1, qty: 2 },
  { size: '10x12 ', woodWidth: 1, qty: 5 },
  { size: '8x10', woodWidth: 1, qty: 10 },
  { size: '29x10', woodWidth: 1, qty: 1 },
  { size: '20x30', woodWidth: 1, qty: 2 },
  { size: '16x20', woodWidth: 1, qty: 2 },
  { size: '10x15', woodWidth: 1, qty: 3 },
  // {size: '24x25',woodWidth: 1,qty: 1,},
  // {size: '12x24',woodWidth: 1,qty: 2,},
  // {size: '12x23',woodWidth: 1,qty: 1,},
  // {size: '20x20',woodWidth: 1,qty: 1,},
  // {size: '10x12',woodWidth: 1,qty: 3,},
  // {size: '10x15',woodWidth: 1,qty: 5,},
  // {size: '8x10',woodWidth: 1,qty: 6,},

  //   {size: '20x30',woodWidth: 1,qty: 2,},
  // {size: '20x28.5',woodWidth: 1,qty: 1,},
  // {size: '20x26',woodWidth: 1,qty: 1,},
  // {size: '24x25',woodWidth: 1,qty: 1,},
  // {size: '12x24',woodWidth: 1,qty: 2,},
  // {size: '13x24',woodWidth: 1,qty: 2,},
  // {size: '20x24',woodWidth: 1,qty: 1,},
  // {size: '12x23',woodWidth: 1,qty: 1,},
  // {size: '15.5x23',woodWidth: 1,qty: 1,},
  // {size: '17x23',woodWidth: 1,qty: 1,},
  // {size: '21x15',woodWidth: 1,qty: 1,},
  // {size: '10x20',woodWidth: 1,qty: 2,},
  // {size: '15x20',woodWidth: 1,qty: 3,},
  // {size: '20x20',woodWidth: 1,qty: 1,},
  // {size: '10x18',woodWidth: 1,qty: 2,},
  // {size: '5x7',woodWidth: 1,qty: 13,},

  // {size: '6x8',woodWidth: 1,qty: 9,},
  // {size: '4x6',woodWidth: 1,qty: 7,},
  // {size: '8.27x11.69',woodWidth: 1,qty: 3,},
  // {size: '8x12',woodWidth: 1,qty: 2,},
  // {size: '10x12 ',woodWidth: 1,qty: 5,},
  // {size: '8x10',woodWidth: 1,qty: 10,},
  // {size: '29x10',woodWidth: 1,qty: 1,},
  // {size: '20x30',woodWidth: 1,qty: 2,},
  // {size: '16x20',woodWidth: 1,qty: 2,},
  // {size: '10x15',woodWidth: 1,qty: 3,},

  // {size: '20x30',woodWidth: 1,qty: 2,},
  // {size: '20x28.5',woodWidth: 1,qty: 1,},
  // {size: '20x26',woodWidth: 1,qty: 1,},
  // {size: '24x25',woodWidth: 1,qty: 1,},
  // {size: '12x24',woodWidth: 1,qty: 2,},
  // {size: '13x24',woodWidth: 1,qty: 2,},
  // {size: '20x24',woodWidth: 1,qty: 1,},
  // {size: '12x23',woodWidth: 1,qty: 1,},
  // {size: '15.5x23',woodWidth: 1,qty: 1,},
  // {size: '17x23',woodWidth: 1,qty: 1,},
  // {size: '21x15',woodWidth: 1,qty: 1,},
  // {size: '10x20',woodWidth: 1,qty: 2,},
  // {size: '15x20',woodWidth: 1,qty: 3,},
  // {size: '20x20',woodWidth: 1,qty: 1,},
  // {size: '10x18',woodWidth: 1,qty: 2,},
  // {size: '5x7',woodWidth: 1,qty: 13,},

  // {size: '20x30',woodWidth: 1,qty: 1,},
  // {size: '20x28.5',woodWidth: 1,qty: 2,},
  // {size: '13x24',woodWidth: 1,qty: 3,},
  // {size: '20x24',woodWidth: 1,qty: 4,},
  // {size: '12x23',woodWidth: 1,qty: 5,},
  // {size: '15.5x23',woodWidth: 1,qty: 6,},
  // {size: '17x23',woodWidth: 1,qty: 7,},
  // {size: '21x15',woodWidth: 1,qty: 8,},
  // {size: '20x20',woodWidth: 1,qty: 9,},
  // {size: '10x18',woodWidth: 1,qty: 10,},
  // {size: '12x18',woodWidth: 1,qty: 11,},
];

const test = () => {
  const ordered = PrepareCutting.prepare(orders, SPARE_PARTS);
  // return ordered.map((item)=> {
  //   return item.cutting
  // })
  return ordered;
};

const totalCutting = (print = false, list = orders) => {
  const ordered = PrepareCutting.prepare(list, SPARE_PARTS);
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
        const name = index === 0 ? `${element.name} ; ${element.qty} ; ` : ';;';
        console.log(name, val, ',');
      });
    });
  }

  return cutting;
};

// const result = test();
totalCutting(true);
// // for cal
// result.forEach((element) => {
//   console.log(element.cutting, ',');
// });

// res.forEach((element) => {
//   element.value.forEach((val, index) => {
//     const name = index === 0 ? `${element.name} ; ${element.qty} ; ` : ";;";
//     console.log(name, val, ",");
//   });
// });
// console.log('res:', res)

module.exports = { orders, totalCutting };
