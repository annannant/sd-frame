const { groupBy, sortBy, sum } = require("lodash");

const numbers = [
  32.5, 32.5, 22.5, 22.5, 32.5, 32.5, 22.5, 22.5, 31, 31, 22.5, 22.5, 28.5,
  28.5, 22.5, 22.5, 27.5, 27.5, 26.5, 26.5, 26.5, 26.5, 14.5, 14.5, 26.5, 26.5,
  14.5, 14.5, 26.5, 26.5, 15.5, 15.5, 26.5, 26.5, 15.5, 15.5, 26.5, 26.5, 22.5,
  22.5, 25.5, 25.5, 14.5, 14.5, 25.5, 25.5, 18, 18, 25.5, 25.5, 19.5, 19.5,
  23.5, 23.5, 17.5, 17.5, 22.5, 22.5, 12.5, 12.5, 22.5, 22.5, 12.5, 12.5, 22.5,
  22.5, 17.5, 17.5, 22.5, 22.5, 17.5, 17.5, 22.5, 22.5, 17.5, 17.5, 22.5, 22.5,
  22.5, 22.5, 20.5, 20.5, 12.5, 12.5, 20.5, 20.5, 12.5, 12.5, 9.5, 9.5, 7.5,
  7.5, 9.5, 9.5, 7.5, 7.5, 9.5, 9.5, 7.5, 7.5, 9.5, 9.5, 7.5, 7.5, 9.5, 9.5,
  7.5, 7.5, 9.5, 9.5, 7.5, 7.5, 9.5, 9.5, 7.5, 7.5, 9.5, 9.5, 7.5, 7.5, 9.5,
  9.5, 7.5, 7.5, 9.5, 9.5, 7.5, 7.5, 9.5, 9.5, 7.5, 7.5, 9.5, 9.5, 7.5, 7.5,
  9.5, 9.5, 7.5, 7.5,
];

const groupedKeys = groupBy(sortBy(numbers).reverse());
console.log("groupedKeys:", Object.keys(groupedKeys));
for (let key of Object.keys(groupedKeys)) {
  const element = groupedKeys[key];
console.log(+key, ":", element.join(","), ` sum (${sum(element)})` );
  // console.log(key, ":", sum(element), element.join(","));
  // console.log(key, ":", element.join(","));

  // grouped.push({
  //   value: element,
  //   count: element.length,
  // });
  // grouped['count'] = grouped[key].length
}


const result = []
const grouped = groupedKeys
for (const key in grouped) {
  let max = 1;

  // find max
  for (let index = 0; index < grouped[key].length; index++) {
    const cal = parseFloat(key) * (index + 1);
    if (cal <= 120) {
      max = index + 1;
    }
  }

  // slice
  const sliced = grouped[key].slice(0, max);

console.log(+key, ":", sliced.join(","), ` sum (${+sum(sliced)})` );

  result.push(sliced);
  // console.log('max:', max, grouped[key], )
}
