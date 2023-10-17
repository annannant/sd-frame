const { orderBy, groupBy, pick, pickBy } = require("lodash");
const { v4: uuidv4 } = require("uuid");
const PrepareCutting = require("./helper/prepare-cutting");
const helper = require("./helper");

const sparePart = 0.25;

const orders = [
  {
    size: "12x15",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "10x15",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "10x12",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "8.24x11.69",
    remark: "A4",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "8x12",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "8x10",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "6x8",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "5x7",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "4x6",
    woodWidth: 1,
    qty: 1,
  },
  // {
  //   size: "8.27x11.69",
  //   woodWidth: 1,
  //   qty: 50,
  // },
  // {
  //   size: "24x12",
  //   woodWidth: 2,
  //   qty: 2,
  // },
  // {
  //   size: "12x23",
  //   woodWidth: 2,
  //   qty: 1,
  // },
  // {
  //   size: "8.27x11.69",
  //   woodWidth: 2,
  //   qty: 5,
  // },
  // {
  //   size: "20x20",
  //   woodWidth: 2,
  //   qty: 5,
  // },
  // {
  //   size: "24x25",
  //   woodWidth: 2,
  //   qty: 10,
  // },
];

const test = (orders) => {
  const ordered = PrepareCutting.prepare(orders);
  return ordered.map((item) => {
    return item.cutting;
  });
};

const group = (orders) => {
  const ordered = PrepareCutting.prepare(orders);
  const grouped = groupBy(ordered, "size");
  const res = [];
  for (const key of Object.keys(grouped)) {
    const item = grouped[key].map((item) => {
      return item.cutting;
    });
    res.push({
      name: key,
      value: item,
    });
  }
  return res;
};

// const result = test(orders);
const result = group(orders);
// for cal
console.log('result:', result.map((item) => item.value))

// for print
// result.forEach((element) => {
//   element.value.forEach((val, index) => {
//     const name = index === 0 ? `${element.name} :` : ''
//     console.log(name, val, ",");
//   });
// });
