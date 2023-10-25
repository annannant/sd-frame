export interface ITFAttributeData {
  id?: number | null
  attributeCode?: string | null
  attributeName?: string | null
  attributeDescription?: string | null
}

const attributeList = [
  {
    'attributeCode': '100026',
    'attributeName': 'C1186',
    'attributeDescription': 'เทาดำ ขอบเงิน',
  },
  {
    'attributeCode': '100025',
    'attributeName': 'C1652',
    'attributeDescription': 'โอ๊คน้ำตาล ดำ',
  },
  {
    'attributeCode': '100024',
    'attributeName': '61248-2',
    'attributeDescription': 'โอ๊คแดงเข้ม เส้นทอง',
  },
  {
    'attributeCode': '100023',
    'attributeName': 'C81280',
    'attributeDescription': 'ไม้ธรรมชาติ อ่อน',
  },
  {
    'attributeCode': '100022',
    'attributeName': '61113',
    'attributeDescription': 'โอ๊คดำเข้ม',
  },
  {
    'attributeCode': '100022',
    'attributeName': '61113',
    'attributeDescription': 'โอ๊คดำเข้ม',
  },
  {
    'attributeCode': '100021',
    'attributeName': '0082',
    'attributeDescription': 'ทองอ่อน',
  },
  {
    'attributeCode': '100020',
    'attributeName': 'G/MB',
    'attributeDescription': 'ทอง/ลายหินอ่อน',
  },
  {
    'attributeCode': '100019',
    'attributeName': 'เชอรี่',
    'attributeDescription': 'เชอรี่',
  },
  {
    'attributeCode': '100018',
    'attributeName': '7950',
    'attributeDescription': 'โอ๊ค-ดำ ลายทอง',
  },
  {
    'attributeCode': '100017',
    'attributeName': '680',
    'attributeDescription': 'ดำ/ริ้วทอง',
  },
  {
    'attributeCode': '100017',
    'attributeName': '680',
    'attributeDescription': 'ดำ/ริ้วทอง',
  },
  {
    'attributeCode': '100016',
    'attributeName': '888',
    'attributeDescription': 'ขาวเทาลายเงิน',
  },
  {
    'attributeCode': '100016',
    'attributeName': '888',
    'attributeDescription': 'ขาวเทาลายเงิน',
  },
  {
    'attributeCode': '100016',
    'attributeName': '888',
    'attributeDescription': 'ขาวเทาลายเงิน',
  },
  {
    'attributeCode': '100015',
    'attributeName': '3s',
    'attributeDescription': 'โอ๊คเข้ม',
  },
  {
    'attributeCode': '100014',
    'attributeName': 'G/นาค',
    'attributeDescription': 'ทองลายนาค',
  },
  {
    'attributeCode': '100013',
    'attributeName': 'ทองอังกฤษ',
    'attributeDescription': 'ทองอังกฤษ',
  },
  {
    'attributeCode': '100013',
    'attributeName': 'ทองอังกฤษ',
    'attributeDescription': 'ทองอังกฤษ',
  },
  {
    'attributeCode': '100012',
    'attributeName': '4',
    'attributeDescription': 'โอ๊คน้ำตาล',
  },
  {
    'attributeCode': '100012',
    'attributeName': '4',
    'attributeDescription': 'โอ๊คน้ำตาล',
  },
  {
    'attributeCode': '100009',
    'attributeName': 'สัก/MB',
    'attributeDescription': 'ไม้สัก, ลายหินอ่อน',
  },
  {
    'attributeCode': '100008',
    'attributeName': 'สัก',
    'attributeDescription': 'สัก',
  },
  {
    'attributeCode': '100007',
    'attributeName': 'ไม้พยุง',
    'attributeDescription': 'ไม้พยุง',
  },
  {
    'attributeCode': '100006',
    'attributeName': 'โอ๊ค',
    'attributeDescription': 'โอ๊ค',
  },
  {
    'attributeCode': '100005',
    'attributeName': 'ดำ',
    'attributeDescription': 'ดำ',
  },
  {
    'attributeCode': '100005',
    'attributeName': 'ดำ',
    'attributeDescription': 'ดำ',
  },
  {
    'attributeCode': '100004',
    'attributeName': 'ขาว',
    'attributeDescription': 'ขาว',
  },
  {
    'attributeCode': '100004',
    'attributeName': 'ขาว',
    'attributeDescription': 'ขาว',
  },
  {
    'attributeCode': '100003',
    'attributeName': '3',
    'attributeDescription': 'โอ๊คแดง',
  },
  {
    'attributeCode': '100003',
    'attributeName': '3',
    'attributeDescription': 'มะฮอกกะนี',
  },
  {
    'attributeCode': '100003',
    'attributeName': '3',
    'attributeDescription': 'โอ๊คแดง',
  },
  {
    'attributeCode': '100003',
    'attributeName': '3',
    'attributeDescription': 'โอ๊คแดง',
  },
  {
    'attributeCode': '100003',
    'attributeName': '3',
    'attributeDescription': 'โอ๊คแดง',
  },
  {
    'attributeCode': '100003',
    'attributeName': '3',
    'attributeDescription': 'โอ๊คแดง',
  },
  {
    'attributeCode': '100003',
    'attributeName': '3',
    'attributeDescription': 'โอ๊คแดง',
  },
  {
    'attributeCode': '100002',
    'attributeName': 'ทองเส้น',
    'attributeDescription': 'ไม้ทองเส้น',
  },
  {
    'attributeCode': '100002',
    'attributeName': 'ทองเส้น',
    'attributeDescription': 'ไม้ทองเส้น',
  },
  {
    'attributeCode': '100001',
    'attributeName': 'G',
    'attributeDescription': 'ไม้ทอง',
  },
  {
    'attributeCode': '100001',
    'attributeName': 'G',
    'attributeDescription': 'ไม้ทอง',
  },
  {
    'attributeCode': '100001',
    'attributeName': 'G',
    'attributeDescription': 'ไม้ทอง',
  },
]

export default attributeList
