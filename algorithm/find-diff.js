const { sortBy, uniq } = require("lodash");

const numbers = uniq([27.5,27.5,25.5,14.5,14.5,10.5]);
const differences = [];

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    const diff = Math.abs(numbers[i] - numbers[j]);
    differences.push(diff);
  }
}

console.log(sortBy(differences));
// โค้ดข้างต้นจะวนลูปเพื่อหาผลต่างของทุกคู่ค่า และเก็บผลต่างในรายการ differences ดังนั้นผลลัพธ์ที่ได้จะถูกแสดงผ่านทางคอนโซล (console) ในรูปแบบของรายการผลต่างทั้งหมด.






