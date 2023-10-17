const { orderBy, sortBy } = require("lodash");

const sparePart = 0.25;

const orders = [
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
    size: "8x10",
    woodWidth: 1,
    qty: 6,
  },
  {
    size: "10x12",
    woodWidth: 1,
    qty: 3,
  },
  {
    size: "8.27x11.69",
    woodWidth: 1,
    qty: 5,
  },
  {
    size: "20x20",
    woodWidth: 1,
    qty: 1,
  },
  {
    size: "24x25",
    woodWidth: 1,
    qty: 1,
  },
  // {
  //   size: "24x25",
  //   woodWidth: 1,
  //   qty: 1,
  // },
  // {
  //   size: "24x12",
  //   woodWidth: 1,
  //   qty: 2,
  // },
  // {
  //   size: "12x23",
  //   woodWidth: 1,
  //   qty: 1,
  // },
  // {
  //   size: "20x20",
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
  const formatted = [];
  for (const [index, item] of orders.entries()) {
    const splitSize = item.size
      .split("x")
      .map((v) => Number(v.trim()))
      .sort((a, b) => Number(a) - Number(b));
    const [width, height] = splitSize;

    const dimensionW = parseFloat(
      (width + (item.woodWidth + sparePart) * 2).toFixed(2)
    );
    const dimensionH = parseFloat(
      (height + (item.woodWidth + sparePart) * 2).toFixed(2)
    );

    const orderNo = index + 1;
    const convert = { ...item, orderNo, width, height, dimensionW, dimensionH };

    // split qty
    for (let idx = 0; idx < item.qty; idx++) {
      const set = idx + 1;
      for (let ihx = 0; ihx < 2; ihx++) {
        formatted.push({
          ...convert,
          set,
          cuttingName: `h${ihx + 1}`,
          cutting: dimensionH,
        });
      }
      for (let iwx = 0; iwx < 2; iwx++) {
        formatted.push({
          ...convert,
          set,
          cuttingName: `w${iwx + 1}`,
          cutting: dimensionW,
        });
      }
    }
  }

  const ordered = orderBy(formatted, ["height"], "desc");

  let remaining = 120;
  let wood = 1;
  let wested = [];
  let used = [];
  for (const [index, item] of ordered.entries()) {
    const test = remaining - item.cutting >= 0;
    // ถ้าใช้ไม้เดิม
    const testOld = wested
      .map((w) => {
        return {
          wested: w,
          remaining: parseFloat((w - item.cutting).toFixed(2)),
        };
      })
      .sort((a, b) => a.remaining - b.remaining)
      .filter((w) => w.remaining >= 0);
    if (testOld.length) {
      wested = wested.filter((w) => w !== testOld[0].wested);
      console.log('wested:', testOld[0].wested)
      console.log(
        "item:",
        item.orderNo,
        item.set,
        item.size,
        item.cuttingName,
        item.cutting,
        "===>",
        remaining,
        item.cutting,
        "=",
      );
      continue;
    }

    // console.log("testOld:", testOld);
   
    // ใช้ไม้ใหม่
    if (test) {
      console.log(
        "item:",
        item.orderNo,
        item.set,
        item.size,
        item.cuttingName,
        item.cutting,
        "===>",
        remaining,
        item.cutting,
        "=",
      );
      remaining = parseFloat((remaining - item.cutting).toFixed(2));
    } else {
      wested.push(remaining);
      console.log('remaining:', remaining)
      console.log(
        "item:",
        item.orderNo,
        item.set,
        item.size,
        item.cuttingName,
        item.cutting,
        "===>",
        remaining,
        item.cutting,
        "=",
      );

      wood++;
      remaining = 120;
      remaining = parseFloat((remaining - item.cutting).toFixed(2));
    }

  
  }
  console.log("remaining:", remaining);
  console.log("wood:", wood);

  const keep = wested.filter((w) => w >= 4 + (1 + sparePart) * 2);
  const totalKeep = keep.reduce((acc, num) => acc + num, 0);
  const westedW = wested.filter((w) => w < 4 + (1 + sparePart) * 2);
  const totalWestedW = westedW.reduce((acc, num) => acc + num, 0);
  console.log("keep:", keep);
  console.log("tota; keep:", totalKeep);
  console.log("wested:", westedW);
  console.log("tota; wested:", totalWestedW);
};

test();
// const a = [14.5,
//   14.5,
//   14.5,
//   14.5,
//   22.5,
//   22.5,
//   22.5,
//   22.5,
//   25.5,
//   25.5,
//   26.5,
//   26.5,
//   26.5,
//   26.5,
//   27.5,
//   27.5]
//   console.log(sortBy(a).reverse().map((item) => {
// console.log(item)
//     return item
//   }))