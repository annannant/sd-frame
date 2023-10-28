const { uniqBy } = require('lodash')

const woodTypeList = [
  {
    'url': 'https://www.laithai-frame.com/704-01',
    'imageUrl':
      'https://www.laithai-frame.com/images/ready-template/crop-1697858784113.png',
    'woodTypeCode': '704',
    'woodTypeName': 'ทอง',
    'woodTypeWidth2': 20,
    'woodTypeHeight2': 19,
    'woodTypeWidth': 0.79,
    'woodTypeHeight': 0.75,
    'qtyPerBox': 100,
    'pricePerUnit': 39,
    'pricePerBox': 3900,
    'id': 1,
    'woodTypeUnit': 'inch',
  },
  {
    'url': 'https://www.laithai-frame.com/705-01',
    'imageUrl':
      'https://www.laithai-frame.com/images/ready-template/crop-1697859100846.png',
    'woodTypeCode': '705',
    'woodTypeName': 'น้ำตาลริ้วทอง',
    'woodTypeWidth2': 16,
    'woodTypeHeight2': 17,
    'woodTypeWidth': 0.63,
    'woodTypeHeight': 0.67,
    'qtyPerBox': 110,
    'pricePerUnit': 39,
    'pricePerBox': 4290,
    'id': 2,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-1211---1220',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/1211-01.jpg',
    'woodTypeCode': '1211',
    'woodTypeName': 'ลายกลม',
    'woodTypeWidth2': 25,
    'woodTypeHeight2': 14,
    'woodTypeWidth': 0.98,
    'woodTypeHeight': 0.55,
    'qtyPerBox': 77,
    'pricePerUnit': 38,
    'pricePerBox': 2926,
    'id': 4,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-1211---1220',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/1212-01.jpg',
    'woodTypeCode': '1212',
    'woodTypeName': 'ลายดอก',
    'woodTypeWidth2': 28,
    'woodTypeHeight2': 14,
    'woodTypeWidth': 1.1,
    'woodTypeHeight': 0.55,
    'qtyPerBox': 77,
    'pricePerUnit': 38,
    'pricePerBox': 2926,
    'id': 7,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-1536---1549',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/1536-01.jpg',
    'woodTypeCode': '1536',
    'woodTypeName': 'ลายจุด',
    'woodTypeWidth2': 34,
    'woodTypeHeight2': 20,
    'woodTypeWidth': 1.34,
    'woodTypeHeight': 0.79,
    'qtyPerBox': 48,
    'pricePerUnit': 60,
    'pricePerBox': 2880,
    'id': 10,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-1536---1549',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/1538-01.jpg',
    'woodTypeCode': '1538',
    'woodTypeName': 'นูนต่ำลายไทย',
    'woodTypeWidth2': 38,
    'woodTypeHeight2': 14,
    'woodTypeWidth': 1.5,
    'woodTypeHeight': 0.55,
    'qtyPerBox': 50,
    'pricePerUnit': 60,
    'pricePerBox': 3000,
    'id': 11,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-1521---1529',
    'imageUrl': '',
    'woodTypeCode': '1522',
    'woodTypeName': 'ขอบเส้น เว้า ลายไทย',
    'woodTypeWidth2': 38,
    'woodTypeHeight2': 15,
    'woodTypeWidth': 1.5,
    'woodTypeHeight': 0.59,
    'qtyPerBox': 48,
    'pricePerUnit': 60,
    'pricePerBox': 2880,
    'id': 12,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-1521---1529',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/1522-03.jpg',
    'woodTypeCode': '1522',
    'woodTypeName': 'ขอบเส้น เว้า ลายไทย',
    'woodTypeWidth2': 38,
    'woodTypeHeight2': 15,
    'woodTypeWidth': 1.5,
    'woodTypeHeight': 0.59,
    'qtyPerBox': 48,
    'pricePerUnit': 60,
    'pricePerBox': 2880,
    'id': 13,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-1521---1529',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/1522-03.jpg',
    'woodTypeCode': '1522',
    'woodTypeName': 'ขอบเส้น เว้า ลายไทย',
    'woodTypeWidth2': 38,
    'woodTypeHeight2': 15,
    'woodTypeWidth': 1.5,
    'woodTypeHeight': 0.59,
    'qtyPerBox': 48,
    'pricePerUnit': 60,
    'pricePerBox': 2880,
    'id': 14,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-2522---2529',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/2522-011.jpg',
    'woodTypeCode': '2522',
    'woodTypeName': 'ลายไทย ขอบในขาว',
    'woodTypeWidth2': 53,
    'woodTypeHeight2': 18,
    'woodTypeWidth': 2.09,
    'woodTypeHeight': 0.71,
    'qtyPerBox': 28,
    'pricePerUnit': 125,
    'pricePerBox': 3500,
    'id': 15,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-2522---2529',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/2529-011.jpg',
    'woodTypeCode': '2529',
    'woodTypeName': 'ทองใหญ่ ลายไทย',
    'woodTypeWidth2': 50,
    'woodTypeHeight2': 26,
    'woodTypeWidth': 1.97,
    'woodTypeHeight': 1.02,
    'qtyPerBox': 24,
    'pricePerUnit': 150,
    'pricePerBox': 3600,
    'id': 18,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-3506---3510',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/3506-011.jpg',
    'woodTypeCode': '3506',
    'woodTypeName': 'เรียบ',
    'woodTypeWidth2': 75,
    'woodTypeHeight2': 20,
    'woodTypeWidth': 2.95,
    'woodTypeHeight': 0.79,
    'qtyPerBox': 16,
    'pricePerUnit': 220,
    'pricePerBox': 3520,
    'id': 19,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-3506---3510',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/3507-01.jpg',
    'woodTypeCode': '3507',
    'woodTypeName': 'เว้าใน',
    'woodTypeWidth2': 65,
    'woodTypeHeight2': 40,
    'woodTypeWidth': 2.56,
    'woodTypeHeight': 1.57,
    'qtyPerBox': 12,
    'pricePerUnit': 220,
    'pricePerBox': 2640,
    'id': 20,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-4006---4010',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/4006-01.jpg',
    'woodTypeCode': '4006',
    'woodTypeName': 'เว้าใน เส้นทอง',
    'woodTypeWidth2': 80,
    'woodTypeHeight2': 44,
    'woodTypeWidth': 3.15,
    'woodTypeHeight': 1.73,
    'qtyPerBox': 10,
    'pricePerUnit': 260,
    'pricePerBox': 2600,
    'id': 22,
    'woodTypeUnit': 'inch',
  },
  {
    'url':
      'https://www.laithai-frame.com/%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA-4006---4010',
    'imageUrl': 'https://www.laithai-frame.com/images/editor/4007-01.jpg',
    'woodTypeCode': '4007',
    'woodTypeName': 'เว้าใน ขอบ',
    'woodTypeWidth2': 85,
    'woodTypeHeight2': 41,
    'woodTypeWidth': 3.35,
    'woodTypeHeight': 1.61,
    'qtyPerBox': 10,
    'pricePerUnit': 280,
    'pricePerBox': 2800,
    'id': 23,
    'woodTypeUnit': 'inch',
  },
]

const fn = () => {
  const list = uniqBy(woodTypeList, 'woodTypeCode')
  for (const type of list) {
    const sql =
      `
      INSERT INTO \`sd-frame-db\`.\`wood_type\` (\`name\`, \`code\`, \`width\`, \`height\`, \`length\`, \`size_unit\`, \`qty_perbox\`, \`image_url\`) 
      VALUES ('` +
      type?.woodTypeName +
      `', '` +
      type?.woodTypeCode +
      `', ` +
      type?.woodTypeWidth +
      `, ` +
      type?.woodTypeHeight +
      `, 120, 'inch', ` +
      type?.qtyPerBox +
      `, '` +
      type?.imageUrl +
      `');
      `

    console.log(sql)
  }
  console.log(list.length)
}

fn()
// INSERT INTO `sd-frame-db`.`wood_type` (`name`, `code`, `width`, `height`, `length`, `size_unit`, `qty_perbox`, `image_url`) VALUES ('name', 'code', 1, 2, 3, 'inch', 20, 'i');
