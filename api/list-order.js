const { orderBy, groupBy } = require("lodash");
const { v4: uuidv4 } = require("uuid");
const PrepareCutting = require("./helper/prepare-cutting");
const helper = require("./helper");

const sparePart = 0.25;

const orders = [
  { size: "10x12", woodWidth: 1, qty: 11 },
  { size: "10x15", woodWidth: 1, qty: 12 },
  { size: "10x18", woodWidth: 1, qty: 2 },
  { size: "10x20", woodWidth: 1, qty: 2 },
  { size: "12x15", woodWidth: 1, qty: 5 },
  { size: "12x18", woodWidth: 1, qty: 13 },
  { size: "12x23", woodWidth: 1, qty: 1 },
  { size: "12x24", woodWidth: 1, qty: 2 },
  { size: "13x24", woodWidth: 1, qty: 2 },
  { size: "15.5x23", woodWidth: 1, qty: 1 },
  { size: "15x20", woodWidth: 1, qty: 3 },
  { size: "17x23", woodWidth: 1, qty: 1 },
  { size: "20x20", woodWidth: 1, qty: 1 },
  { size: "20x24", woodWidth: 1, qty: 1 },
  { size: "20x26", woodWidth: 1, qty: 1 },
  { size: "20x28.5", woodWidth: 1, qty: 1 },
  { size: "20x30", woodWidth: 1, qty: 2 },
  { size: "21x15", woodWidth: 1, qty: 1 },
  { size: "24x25", woodWidth: 1, qty: 1 },
  { size: "11.61x16.34", woodWidth: 1, qty: 2 },
  { size: "8x12", woodWidth: 1, qty: 12 },
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
    const name = index === 0 ? `${element.name} : ${element.qty} : ` : "::";
    console.log(name, val, ",");
  });
});
// console.log('res:', res)
