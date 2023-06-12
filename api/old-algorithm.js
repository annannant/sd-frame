const PrepareCutting = require("./helper/prepare-cutting");

const { orderBy, sortBy } = require("lodash");

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
  {
    size: '8.27x11.69',
    woodWidth: 1,
    qty: 5,
  },
{
    size: '8x10',
    woodWidth: 1,
    qty: 6,
  },
  
  // {
  //   size: "6x8",
  //   woodWidth: 1,
  //   qty: 5,
  // },
  // {
  //   size: "6x7",
  //   woodWidth: 1,
  //   qty: 3,
  // },
  // {
  //   size: "15x21",
  //   woodWidth: 1,
  //   qty: 3,
  // },
  // {
  //   size: "12x24",
  //   woodWidth: 1,
  //   qty: 3,
  // },
  // {
  //   size: "12x18",
  //   woodWidth: 1,
  //   qty: 2,
  // },
  // {
  //   size: "10x12",
  //   woodWidth: 1,
  //   qty: 1,
  // },
  // {
  //   size: "24x25",
  //   woodWidth: 1,
  //   qty: 1,
  // },
];

const test = () => {
  const ordered = PrepareCutting.prepare(orders);
  console.log("ordered:", ordered);

  let remaining = 120;
  let wood = 1;
  let wested = [];
  let used = [];

  let length = 120;
  let bar = [];
  let bars = [];
  let barSummary = 0;

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
      console.log(`${item.cutting}`, ":", useKeeping[0].wested);
      wested = wested.filter((w) => w !== useKeeping[0].wested);
      continue;
    }

    const over = length - (barSummary + item.cutting) < 0;
    if (over) {
      bars.push(bar);
      const remain = parseFloat((length - barSummary).toFixed(2));
      wested.push(remain);
      // console.log(bar.join(','), ',',remain);
      console.log(bar.join(","));

      bar = [item.cutting];
      barSummary = item.cutting;
    } else {
      bar.push(item.cutting);
      barSummary += item.cutting;
    }

    if (index === ordered.length - 1) {
      // console.log('index:', index)
      bars.push(bar);
      console.log(bar.join(","));
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
