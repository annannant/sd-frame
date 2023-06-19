const { orderBy, groupBy } = require("lodash");
const { v4: uuidv4 } = require("uuid");
const PrepareCutting = require("./helper/prepare-cutting");
const helper = require("./helper");

const sparePart = 0.25;

const orders = [
  {size: '12x15',woodWidth: 1,qty: 1},
{size: '10x15',woodWidth: 1,qty: 1},
{size: '8.24x11.69',woodWidth: 1,qty: 1},
{size: '8x10',woodWidth: 1,qty: 1},
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
