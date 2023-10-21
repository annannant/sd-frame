const { countBy, orderBy, sortBy } = require("lodash");

const master = [
  27.5, 27.5, 26.5, 26.5, 26.5, 26.5, 14.5, 14.5, 26.5, 26.5, 14.5, 14.5, 25.5,
  25.5, 14.5, 14.5, 22.5, 22.5, 22.5, 22.5, 17.5, 17.5, 12.5, 12.5, 17.5, 17.5,
  12.5, 12.5, 17.5, 17.5, 12.5, 12.5, 17.5, 17.5, 12.5, 12.5, 17.5, 17.5, 12.5,
  12.5, 14.5, 14.5, 12.5, 12.5, 14.5, 14.5, 12.5, 12.5, 14.5, 14.5, 12.5, 12.5,
  12.5, 12.5, 10.5, 10.5, 12.5, 12.5, 10.5, 10.5, 12.5, 12.5, 10.5, 10.5, 12.5,
  12.5, 10.5, 10.5, 12.5, 12.5, 10.5, 10.5, 12.5, 12.5, 10.5, 10.5,
];

const masterStd = [
  10.5, 10.5, 12.5, 12.5, 8.5, 8.5, 10.5, 10.5, 8.5, 8.5, 10.5, 10.5, 8.5, 8.5,
  10.5, 10.5, 8.5, 8.5, 10.5, 10.5, 8.5, 8.5, 10.5, 10.5,
];

const actual = [
  27.5, 27.5, 26.5, 26.5, 22.5, 22.5, 22.5, 17.5, 17.5, 17.5, 26.5, 26.5, 17.5,
  17.5, 17.5, 14.5, 26.5, 26.5, 17.5, 17.5, 17.5, 14.5, 25.5, 25.5, 22.5, 17.5,
  14.5, 14.5, 10.5, 10.5, 14.5, 14.5, 14.5, 14.5, 12.5, 12.5, 12.5, 12.5, 10.5,
  10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 8.5, 8.5, 8.5,
  10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 8.5, 8.5, 8.5, 12.5,
  12.5, 12.5, 12.5, 12.5, 12.5, 10.5, 8.5, 8.5, 8.5, 8.5, 14.5, 14.5, 14.5,
  12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 14.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5,
  12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 10.5,
];

const go = () => {
  const a = countBy(sortBy([...master, ...masterStd]));
  console.log("a:", a);
  const b = countBy(sortBy([...actual]));
  console.log("b:", b);
  
  console.log(JSON.stringify(a) === JSON.stringify(b)); // true
};
go();