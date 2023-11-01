const { orderBy } = require('lodash');

const prepare = (orders, sparePart) => {
  const formatted = [];
  for (const [index, item] of orders.entries()) {
    let width = item.width;
    let height = item.height;
    if (item.width == undefined && item.height == undefined) {
      const splitSize = item.size
        .split('x')
        .map((v) => Number(v.trim()))
        .sort((a, b) => Number(a) - Number(b));
      const [w, h] = splitSize;
      width = w;
      height = h;
    }

    const dimensionW = parseFloat(
      (width + (item.woodWidth + sparePart) * 2).toFixed(2),
    );
    const dimensionH = parseFloat(
      (height + (item.woodWidth + sparePart) * 2).toFixed(2),
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
  let ordered = orderBy(formatted, ['height'], 'desc').map((item) => ({
    ...item,
    key: 'uuidv4',
    // (),
  }));
  return ordered;
};

module.exports = { prepare };
