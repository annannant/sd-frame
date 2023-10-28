const standardList = [
  { id: 1, name: '4x6', w: 4, h: 6 },
  { id: 2, name: '5x7', w: 5, h: 7 },
  { id: 3, name: '6x8', w: 6, h: 8 },
  { id: 4, name: '6x9', w: 6, h: 9 },
  { id: 5, name: '8x10', w: 8, h: 10 },
  { id: 6, name: '8x12', w: 8, h: 12 },
  { id: 7, name: '10x12', w: 10, h: 12 },
  { id: 8, name: '10x15', w: 10, h: 15 },
  { id: 9, name: '12x15', w: 12, h: 15 },
  { id: 10, name: '12x16', w: 12, h: 16 },
  { id: 11, name: '12x18', w: 12, h: 18 },
  { id: 12, name: '16x20', w: 16, h: 20 },
  { id: 13, name: '16x24', w: 16, h: 24 },
  { id: 14, name: '20x24', w: 20, h: 24 },
  { id: 15, name: '20x30', w: 20, h: 30 },
  { id: 16, name: '24x30', w: 24, h: 30 },
  { id: 17, name: '24x36', w: 24, h: 36 },
  { id: 18, name: 'A4 (8.27x11.69)', w: 8.27, h: 11.69 },
]

const fn = () => {
  const list = standardList
  for (const item of list) {
    let sql =
      "INSERT INTO `sd-frame-db`.`standard_frame` (`name`, `width`, `height`, `is_active`, `unit`) VALUES ('#name', #w, #h, true, 'inch');"
    for (const key of Object.keys(item)) {
      sql = sql.replaceAll('#' + key, item[key])
    }
    console.log(sql)
  }
  console.log(list.length)
}

fn()
// INSERT INTO `sd-frame-db`.`wood_type` (`name`, `code`, `width`, `height`, `length`, `size_unit`, `qty_perbox`, `image_url`) VALUES ('name', 'code', 1, 2, 3, 'inch', 20, 'i');
