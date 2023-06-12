const { orderBy } = require("lodash");
const { v4: uuidv4 } = require("uuid");
const PrepareCutting = require("./helper/prepare-cutting");
const helper = require("./helper");

const sparePart = 0.25;

const orders = [
  {
    size: "24x25",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "12x24",
    woodWidth: 1,
    qty: 2,
  },
  {
    size: "12x23",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "20x20",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "10x12",
    woodWidth: 1,
    qty: 3,
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

const test = () => {
  const ordered = PrepareCutting.prepare(orders)
  return ordered.map((item)=> {
    return item.cutting
  })
};

const result = test();
// console.log(result)
result.forEach((element) => {
  console.log(element, ',');
});
