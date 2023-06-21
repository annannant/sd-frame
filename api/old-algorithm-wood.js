const PrepareCutting = require("./helper/prepare-cutting");

const { orderBy, sortBy } = require("lodash");
const { woodStock } = require("./number-wood-stock");
const { orders } = require("./list-order");
console.log("woodStock:", woodStock);
const sparePart = 0.25;

// const orders = orders
// const orders = [
//   { size: "20x30", woodWidth: 1, qty: 2 },

//   { size: "20x28.5", woodWidth: 1, qty: 1 },

//   { size: "20x26", woodWidth: 1, qty: 1 },

//   { size: "24x25", woodWidth: 1, qty: 1 },

//   { size: "12x24", woodWidth: 1, qty: 2 },

//   { size: "13x24", woodWidth: 1, qty: 2 },

//   { size: "20x24", woodWidth: 1, qty: 1 },

//   { size: "12x23", woodWidth: 1, qty: 1 },

//   { size: "15.5x23", woodWidth: 1, qty: 1 },

//   { size: "17x23", woodWidth: 1, qty: 1 },

//   { size: "21x15", woodWidth: 1, qty: 1 },

//   { size: "10x20", woodWidth: 1, qty: 2 },

//   { size: "15x20", woodWidth: 1, qty: 3 },

//   { size: "20x20", woodWidth: 1, qty: 1 },

//   { size: "10x18", woodWidth: 1, qty: 2 },

//   { size: "5x7", woodWidth: 1, qty: 13 },
// ];

const test = () => {
  const ordered = PrepareCutting.prepare(orders);

  let remaining = 120;
  let wood = 1;
  let wested = [...woodStock];
  // wested = [
  //   ...wested,
  //   ...wested,
  //   // ...woodStock.map((val) => {
  //   //   return {
  //   //     wested: val,
  //   //     remaining: val,
  //   //   };
  //   // }),
  // ];
  let used = [];

  let length = 120;
  let bar = [];
  let bars = [];
  let barSummary = 0;

  let useKeepingList = [];

  for (const [index, item] of ordered.entries()) {
    // ถ้าใช้ไม้เดิม
    const useKeeping = wested
      .map((w) => {
        return {
          wested: w,
          remaining: parseFloat((w - item.cutting).toFixed(2)),
        };
      })
      .sort((a, b) => a.remaining - b.remaining)
      .filter((w) => w.remaining >= 0);

    if (useKeeping.length) {
      // console.log('wested:', useKeeping, wested, )
      // console.log(`${item.cutting}`, useKeeping[0].wested)
      console.log(`${item.cutting}`, ";", useKeeping[0].wested);
      // useKeepingList.push({
      //   cutting: item.cutting,
      //   wested: useKeeping[0].wested,
      // });
      wested = wested.filter((w) => w !== useKeeping[0].wested);

      if (useKeeping[0].remaining > 0) {
        wested.push(useKeeping[0].remaining)
      }
      continue;
    }

    const over = length - (barSummary + item.cutting) < 0;
    if (over) {
      bars.push(bar);
      const remain = parseFloat((length - barSummary).toFixed(2));
      wested.push(remain);
      // console.log(bar.join(','), ',',remain);
      // console.log(bar.join(","));
      console.log(bar.join(","), ";", 120);


      bar = [item.cutting];
      barSummary = item.cutting;
    } else {
      bar.push(item.cutting);
      barSummary += item.cutting;
    }

    if (index === ordered.length - 1) {
      // console.log('index:', index)
      bars.push(bar);
      console.log(bar.join(","), ";", 120);

    }

    // console.log('item.cutting:', item.cutting)
    // console.log("test:", test);
    // // ถ้าใช้ไม้เดิม
    // const testOld = wested
    //   .map((w) => {
    //     return {
    //       wested: w,
    //       remaining: parseFloat((w - item.cutting).toFixed(2)),
    //     };
    //   })
    //   .sort((a, b) => a.remaining - b.remaining)
    //   .filter((w) => w.remaining >= 0);

    // // console.log("testOld:", testOld);

    // // ใช้ไม้ใหม่
    // if (test) {
    //   console.log(
    //     "item:",
    //     item.orderNo,
    //     item.set,
    //     item.size,
    //     item.cuttingName,
    //     item.cutting,
    //     "===>",
    //     remaining,
    //     item.cutting,
    //     "=",
    //   );
    //   remaining = parseFloat((remaining - item.cutting).toFixed(2));
    // } else {
    //   wested.push(remaining);
    //   console.log('remaining:', remaining)
    //   console.log(
    //     "item:",
    //     item.orderNo,
    //     item.set,
    //     item.size,
    //     item.cuttingName,
    //     item.cutting,
    //     "===>",
    //     remaining,
    //     item.cutting,
    //     "=",
    //   );

    //   wood++;
    //   remaining = 120;
    //   remaining = parseFloat((remaining - item.cutting).toFixed(2));
    // }
  }

  // useKeepingList.forEach((item) => {
  //   console.log(`${item.cutting}`, ";", item.wested);
  //   // useKeepingList.push({
  //   //   cutting: cutting,
  //   //   wested: useKeeping[0].wested,
  //   // })
  // });

  // console.log("remaining:", remaining);
  // console.log("wood:", wood);

  // const keep = wested.filter((w) => w >= 4 + (1 + sparePart) * 2);
  // const totalKeep = keep.reduce((acc, num) => acc + num, 0);
  // const westedW = wested.filter((w) => w < 4 + (1 + sparePart) * 2);
  // const totalWestedW = westedW.reduce((acc, num) => acc + num, 0);
  // console.log("keep:", keep);
  // console.log("tota; keep:", totalKeep);
  // console.log("wested:", westedW);
  // console.log("tota; wested:", totalWestedW);
};

test();
