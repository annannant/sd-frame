const { orderBy, groupBy } = require("lodash");
const { v4: uuidv4 } = require("uuid");
const PrepareCutting = require("./helper/prepare-cutting");
const helper = require("./helper");

const sparePart = 0.25;

const orders = [
  {size: '10x12',woodWidth: 1,qty: 5,},
  {size: '10x15',woodWidth: 1,qty: 8,},
  {size: '11x14',woodWidth: 1,qty: 1,},
  {size: '12x18',woodWidth: 1,qty: 10,},
  {size: '12x24',woodWidth: 1,qty: 1,},
  {size: '12x30',woodWidth: 1,qty: 1,},
  {size: '15x20',woodWidth: 1,qty: 2,},
  {size: '18x23',woodWidth: 1,qty: 1,},
  {size: '29x10',woodWidth: 1,qty: 2,},
  {size: '4x6',woodWidth: 1,qty: 7,},
  {size: '6x8',woodWidth: 1,qty: 20,},
  {size: '8.27x11.69',woodWidth: 1,qty: 15,},
  {size: '8x10',woodWidth: 1,qty: 20,},
  {size: '8x12',woodWidth: 1,qty: 4,},
];

const test = () => {
  const ordered = PrepareCutting.prepare(orders);
  // return ordered.map((item)=> {
  //   return item.cutting
  // })
  return ordered;
};

const result = test();
// // for cal
// result.forEach((element) => {
//   console.log(element.cutting, ',');
// });

// for print
const grouped = groupBy(result, "size");
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
    const name = index === 0 ? `${element.name} ; ${element.qty} ; ` : ";;";
    console.log(name, val, ",");
  });
});
// console.log('res:', res)
