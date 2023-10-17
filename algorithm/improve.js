const { orderBy, sortBy } = require("lodash");
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
    size: "24x12",
    woodWidth: 1,
    qty: 1,
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
  // {
  //   size: "4x6",
  //   woodWidth: 1,
  //   qty: 1,
  // },
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
  console.log('ordered:', sortBy(ordered.map(({ cutting })=> cutting)))
  let remaining = 120;
  let wood = 1;
  let currentWood = 0;
  let wested = [];
  let used = [];
  // console.log("ordered:", "ordered");
  // while (ordered.length) {
  //   // console.log('ordered:', ordered)
  //   const item = ordered[0];
  //   const test = remaining - item.cutting >= 0;

  //   helper.findMatching(item.cutting, ordered.slice(0, ordered.length))
  //   return
  //   // if (currentWood !== wood) {
  //   //   currentWood = wood
  //   //   console.log(wood)
  //   // }

  //   // // ถ้าใช้ไม้เดิม
  //   // const testOld = wested
  //   //   .map((w) => {
  //   //     return {
  //   //       wested: w,
  //   //       remaining: parseFloat((w - item.cutting).toFixed(2)),
  //   //     };
  //   //   })
  //   //   .sort((a, b) => a.remaining - b.remaining)
  //   //   .filter((w) => w.remaining >= 0);
  //   // if (testOld.length) {
  //   //   wested = wested.filter((w) => w !== testOld[0].wested);
  //   //   continue;
  //   // }
  //   // console.log("testOld:", testOld);

  //   // // ใช้ไม้ใหม่
  //   helper.log(item, remaining, wood)

  //   if (test) {
  //     remaining = parseFloat((remaining - item.cutting).toFixed(2));
  //     ordered.splice(0, 1);
  //     continue;
  //     // ordered = [...ordered, { ...item, used: true }]
  //   }

  //   // เอาไม้




  //   // // find
  //   // const nearestList = nearest(
  //   //   ordered.filter((item) => !item.used),
  //   //   remaining
  //   // );

  //   // if (nearestList.length) {
  //   //   const found = nearestList[0];
  //   //   ordered = ordered.filter((item) => item.key !== found.key);
  //   //   wested.push(found.remaining);
  //   //   console.log("found:", found);
  //   //   continue;
  //   // }

  //   // ขึ้นไม้ใหม่
  //   wested.push(remaining);

  //   // start
  //   wood++;
  //   remaining = 120;
  //   helper.log(item, remaining, wood)

  //   remaining = parseFloat((remaining - item.cutting).toFixed(2));
  //   ordered.splice(0, 1);
  // }

  // console.log("remaining:", remaining);
  // console.log("wood:", wood);
  // console.log("wested:", wested);

  // const keep = wested.filter((w) => w >= 4 + (1 + sparePart) * 2);
  // const totalKeep = keep.reduce((acc, num) => acc + num, 0);
  // const westedW = wested.filter((w) => w < 4 + (1 + sparePart) * 2);
  // const totalWestedW = westedW.reduce((acc, num) => acc + num, 0);
  // console.log("keep:", keep);
  // console.log("tota; keep:", totalKeep);
  // console.log("wested:", westedW);
  // console.log("tota; wested:", totalWestedW);
};

const nearest = (data, remaining) => {
  const res = data
    .map((item) => {
      return {
        ...item,
        remaining: parseFloat((remaining - item.cutting).toFixed(2)),
      };
    })
    .sort((a, b) => a.remaining - b.remaining)
    .filter((w) => w.remaining >= 0);
  return res;
};

test();
